import {safeStorage} from './browserStorage';
import React,{useMemo,useRef,useState} from 'react';
import {User,Users,Award,Flame,Volume2,Trash2,Plus,Check,Camera,Mic,Home,MapPin,Search,RefreshCw} from 'lucide-react';
import {readAloud} from './voice';
import {translate,tf} from './i18n';
import MedicalReports from './MedicalReports';
import Map from './Map';

const uid=()=>crypto.randomUUID();
const colors=['#e8f1e9','#f7ead7','#e6edf4','#f1e8ef','#e8ece0'];
const NOMINATIM='https://nominatim.openstreetmap.org/search';
const HOME_RADIUS=200; // metres — how far the patient can go before caregiver is alerted

function MyHomeSection({t,homePlace,onSetHome,onRemoveHome}){
 const [editing,setEditing]=useState(!homePlace);
 const [query,setQuery]=useState(homePlace?.address||'');
 const [suggestions,setSuggestions]=useState([]);
 const [searching,setSearching]=useState(false);
 const [found,setFound]=useState(null);
 const [saving,setSaving]=useState(false);
 const searchTimer=useRef(null);
 const search=value=>{
  setQuery(value);setFound(null);
  if(searchTimer.current)clearTimeout(searchTimer.current);
  if(value.trim().length<3){setSuggestions([]);return;}
  searchTimer.current=setTimeout(async()=>{
   setSearching(true);
   try{const r=await fetch(`${NOMINATIM}?q=${encodeURIComponent(value.trim())}&format=json&limit=6&addressdetails=1&accept-language=en`);const x=await r.json();setSuggestions(x.map(p=>({lat:Number(p.lat),lng:Number(p.lon),name:p.display_name.split(',')[0],display:p.display_name})));}
   catch{setSuggestions([]);}
   finally{setSearching(false);}
  },300);
 };
 const choose=p=>{setSuggestions([]);setFound(p);setQuery(p.display);};
 const save=async()=>{
  if(!found)return;setSaving(true);
  try{await onSetHome({name:'Home',lat:found.lat,lng:found.lng,address:found.display,radius:HOME_RADIUS,cue:t('nearHomeCue')});setEditing(false);setFound(null);setSuggestions([]);}
  finally{setSaving(false);}
 };
 const previewLocation=found||(homePlace?{lat:homePlace.lat,lng:homePlace.lng,name:'Home'}:null);
 return <section className="card">
  <h2><Home size={19}/> {t('myHomeTitle')}</h2>
  <p className="small" style={{marginTop:-8,marginBottom:16}}>{t('myHomeDesc')}</p>
  {!editing&&homePlace&&<>
   <p className="current-place-line"><MapPin size={14}/> {homePlace.address||t('noAddress')}</p>
   <div className="journey-map-wrap"><Map destination={{lat:homePlace.lat,lng:homePlace.lng,name:'Home'}} destinationLabel={t('myHomeTitle')}/></div>
   <div className="row wrap" style={{marginTop:16}}>
    <button type="button" onClick={()=>{setEditing(true);setQuery(homePlace.address||'');}}><Home size={16}/> {t('updateHomeAddress')}</button>
    <button type="button" className="quiet" onClick={onRemoveHome}><Trash2 size={15}/> {t('removeHomeAddress')}</button>
   </div>
  </>}
  {editing&&<>
   <div className="inline-form"><label style={{flex:1,position:'relative'}}>{t('homeAddressLabel')}
    <input value={query} onChange={e=>search(e.target.value)} placeholder={t('homeAddressPlaceholder')} autoComplete="off"/>
    {suggestions.length>0&&<div className="destination-suggestions">{suggestions.map((p,i)=><button type="button" key={`${p.lat}-${p.lng}-${i}`} className="suggestion" onClick={()=>choose(p)}><MapPin size={17}/><span><strong>{p.name}</strong><small>{p.display}</small></span></button>)}</div>}
   </label>{searching&&<RefreshCw className="spin" size={17}/>}</div>
   {previewLocation&&<div className="journey-map-wrap"><Map destination={previewLocation} destinationLabel={t('myHomeTitle')}/></div>}
   <div className="row wrap" style={{marginTop:16}}>
    <button type="button" onClick={save} disabled={!found||saving}><Check size={16}/> {saving?t('savingEllipsis'):t('saveHomeAddress')}</button>
    {homePlace&&<button type="button" className="quiet" onClick={()=>{setEditing(false);setFound(null);setSuggestions([]);setQuery(homePlace.address||'');}}>{t('cancel')}</button>}
   </div>
  </>}
  <p className="small" style={{marginTop:16}}>{t('myHomeAlertNote')}</p>
 </section>;
}

export default function Profile({user,lang,family,settings,scores,reports,homePlace,onSave,onDelete,onSetHome,onRemoveHome,onUploadReport,onDeleteReport}){
 const t=k=>translate(lang,k);
 const [tab,setTab]=useState('account');
 const [name,setName]=useState(settings?.name||user?.name||'');
 const [age,setAge]=useState(settings?.age||user?.age||'');
 const [phone,setPhone]=useState(settings?.phone||user?.phone||'');
 const [photo,setPhoto]=useState(()=>safeStorage.getItem('smriti-profile-photo:'+user.id)||settings?.photo||user?.photo||'');
 const [nm,setNm]=useState(''),[rel,setRel]=useState(''),[famAge,setFamAge]=useState(''),[occ,setOcc]=useState('');
 const [famPhoto,setFamPhoto]=useState('');
 const [voiceData,setVoiceData]=useState(()=>settings?.voiceDataUrl||safeStorage.getItem('smriti-help-voice:'+user.id)||'');
 const [voiceRecording,setVoiceRecording]=useState(false),[voiceSaving,setVoiceSaving]=useState(false),[voiceError,setVoiceError]=useState('');
 const fileRef=useRef(null),famRef=useRef(null),voiceRecorderRef=useRef(null),voiceChunksRef=useRef([]),voiceTimerRef=useRef(null);
 const streak=useMemo(()=>{const days=new Set(scores.map(s=>new Date(s.at||0).toDateString()));let d=new Date();let n=0;for(;;){if(days.has(d.toDateString())){n++;d.setDate(d.getDate()-1);}else break;}return n;},[scores]);
 const badges=[['first','🌱',t('badgeFirst'),scores.length>=1],['five','⭐',t('badgeFive'),scores.length>=5],['ten','🏆',t('badgeTen'),scores.length>=10],['streak','🔥',t('badgeStreak'),streak>=3]];
 const read=file=>{if(!file)return;const r=new FileReader();r.onload=()=>setPhoto(String(r.result));r.readAsDataURL(file);};
 const readFam=file=>{if(!file)return;const r=new FileReader();r.onload=()=>setFamPhoto(String(r.result));r.readAsDataURL(file);};
 const saveProfile=async()=>{if(photo)safeStorage.setItem('smriti-profile-photo:'+user.id,photo);else safeStorage.removeItem('smriti-profile-photo:'+user.id);await onSave({name:name.trim()||user.name,age:age?Number(age):undefined,phone});};
 const addFamily=async()=>{if(!nm.trim()||!rel.trim())return;if(famPhoto)safeStorage.setItem('smriti-family-photo:'+nm.trim().toLowerCase(),famPhoto);await onSave({familyAdd:{id:uid(),name:nm.trim(),relation:rel.trim(),age:famAge?Number(famAge):undefined,occupation:occ.trim()}});setNm('');setRel('');setFamAge('');setOcc('');setFamPhoto('');};
 const saveVoice=async dataUrl=>{setVoiceSaving(true);setVoiceError('');try{if(dataUrl.length>50000)throw new Error(t('voiceTooLong'));safeStorage.setItem('smriti-help-voice:'+user.id,dataUrl);await onSave({voiceDataUrl:dataUrl});setVoiceData(dataUrl);}catch(e){setVoiceError(e.message||t('voiceSaveFailed'));}finally{setVoiceSaving(false);}};
 const startVoiceRecording=async()=>{if(voiceRecording)return;setVoiceError('');try{if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder)throw new Error(t('voiceUnsupported'));const stream=await navigator.mediaDevices.getUserMedia({audio:true});let options={};if(MediaRecorder.isTypeSupported('audio/webm;codecs=opus'))options={mimeType:'audio/webm;codecs=opus',audioBitsPerSecond:24000};else if(MediaRecorder.isTypeSupported('audio/webm'))options={mimeType:'audio/webm',audioBitsPerSecond:24000};const recorder=new MediaRecorder(stream,options);voiceChunksRef.current=[];voiceRecorderRef.current=recorder;recorder.ondataavailable=e=>{if(e.data.size)voiceChunksRef.current.push(e.data);};recorder.onstop=()=>{stream.getTracks().forEach(t=>t.stop());const blob=new Blob(voiceChunksRef.current,{type:recorder.mimeType||'audio/webm'});const reader=new FileReader();reader.onload=()=>saveVoice(String(reader.result));reader.readAsDataURL(blob);setVoiceRecording(false);voiceRecorderRef.current=null;};recorder.onerror=()=>{stream.getTracks().forEach(t=>t.stop());setVoiceRecording(false);setVoiceError(t('voiceRecordFailed'));};recorder.start();setVoiceRecording(true);voiceTimerRef.current=setTimeout(()=>{if(recorder.state==='recording')recorder.stop();},5000);}catch(e){setVoiceRecording(false);setVoiceError(e.message||t('micPermissionNeeded'));}};
 const stopVoiceRecording=()=>{clearTimeout(voiceTimerRef.current);if(voiceRecorderRef.current?.state==='recording')voiceRecorderRef.current.stop();};
 const removeVoice=async()=>{clearTimeout(voiceTimerRef.current);voiceRecorderRef.current?.stop?.();safeStorage.removeItem('smriti-help-voice:'+user.id);setVoiceData('');await onSave({voiceDataUrl:''});};
 return <>
  <div className="page-top"><div><span className="eyebrow">{t('yourSpace')}</span><h1>{t('profile')}</h1><p className="lead">{t('profileLead')}</p></div></div>
  <div className="card" style={{display:'flex',gap:8,flexWrap:'wrap',padding:10}}>{[['account','👤 '+t('tabAccount')],['home','🏠 '+t('tabHome')],['reports','📄 '+t('tabReports')],['rewards','🏆 '+t('tabRewards')]].map(([id,label])=><button key={id} className={tab===id?'':'quiet'} onClick={()=>setTab(id)}>{label}</button>)}</div>
  {tab==='account'&&<section className="card"><h2><User size={19}/> {t('editProfileTitle')}</h2><div className="row wrap" style={{margin:'18px 0'}}><div className="mini-profile" style={{width:80,height:80,borderRadius:'50%',overflow:'hidden',display:'grid',placeItems:'center',background:'#e8f1e9',fontSize:30}}>{photo?<img src={photo} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>:name?.[0]?.toUpperCase()}</div><label className="quiet" style={{cursor:'pointer'}}><Camera size={16}/> {t('uploadPhoto')}<input ref={fileRef} type="file" accept="image/*" hidden onChange={e=>read(e.target.files?.[0])}/></label>{photo&&<button className="quiet" onClick={()=>setPhoto('')}><Trash2 size={15}/> {t('removeLabel')}</button>}</div><div className="form-grid"><label>{t('fullName')}<input value={name} onChange={e=>setName(e.target.value)}/></label><label>{t('ageLabel')}<input type="number" min="1" max="120" value={age} onChange={e=>setAge(e.target.value)}/></label><label>{t('phoneLabel')}<input type="tel" value={phone} onChange={e=>setPhone(e.target.value)}/></label></div><button onClick={saveProfile} style={{marginTop:16}}><Check size={16}/> {t('saveChanges')}</button><section className="profile-voice-card"><div><span className="eyebrow">{t('personalHelpVoice')}</span><h3><Mic size={18}/> {t('addYourVoice')}</h3><p className="small">{t('voiceNoteDesc')}</p></div><div className="voice-record-actions">{voiceRecording?<button type="button" className="help" onClick={stopVoiceRecording}><Mic size={17}/> {t('stopRecording')}</button>:<button type="button" onClick={startVoiceRecording} disabled={voiceSaving}><Mic size={17}/> {voiceSaving?t('savingEllipsis'):voiceData?t('recordAgain'):t('addYourVoice')}</button>}{voiceData&&<><audio controls src={voiceData} preload="metadata"/><button type="button" className="quiet" onClick={removeVoice}>{t('removeVoiceLabel')}</button></>}</div>{voiceRecording&&<p className="small" aria-live="polite">{t('recordingHint')}</p>}{voiceError&&<p className="small error-text">{voiceError}</p>}</section></section>}

  {tab==='home'&&<MyHomeSection t={t} homePlace={homePlace} onSetHome={onSetHome} onRemoveHome={onRemoveHome}/>}

  {tab==='reports'&&<><div className="page-top"><div><span className="eyebrow">{t('yourRecords')}</span><h1>{t('medicalHistoryTitle')}</h1></div></div><MedicalReports mode="patient" reports={reports||[]} onUpload={onUploadReport} onDelete={onDeleteReport}/></>}

  {tab==='rewards'&&<section className="card"><h2><Award size={19}/> {t('rewardsStreakTitle')}</h2><div className="stats" style={{marginTop:18}}><div><Flame/><strong>{streak}</strong><span>{t('currentStreak')}</span></div><div><Award/><strong>{scores.length}</strong><span>{t('activitiesCompleted')}</span></div><div><Check/><strong>{scores.reduce((a,s)=>a+(s.accuracy||0),0)?Math.round(scores.reduce((a,s)=>a+(s.accuracy||0),0)/scores.length*100):0}%</strong><span>{t('practiceAccuracy')}</span></div></div><div className="two-col">{badges.map(([id,ic,label,on])=><div className="card" key={id} style={{margin:0,opacity:on?1:.45}}><div style={{fontSize:30}}>{ic}</div><strong>{label}</strong><p className="small">{on?t('unlockedLabel'):t('keepPractisingLabel')}</p></div>)}</div><button className="quiet" style={{marginTop:18}} onClick={()=>readAloud(tf(lang,'streakProgress',{streak,count:scores.length}),lang)}><Volume2 size={16}/> {t('hearProgress')}</button></section>}
 </>;
}
