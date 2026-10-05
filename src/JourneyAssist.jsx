import React,{useEffect,useRef,useState} from 'react';
import {Navigation,Search,Volume2,CheckCircle2,AlertTriangle,RefreshCw,MapPin,LocateFixed,Flag,ShieldAlert} from 'lucide-react';
import {languages} from './i18n';
import Map from './Map';
import {readAloud} from './voice';

const NOMINATIM='https://nominatim.openstreetmap.org/search';
const OSRM='https://router.project-osrm.org/route/v1/driving';
const directionCopy={
 en:{left:'Turn left',right:'Turn right',straight:'Continue straight',uturn:'Make a U-turn',arrive:'You have arrived at your destination',depart:'Start your journey',roundabout:'Enter the roundabout'},
 hi:{left:'अब बाएँ मुड़ें',right:'अब दाएँ मुड़ें',straight:'सीधे आगे जाएँ',uturn:'यू-टर्न लें',arrive:'आप अपने गंतव्य पर पहुँच गए हैं',depart:'अपनी यात्रा शुरू करें',roundabout:'गोल चक्कर में प्रवेश करें'},
 as:{left:'এতিয়া বাওঁফালে ঘূৰক',right:'এতিয়া সোঁফালে ঘূৰক',straight:'পোনে পোনে আগবাঢ়ক',uturn:'ইউ-টাৰ্ণ লওক',arrive:'আপুনি গন্তব্যত উপস্থিত হৈছে',depart:'আপোনাৰ যাত্ৰা আৰম্ভ কৰক',roundabout:'গোল চক্কৰত প্ৰৱেশ কৰক'},
 kha:{left:'Pynkylla sha kamon',right:'Pynkylla sha kadiang',straight:'Nangta shakhmat',uturn:'Pynkylla U-turn',arrive:'Phi la poi sha ka jaka phi leit',depart:'Sdang ia ka jingiaid',roundabout:'Rung sha ka roundabout'},
 lus:{left:'Khawngah leh lam ding',right:'Khawngah leh lam vor',straight:'Kal chhuahzel rawh',uturn:'U-turn la rawh',arrive:'I thleng tawh i tumnaah',depart:'I zin tan rawh',roundabout:'Roundabout-ah lut rawh'},
 mni:{left:'ꯅꯣꯡꯃꯥꯜ ꯇꯧ',right:'ꯌꯥꯡꯃꯥꯜ ꯇꯧ',straight:'ꯅꯣꯡꯃꯥ ꯆꯠꯂꯨ',uturn:'U-turn ꯇꯧ',arrive:'ꯑꯣꯏꯕ ꯐꯝꯗ ꯍꯥꯡꯂꯦ',depart:'ꯏꯔꯤ ꯊꯝꯃꯨ',roundabout:'Roundabout-ꯇ ꯂꯣꯏꯅ ꯂꯥꯡ'},
 brx:{left:'बामफालाव बुं',right:'आगफालाव बुं',straight:'सोजा सोजा थां',uturn:'यू-टर्न खालाम',arrive:'नों गन्तव्याव सोलोंगायो',depart:'नोंनि जर्नी जागायो',roundabout:'गोल चक्कराव लाव'}
};
function localizeDirection(step,lang){
 const c=directionCopy[lang]||directionCopy.en; const m=step.maneuver||{}; const mod=m.modifier||'';
 if(m.type==='arrive') return c.arrive;
 if(m.type==='depart') return c.depart;
 if(m.type==='roundabout'||m.type==='rotary') return c.roundabout;
 if(mod.includes('left')) return c.left;
 if(mod.includes('right')) return c.right;
 if(mod.includes('uturn')) return c.uturn;
 return c.straight;
}

export default function JourneyAssist({lang,t,position,places,weather,tracking,startTracking,stopTracking,helpVoice,locationConsent,onOpenPrivacy,onWeather,onJourneyAlert,onJourneyState}){
 const tr=t||(k=>k);
 const [dest,setDest]=useState(''),[suggestions,setSuggestions]=useState([]),[found,setFound]=useState(null),[searching,setSearching]=useState(false),[route,setRoute]=useState(null),[routing,setRouting]=useState(false),[status,setStatus]=useState('idle'),[voiceOn,setVoiceOn]=useState(true),[stepIndex,setStepIndex]=useState(0),[deviation,setDeviation]=useState(false),[demoMode,setDemoMode]=useState(false),[journeyPosition,setJourneyPosition]=useState(null),[showDirections,setShowDirections]=useState(false);
 const [placeDetails,setPlaceDetails]=useState(null),[placeLoading,setPlaceLoading]=useState(false);
 const voiceLang=lang||'en'; // always follow the app's selected language — no separate override
 const lastSpokenStep=useRef(-1);
 const deviationAlerted=useRef(false);
 const deviationBusy=useRef(false);
 const haversine=(a,b)=>{const R=6371000,toRad=x=>x*Math.PI/180,dLat=toRad(b.lat-a.lat),dLon=toRad(b.lng-a.lng),q=Math.sin(dLat/2)**2+Math.cos(toRad(a.lat))*Math.cos(toRad(b.lat))*Math.sin(dLon/2)**2;return 2*R*Math.asin(Math.sqrt(q));};
 const searchTimer=useRef(null);
 const statusText={idle:tr('statusIdle'),on:tr('statusOn'),off:tr('statusOff'),turn:tr('statusTurn'),done:tr('statusDone')};
 const say=async text=>{if(voiceOn)try{await readAloud(text,voiceLang);}catch{}};

 // Reverse-geocode the current position into a human-readable place (road,
 // locality, city) so the person and their caregiver can see *where* the
 // marker on the map actually is, not just raw coordinates. Throttled to
 // roughly one lookup per ~100m of movement to stay within Nominatim's
 // fair-use limits — for production scale, swap this for a paid geocoding
 // provider or a self-hosted Nominatim instance.
 const lastGeocodedKey=useRef(null);
 useEffect(()=>{
   if(!position)return;
   const key=`${position.lat.toFixed(3)},${position.lng.toFixed(3)}`;
   if(lastGeocodedKey.current===key)return;
   lastGeocodedKey.current=key;
   setPlaceLoading(true);
   const controller=new AbortController();
   const uiLang=(languages.find(x=>x[0]===lang)?.[2]||'en-IN').split('-')[0];
   fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json&zoom=17&addressdetails=1&accept-language=${uiLang}`,{signal:controller.signal})
     .then(r=>r.json())
     .then(data=>{
       if(!data||!data.address)return;
       const a=data.address;
       const locality=a.suburb||a.neighbourhood||a.village||a.town||a.city_district||'';
       const city=a.city||a.town||a.county||'';
       const state=a.state||'';
       const label=[a.road,locality,city].filter(Boolean).join(', ')||data.display_name;
       setPlaceDetails({label,road:a.road||'',locality,city,state,full:data.display_name});
     })
     .catch(()=>{})
     .finally(()=>setPlaceLoading(false));
   return ()=>controller.abort();
 },[position,lang]);
 const searchSuggestions=async value=>{
   setDest(value);setFound(null);setRoute(null);setStepIndex(0);
   if(searchTimer.current)clearTimeout(searchTimer.current);
   if(value.trim().length<2){setSuggestions([]);return;}
   searchTimer.current=setTimeout(async()=>{setSearching(true);try{const r=await fetch(`${NOMINATIM}?q=${encodeURIComponent(value.trim())}&format=json&limit=6&addressdetails=1&accept-language=en`);const x=await r.json();setSuggestions(x.map(p=>({lat:Number(p.lat),lng:Number(p.lon),name:p.display_name.split(',')[0],display:p.display_name})));}catch{setSuggestions([]);}finally{setSearching(false);}},300);
 };
 const chooseDestination=async p=>{
   setSuggestions([]);setFound(p);setDest(p.display);await say(`Destination selected: ${p.name}`);if(position)await buildRoute(position,p);
 };
 const buildRoute=async(origin,destination)=>{
   if(!origin||!destination)return;setRouting(true);try{
     const r=await fetch(`${OSRM}/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson&steps=true&alternatives=false`);const x=await r.json();
     if(x.routes?.[0]){const rt=x.routes[0];const built={geometry:rt.geometry, distance:rt.distance,duration:rt.duration,steps:(rt.legs?.[0]?.steps||[]).map(s=>({instruction:s.maneuver?.instruction||s.name||'Continue',name:s.name||'',distance:s.distance,location:s.maneuver?.location||null,maneuver:s.maneuver||{}})).filter(s=>s.instruction)};setRoute(built);return built;}
   }catch{setRoute(null);}finally{setRouting(false);}
 };
 const startJourney=async()=>{if(!found)return;deviationAlerted.current=false;setDeviation(false);setStepIndex(0);lastSpokenStep.current=-1;setDemoMode(false);setJourneyPosition(position||null);setStatus('on');try{let origin=position;let liveStarted=!!(origin&&tracking);let usingDemo=false;if(!origin){try{const livePosition=await startTracking();origin=livePosition;liveStarted=!!livePosition;}catch{origin=null;}}if(!origin){const demoOrigin={lat:found.lat+0.018,lng:found.lng-0.018,accuracy:12,at:Date.now()};origin=demoOrigin;usingDemo=true;setDemoMode(true);setJourneyPosition(demoOrigin);}const builtRoute=await buildRoute(origin,found);setStatus('turn');setShowDirections(true);await onJourneyState?.({active:true,startedAt:Date.now(),destination:found,...(builtRoute?{route:builtRoute}:{}),stepIndex:0});await say(`${usingDemo?'Demo journey preview':'Live journey'} started to ${found.name}. Follow the directions.`);}catch{setStatus('idle');setDemoMode(false);setJourneyPosition(null);}};
 const pointToSegmentDistance=(p,a,b)=>{
   const latScale=111320, lngScale=111320*Math.cos((p.lat*Math.PI)/180);
   const px=(p.lng-a[0])*lngScale, py=(p.lat-a[1])*latScale;
   const bx=(b[0]-a[0])*lngScale, by=(b[1]-a[1])*latScale;
   const len2=bx*bx+by*by; const t=len2?Math.max(0,Math.min(1,(px*bx+py*by)/len2)):0;
   const dx=px-bx*t,dy=py-by*t; return Math.sqrt(dx*dx+dy*dy);
 };
 const distanceFromRoute=pos=>{
   const coords=route?.geometry?.coordinates||[]; if(coords.length<2)return Infinity;
   let min=Infinity; for(let i=1;i<coords.length;i++)min=Math.min(min,pointToSegmentDistance(pos,coords[i-1],coords[i])); return min;
 };
 useEffect(()=>{
   if(status!=='turn'||!demoMode||!route?.geometry?.coordinates?.length)return;
   const coords=route.geometry.coordinates; let start=performance.now(); let raf=0;
   const duration=Math.max(45000,Math.min(90000,route.duration*1000));
   const tickDemo=now=>{const progress=Math.min(1,(now-start)/duration);const scaled=progress*(coords.length-1);const i=Math.min(coords.length-2,Math.floor(scaled));const t=scaled-i;const a=coords[i],b=coords[i+1];setJourneyPosition({lat:a[1]+(b[1]-a[1])*t,lng:a[0]+(b[0]-a[0])*t,accuracy:8,at:Date.now()});if(route.steps?.length)setStepIndex(Math.min(route.steps.length-1,Math.floor(progress*route.steps.length)));if(progress<1)raf=requestAnimationFrame(tickDemo);else setStatus('done');};
   raf=requestAnimationFrame(tickDemo); return()=>cancelAnimationFrame(raf);
 },[status,demoMode,route]);

 useEffect(()=>{
   if((status!=='turn'&&status!=='off')||!position||demoMode||!route?.geometry?.coordinates?.length||!found)return;
   setJourneyPosition(position);
   const tolerance=Math.max(100,Number(position.accuracy||0)*1.5);
   const offRoute=distanceFromRoute(position)>tolerance;
   if(offRoute){
     if(status!=='off')setStatus('off');
     setDeviation(true);
     if(!deviationAlerted.current&&!deviationBusy.current){
       deviationAlerted.current=true; deviationBusy.current=true;
       const alert={type:'journey-deviation',message:`Journey deviation alert: patient appears to be off the planned route to ${found.name}. Current location: ${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}.`,at:Date.now(),ack:false,location:position,destination:{name:found.name,lat:found.lat,lng:found.lng},voiceDataUrl:helpVoice||''};
       Promise.resolve(onJourneyAlert?.(alert)).catch(()=>{}).finally(()=>{deviationBusy.current=false;});
       say(`You appear to be away from the planned route. Your caregiver has been alerted.`);
     }
   } else if(status==='off'||deviation){
     setDeviation(false); setStatus('turn'); deviationAlerted.current=false; say('You are back on the planned route. Continue following the directions.');
   }
 },[position,status,demoMode,route,found,deviation,helpVoice]);

 useEffect(()=>{
   if(status!=='turn'||demoMode||!position||!route?.steps?.length)return;
   let target=stepIndex;
   while(target+1<route.steps.length){
     const next=route.steps[target+1];
     if(!next.location)break;
     const d=haversine(position,{lat:next.location[1],lng:next.location[0]});
     if(d>35)break;
     target+=1;
   }
   if(target!==stepIndex){setStepIndex(target);onJourneyState?.({active:true,startedAt:Date.now(),destination:found,route,stepIndex:target});}
 },[position,status,demoMode,route,stepIndex]);

 useEffect(()=>{
   if(status!=='turn'||!route?.steps?.[stepIndex])return;
   if(lastSpokenStep.current===stepIndex)return;
   lastSpokenStep.current=stepIndex;
   say(route.steps[stepIndex].instruction);
 },[stepIndex,status,route]);
 useEffect(()=>()=>searchTimer.current&&clearTimeout(searchTimer.current),[]);
 const currentStep=route?.steps?.[stepIndex];
 const patientLabel=demoMode?tr('demoRoutePreview'):(status==='turn'||status==='off')?tr('patientLiveLabel'):tr('patientCurrentLabel');
 return <>
  {showDirections&&found&&route?.steps?.length ? <section className="navigation-page">
    <div className="navigation-header">
      <button className="quiet" onClick={()=>setShowDirections(false)}>{tr('backToJourney')}</button>
      <div><span className="eyebrow">{tr('liveJourneyBadge')}</span><h1>{found.name}</h1><p className="lead">{demoMode?tr('demoRoutePreview'):tr('followingLiveGps')} · {(route.distance/1000).toFixed(1)} km · {Math.max(1,Math.round(route.duration/60))} min</p></div>
      <button className={voiceOn?'':'quiet'} onClick={()=>setVoiceOn(v=>!v)}><Volume2 size={17}/> {tr('voiceLabel')} {voiceOn?'ON':'OFF'}</button>
    </div>
    <div className="navigation-grid">
      <div className="navigation-map">
        <Map position={journeyPosition||position} places={[]} destination={found} route={route} journeyActive={status==='turn'||status==='off'} patientLabel={patientLabel} destinationLabel={`${tr('destinationTooltip')}: ${found.name}`}/>
        <div className="map-status"><LocateFixed size={16}/><span>{demoMode?tr('demoMarkerMoving'):tracking?tr('liveGpsTrackingActive'):tr('liveLocationActive')}</span></div>
      </div>
      <div className="navigation-panel">
        {placeDetails&&<div className="current-place-chip"><MapPin size={15}/><span>{placeLoading?tr('fetchingAddress'):(placeDetails.label||tr('noAddress'))}</span></div>}
        <div className={`next-turn ${status==='off'?'warning':''}`}>
          <span className="turn-icon"><Navigation size={27}/></span>
          <div><small>{status==='off'?tr('routeAlertLabel'):tr('now')}</small><strong>{currentStep?localizeDirection(currentStep,voiceLang):directionCopy[voiceLang]?.straight||directionCopy.en.straight}</strong><span>{currentStep?.name||tr('followHighlightedRoute')} · {currentStep?Math.round(currentStep.distance):0} m</span></div>
          <button className="quiet" onClick={()=>currentStep&&say(localizeDirection(currentStep,voiceLang))} aria-label="Hear current direction"><Volume2 size={18}/></button>
        </div>
        {status==='off'&&<div className="route-warning"><AlertTriangle size={18}/><span><strong>{tr('offRouteTitle')}</strong><small>{tr('offRouteDesc')}</small></span></div>}
        <div className="directions-list navigation-list">
          {route.steps.map((step,i)=><button className={`direction-row ${i===stepIndex?'active':''}`} key={i} onClick={()=>{setStepIndex(i);say(localizeDirection(step,voiceLang))}}><span className="direction-number">{i+1}</span><span><strong>{localizeDirection(step,voiceLang)}</strong><small>{step.name&&`${step.name} · `}{Math.round(step.distance)} m</small></span></button>)}
        </div>
        <button className="end-navigation" onClick={()=>{setStatus('done');setShowDirections(false);stopTracking();onJourneyState?.({active:false,endedAt:Date.now(),destination:found,route,stepIndex});say('Journey complete.')}}><CheckCircle2 size={18}/> {tr('endLiveJourney')}</button>
      </div>
    </div>
  </section> : <>
    <div className="page-top"><div><span className="eyebrow">{statusText[status]}</span><h1>{tr('journeyTitle')}</h1><p className="lead">{tr('journeyLead')}</p></div><div className="row wrap"><button className={voiceOn?'':'quiet'} onClick={()=>setVoiceOn(v=>!v)}><Volume2 size={17}/> {tr('voiceLabel')} {voiceOn?'ON':'OFF'}</button></div></div>

    <section className="card journey-planner">
      <div className="inline-form"><label style={{flex:1,position:'relative'}}>{tr('searchDestination')}
        <input value={dest} onChange={e=>searchSuggestions(e.target.value)} placeholder={tr('searchPlaceholder')} autoComplete="off"/>
        {suggestions.length>0&&<div className="destination-suggestions">{suggestions.map((p,i)=><button type="button" key={`${p.lat}-${p.lng}-${i}`} className="suggestion" onClick={()=>chooseDestination(p)}><MapPin size={17}/><span><strong>{p.name}</strong><small>{p.display}</small></span></button>)}</div>}
      </label><button type="button" onClick={()=>suggestions[0]&&chooseDestination(suggestions[0])} disabled={searching||!suggestions.length}>{searching?<RefreshCw className="spin" size={17}/>:<Search size={17}/>} {tr('search')}</button></div>

      {found&&<>
        <div className="journey-map-wrap"><Map position={position} places={[]} destination={found} route={route} journeyActive={false} patientLabel={patientLabel} destinationLabel={`${tr('destinationTooltip')}: ${found.name}`}/></div>
        {placeDetails&&<p className="current-place-line"><MapPin size={14}/> {placeLoading?tr('fetchingAddress'):placeDetails.label}</p>}
        <div className="journey-summary">
          <div className="route-endpoints"><div><span className="endpoint-dot source"></span><div><small>{tr('sourceLabel')}</small><strong>{position?tr('yourCurrentLocation'):tr('locationNotShared')}</strong></div></div><div className="endpoint-line"></div><div><span className="endpoint-dot destination"></span><div><small>{tr('destinationLabel')}</small><strong>{found.name}</strong></div></div></div>
          <div className="estimated-time"><span>{tr('estimatedTime')}</span><strong>{route?`${Math.max(1,Math.round(route.duration/60))} min`:tr('calculating')}</strong>{route&&<small>{(route.distance/1000).toFixed(1)} km</small>}</div>
        </div>
        <button className="start-live-button" type="button" onClick={startJourney} disabled={routing||!route?.steps?.length}><Navigation size={19}/>{routing?tr('preparingRoute'):tr('startLiveJourney')}</button>
        <p className="small journey-helper">{tr('journeyHelper')}</p>
      </>}
    </section>

    {found&&status==='done'&&<section className="card"><div className="row"><h2><CheckCircle2 size={19}/> {tr('journeyCompleteHeading')}</h2><button className="quiet" onClick={()=>setStatus('idle')}>{tr('startAnother')}</button></div></section>}

    <section className="card journey-location-card">
      <h2>{tr('yourLocation')}</h2>
      <div className="live-location-map-wrap"><Map position={position} places={[]} patientLabel={patientLabel} emptyText={tr('noLocationShared')}/></div>
      {position?<>
        <p className="current-place-line"><MapPin size={14}/> {placeLoading?tr('fetchingAddress'):(placeDetails?.label||tr('noAddress'))}</p>
        <p className="small muted">{position.lat.toFixed(5)}, {position.lng.toFixed(5)} · ±{Math.round(position.accuracy||0)} m</p>
      </>:<p>{tr('noLocationShared')}</p>}
      {!locationConsent?<div className="route-warning"><AlertTriangle size={17}/><span><strong>{tr('locationSharingOff')}</strong><small>{tr('locationSharingOffDesc')}</small></span>{onOpenPrivacy&&<button className="quiet" onClick={onOpenPrivacy}>{tr('openPrivacySettings')}</button>}</div>
      :tracking?<button className="quiet" onClick={stopTracking}>{tr('stopLiveLocation')}</button>:<button onClick={async()=>{try{await startTracking();}catch(e){/* App already shows the reason at the top */}}}>{tr('startLiveLocation')}</button>}
    </section>
    <section className="card"><h2><AlertTriangle size={18}/> {tr('safetyNote')}</h2><p className="small">{tr('safetyNoteDesc')}</p></section>
  </>}
 </>;

}
