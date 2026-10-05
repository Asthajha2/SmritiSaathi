import {safeStorage} from './browserStorage';
import MemoryGarden from './MemoryGarden';
import GardenFeature from './GardenFeature';
import {gps,isNative,syncNativeReminders} from './native';
import React,{useCallback,useEffect,useMemo,useRef,useState} from 'react';
import {Sun,Brain,CalendarDays,MapPin,Users,Shield,Heart,Mic,Volume2,Wifi,WifiOff,ArrowRight,Check,Plus,LogOut,Bell,Activity,Pill,Trash2,Clock,BarChart3,Route as RouteIcon,MapPinned,FileText,Lightbulb,MessageCircle,Send,ChevronDown,Camera,X,Sparkles,Calendar,Type,BookOpen} from 'lucide-react';
import MedicalReports from './MedicalReports';
import FamilyMemories from './FamilyMemories';
import {languages,translate} from './i18n';
import {api,local,syncQueue} from './storage';
import {readAloud,listen,recordWhisper} from './voice';
import {enablePush} from './push';
import Game,{domains} from './Game';
import Map from './Map';
import Music from './Music';
import Profile from './Profile';
import JourneyAssist from './JourneyAssist';
import StoryTime from './StoryTime';
import {gameIds,nextDifficulty,outsideZone,distanceMetres,trend} from '../shared/logic';
const nav=[['home',Sun],['games',Brain],['stories',BookOpen],['reminders',CalendarDays],['journey',MapPin],['care',Users],['profile',Users],['music',Volume2],['privacy',Shield]];
const caregiverNav=[['care',Users,'Connect / Care'],['reminders',CalendarDays,'Reminders'],['journey',MapPin,'Live Journey'],['performance',BarChart3,'Performance'],['reports',FileText,'Medical History'],['suggestions',Lightbulb,'Suggestions'],['memories',Camera,'Memories']];
const suggestionTopics=[
 {icon:'🏠',title:'Daily routines & environment',points:[
   {q:'Keep a steady daily routine',a:'Try to keep wake-up, meals, activities, and bedtime at roughly the same time every day. A predictable rhythm reduces the mental effort needed to figure out “what happens next,” which lowers anxiety and confusion. Use visual cues like a large clock, a daily whiteboard, or gentle verbal reminders to reinforce the schedule. Even small deviations, like a late lunch, can unsettle someone with dementia, so aim for consistency over perfection.'},
   {q:'Make the home safer',a:'Walk through the home and remove loose rugs, tangled cords, and clutter that could cause a fall. Add grab bars in the bathroom, non-slip mats near the tub, and brighter lighting in hallways and staircases. If wandering is a concern, install door or window alarms, consider a GPS tracker, and label rooms with simple signs or pictures. Small changes made early can prevent serious injuries later.'}
 ]},
 {icon:'🗣️',title:'Communication',points:[
   {q:'Use short, simple sentences',a:'Break instructions into one step at a time instead of giving a list of things to do at once. Ask yes/no or either/or questions rather than open-ended ones, since too many choices can overwhelm someone with memory loss. Speak slowly, make eye contact, and give them extra time to respond before repeating or rephrasing. Using their name and keeping a calm, warm tone also helps hold their attention.'},
   {q:'Don’t argue or reason',a:'When a person with dementia insists on something that isn’t true, arguing rarely helps and usually increases distress for both of you. Instead, acknowledge how they feel first — “I can see this is upsetting you” — before gently redirecting the conversation. Correcting facts head-on can feel like an attack to someone who can’t process the correction logically. Meeting them in their reality, rather than forcing them into yours, usually calms things down faster.'}
 ]},
 {icon:'🍽️',title:'Meals & hygiene',points:[
   {q:'Simplify the plate',a:'Serve one food item at a time instead of a full plate with several items, since too many choices can cause confusion or refusal to eat. Use plain, solid-coloured plates so the food is easy to see and distinguish, and offer finger foods if using utensils has become difficult. Keep portions small and offer seconds rather than overwhelming them with a large serving upfront. A calm mealtime, without the TV or other distractions, also helps them stay focused on eating.'},
   {q:'Warm the bathroom first',a:'Resistance to bathing is often about feeling cold, exposed, or frightened rather than a dislike of being clean. Warm the bathroom beforehand, keep towels within reach, and check that the water is at a comfortable temperature before they get in. Explain each step calmly as you go — “now I’m going to wash your arm” — so nothing feels sudden or surprising. Letting them hold the washcloth or do small parts themselves can also restore a sense of control.'}
 ]},
 {icon:'🧘',title:'Caring for yourself',points:[
   {q:'Ask for backup',a:'Caregiving alone is unsustainable over the long term, so build a support network early rather than waiting until you’re exhausted. Ask family members to take specific shifts, look into local day-care programs, or hire part-time help for even a few hours a week. Sharing the responsibility isn’t a failure — it protects both your wellbeing and the quality of care the patient receives. Regular breaks, even short ones, help you stay patient and present during the time you are on duty.'},
   {q:'Protect your sleep',a:'Sundowning — increased confusion and agitation in the evening — can disrupt your sleep as much as the patient’s. If nighttime wandering or restlessness is common, consider overnight respite care, a rotating family schedule, or a monitored safety system so you’re not the only line of defence every night. Chronic sleep deprivation affects your judgement, patience, and physical health, which in turn affects the care you’re able to give. Treat your own rest as a non-negotiable part of the care plan, not an afterthought.'}
 ]}
];
const stageOptions=[['Early stage','Still fairly independent, occasional memory lapses'],['Middle stage','Needs regular help, more noticeable confusion'],['Late stage','Needs full-time care and supervision'],['Not sure yet','Still figuring this out']];
const challengeOptions=['Wandering','Aggression or agitation','Repeating questions','Sleep issues / sundowning','Eating difficulty','Refusing to bathe','Something else'];
// Static, offline knowledge base for the assistant — no AI call needed. The bot asks the
// two quick questions above, then looks answers up here. Swap sendChat back to calling
// the /assistant API later if a real AI backend is wired up.
const stageTips={
 'Early stage':'Focus on routines, safety-proofing the home, and keeping them involved in familiar tasks they can still manage.',
 'Middle stage':'Simplify choices, break tasks into single steps, and expect to give more hands-on help with daily care.',
 'Late stage':'Prioritise comfort, gentle communication, and full support with eating, hygiene, and mobility.',
 'Not sure yet':'A doctor or memory clinic can help confirm the stage — these general tips apply at any point meanwhile.'
};
const challengeTips={
 'Wandering':'Use door alarms or locks, and keep a recent photo handy in case you need help finding them. A safe space to walk indoors can ease the urge to wander.',
 'Aggression or agitation':'Stay calm, keep your voice low, and look for a trigger — pain, hunger, or noise. Redirect to a favourite activity rather than arguing.',
 'Repeating questions':'Answer briefly and warmly each time rather than pointing out the repetition. A visible note or clock can sometimes help.',
 'Sleep issues / sundowning':'Keep afternoons calm, limit caffeine and late naps, and turn on good lighting before dusk to ease confusion.',
 'Eating difficulty':'Offer one food at a time, cut food small, and keep mealtimes calm and unhurried.',
 'Refusing to bathe':'Warm the bathroom first, go slow, and let them keep as much control over the process as possible.',
 'Something else':'Try one of the tips on the left, or tell me a keyword like “sleep”, “eating”, or “safety” and I will share what usually helps.'
};
function buildStageChallengeReply(stage,challenges){
 const parts=[];
 if(stage&&stageTips[stage])parts.push(stageTips[stage]);
 (challenges.length?challenges:['Something else']).forEach(c=>{if(challengeTips[c])parts.push(`${c}: ${challengeTips[c]}`);});
 return parts.join('\n\n');
}
function staticAssistantAnswer(message){
 const q=message.toLowerCase();
 for(const [key,tip] of Object.entries(challengeTips)){
  const kws=key.toLowerCase().split(/[^a-z]+/).filter(w=>w.length>3);
  if(kws.some(k=>q.includes(k)))return tip;
 }
 for(const topic of suggestionTopics)for(const p of topic.points){
  const kws=p.q.toLowerCase().split(/[^a-z]+/).filter(w=>w.length>4);
  if(kws.some(k=>q.includes(k)))return `${p.q} — ${p.a}`;
 }
 return 'I can help with routines, communication, meals & hygiene, safety, sleep, wandering, and caregiver self-care. Try asking about one of these, or tap a tip on the left.';
}
function SuggestionPoint({q,a}){
 const [open,setOpen]=useState(false);
 return <div className={'suggestion-point'+(open?' open':'')}>
  <button type="button" className="suggestion-point-toggle" aria-expanded={open} onClick={()=>setOpen(o=>!o)}>
   <span>{q}</span><ChevronDown size={17}/>
  </button>
  {open&&<p className="suggestion-point-desc">{a}</p>}
 </div>;
}
const gameIcons=['◈','▦','123','☀','♡','◎','♫','＋','⊙'];
const uid=()=>crypto.randomUUID();
function CaregiverMemoriesPage({patient,links,memories,onAdd,onDelete,lang}){
  const [newTitle,setNewTitle]=useState('');
  const [newPhoto,setNewPhoto]=useState('');
  const [busy,setBusy]=useState(false);
  const [preview,setPreview]=useState(null);
  const [evTitle,setEvTitle]=useState('');
  const [evWhen,setEvWhen]=useState('');
  const [evStory,setEvStory]=useState('');
  const [evPhoto,setEvPhoto]=useState('');
  const [evBusy,setEvBusy]=useState(false);
  const [evPreview,setEvPreview]=useState(null);
  const [evSpeaking,setEvSpeaking]=useState(false);
  const fileRef=useRef(null);
  const evFileRef=useRef(null);
  const readPhoto=file=>{if(!file)return;const r=new FileReader();r.onload=()=>setNewPhoto(String(r.result));r.readAsDataURL(file);};
  const readEvPhoto=file=>{if(!file)return;const r=new FileReader();r.onload=()=>setEvPhoto(String(r.result));r.readAsDataURL(file);};
  const save=async()=>{if(!newPhoto||!patient)return;setBusy(true);try{await onAdd({title:newTitle.trim()||'From caregiver',photoDataUrl:newPhoto,addedBy:'caregiver',memberName:newTitle.trim(),at:Date.now()});setNewTitle('');setNewPhoto('');}finally{setBusy(false);}};
  const saveEvent=async()=>{if(!evTitle.trim()||!evStory.trim()||!patient)return;setEvBusy(true);try{await onAdd({title:evTitle.trim(),memType:'event',eventDate:evWhen.trim(),story:evStory.trim(),photoDataUrl:evPhoto||undefined,addedBy:'caregiver',at:Date.now()});setEvTitle('');setEvWhen('');setEvStory('');setEvPhoto('');}finally{setEvBusy(false);}};
  const speakEvent=m=>{setEvSpeaking(true);readAloud([m.title,m.eventDate?(translate(lang||'en','onDatePrefix')+m.eventDate):'',m.story].filter(Boolean).join('. '),lang||'en').catch(()=>{}).finally(()=>setEvSpeaking(false));};
  const patientName=links.find(x=>x.id===patient)?.name||'the patient';
  const events=memories.filter(m=>m.memType==='event');
  return<section className="caregiver-page">
    <div className="page-top"><div><span className="eyebrow">FAMILY MEMORIES</span><h1>Memories</h1><p className="lead">Share photos and important life-event memories for {patientName}. They will appear in the Memories bar on their home screen, and can be read aloud there.</p></div></div>
    {!patient&&<div className="card"><p>Select a linked patient first to manage their memories.</p></div>}
    {patient&&<>
    <section className="card"><h2><Camera size={19}/> Add a Memory Photo</h2>
      {newPhoto?(
        <div style={{marginBottom:16}}>
          <img src={newPhoto} alt="Preview" style={{width:'100%',maxHeight:260,objectFit:'cover',borderRadius:14,marginBottom:8}}/>
          <button type="button" className="quiet" style={{fontSize:'.8rem',minHeight:'auto',padding:'8px 14px'}} onClick={()=>setNewPhoto('')}><Trash2 size={13}/> Remove</button>
        </div>
      ):(
        <button type="button" className="memory-photo-pick" style={{marginBottom:16}} onClick={()=>fileRef.current?.click()}><Camera size={24}/><span>Choose a photo to upload</span></button>
      )}
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={e=>readPhoto(e.target.files?.[0])}/>
      <label style={{marginBottom:14}}>Caption (optional — shown below the photo)<input value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="e.g. Dad's birthday 2024"/></label>
      <button onClick={save} disabled={!newPhoto||busy}>{busy?'Saving…':'Send to patient'} <ArrowRight size={18}/></button>
    </section>

    <section className="card"><h2><Sparkles size={19}/> Add a Life Event Memory</h2>
      <p className="small" style={{marginTop:-8,marginBottom:16}}>Write about an important date or event from {patientName}'s life. It will show up as a tappable flashcard that gets read aloud when opened — a gentle "do you remember this?" prompt.</p>
      <label style={{marginBottom:14}}>Event title<input value={evTitle} onChange={e=>setEvTitle(e.target.value)} placeholder="e.g. Wedding anniversary" maxLength="120"/></label>
      <label style={{marginBottom:14}}>When did it happen? (optional)<input value={evWhen} onChange={e=>setEvWhen(e.target.value)} placeholder="e.g. 12 August 1975, or just 1975"/></label>
      <label style={{marginBottom:14}}>Tell the story<textarea value={evStory} onChange={e=>setEvStory(e.target.value)} placeholder="Write the details so they can be read back to the patient…" rows={4} style={{width:'100%',border:'1px solid #aebfb5',borderRadius:9,padding:'11px 12px',fontFamily:'inherit',fontSize:'1rem',resize:'vertical'}}/></label>
      {evPhoto?(
        <div style={{marginBottom:14}}>
          <img src={evPhoto} alt="Preview" style={{width:'100%',maxHeight:200,objectFit:'cover',borderRadius:14}}/>
          <button type="button" className="quiet" style={{marginTop:8,fontSize:'.8rem',minHeight:'auto',padding:'8px 14px'}} onClick={()=>setEvPhoto('')}><Trash2 size={13}/> Remove photo</button>
        </div>
      ):(
        <button type="button" className="quiet" style={{marginBottom:14,width:'100%'}} onClick={()=>evFileRef.current?.click()}><Camera size={16}/> Add a photo (optional)</button>
      )}
      <input ref={evFileRef} type="file" accept="image/*" hidden onChange={e=>readEvPhoto(e.target.files?.[0])}/>
      <button onClick={saveEvent} disabled={!evTitle.trim()||!evStory.trim()||evBusy}>{evBusy?'Saving…':'Send to patient'} <ArrowRight size={18}/></button>
    </section>

    <section className="card"><h2>Shared memory photos ({memories.filter(m=>m.addedBy==='caregiver'&&m.memType!=='event').length})</h2>
      {memories.filter(m=>m.addedBy==='caregiver'&&m.memType!=='event').length===0&&<p>No photos uploaded yet. Add one above — it will appear in the patient's home screen memories bar.</p>}
      <div className="memories-caregiver-grid">
        {memories.filter(m=>m.addedBy==='caregiver'&&m.memType!=='event').sort((a,b)=>(b.at||0)-(a.at||0)).map(m=>(
          <div key={m.id} className="memory-caregiver-card" onClick={()=>setPreview(m)}>
            <img src={m.photoDataUrl} alt={m.title}/>
            <div className="memory-caregiver-info">
              <strong>{m.title}</strong>
              {m.at&&<small>{new Date(m.at).toLocaleDateString()}</small>}
            </div>
            <button className="memory-caregiver-del" type="button" onClick={e=>{e.stopPropagation();onDelete(m.id);}} aria-label="Delete"><Trash2 size={14}/></button>
          </div>
        ))}
      </div>
    </section>

    <section className="card"><h2>Life event memories ({events.length})</h2>
      {events.length===0&&<p>No life-event memories yet. Add one above — it will appear as a flashcard in the patient's memories bar.</p>}
      {events.length>0&&<div className="list-row-list">
        {events.sort((a,b)=>(b.at||0)-(a.at||0)).map(m=>(
          <div key={m.id} className="list-row" onClick={()=>setEvPreview(m)} style={{cursor:'pointer'}}>
            <Sparkles size={19}/>
            <div><strong>{m.title}</strong><p>{m.eventDate?m.eventDate+' · ':''}{m.addedBy==='caregiver'?'Shared by you':'Added by patient'}</p></div>
            <button className="quiet" type="button" onClick={e=>{e.stopPropagation();onDelete(m.id);}} aria-label="Delete"><Trash2 size={14}/></button>
          </div>
        ))}
      </div>}
    </section>
    </>}
    {preview&&<div className="memory-overlay memory-add-overlay" onClick={()=>setPreview(null)}>
      <div style={{position:'relative',maxWidth:500,width:'90%',borderRadius:18,overflow:'hidden'}} onClick={e=>e.stopPropagation()}>
        <img src={preview.photoDataUrl} alt={preview.title} style={{width:'100%',display:'block'}}/>
        <div className="memory-slide-caption" style={{position:'absolute',bottom:0,left:0,right:0}}>
          <Heart size={15} fill="currentColor" color="#fff"/>
          <strong style={{color:'#fff'}}>{preview.title}</strong>
        </div>
        <button className="memory-x" onClick={()=>setPreview(null)} style={{background:'rgba(0,0,0,.45)',color:'#fff'}}><X size={20}/></button>
      </div>
    </div>}
    {evPreview&&<div className="memory-overlay memory-add-overlay" onClick={()=>setEvPreview(null)}>
      <div className="memory-add-sheet" onClick={e=>e.stopPropagation()}>
        <button className="memory-x" style={{position:'static',marginLeft:'auto',display:'flex'}} onClick={()=>setEvPreview(null)}><X size={20}/></button>
        {evPreview.eventDate&&<span className="flash-date-pill" style={{background:'#e8f1e9',color:'var(--green)'}}><Calendar size={14}/>{evPreview.eventDate}</span>}
        <h3 style={{margin:'10px 0 6px'}}>{evPreview.title}</h3>
        {evPreview.photoDataUrl&&<img src={evPreview.photoDataUrl} alt={evPreview.title} style={{width:'100%',maxHeight:220,objectFit:'cover',borderRadius:14,margin:'8px 0'}}/>}
        <p>{evPreview.story}</p>
        <button type="button" onClick={()=>speakEvent(evPreview)}><Volume2 size={18}/> {evSpeaking?'Speaking…':'Listen'}</button>
      </div>
    </div>}
  </section>;
}

function Auth({t,onLogin,notify}){const [signup,setSignup]=useState(false),[busy,setBusy]=useState(false);return <div className="auth"><section className="auth-story"><div className="brand"><span className="brand-mark">S</span>SmritiSaathi</div><span className="eyebrow">SMRITI · MEMORY &nbsp; SAATHI · COMPANION</span><h1>Every day,<br/>a familiar<br/><em>friend.</em></h1><p>Small moments of practice.<br/>A little help remembering.<br/>A connection to the people who care.</p><div className="auth-note"><Heart size={24}/><span>Made for a gentler everyday.</span></div></section><section className="auth-form card"><span className="eyebrow">WELCOME TO SMRITISAATHI</span><h2>{signup?t('signup'):t('signin')}</h2><p>Your space for everyday memory support.</p><form onSubmit={async e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget));data.consent=data.consent==='on';setBusy(true);try{const user=await api('/auth/'+(signup?'signup':'login'),{method:'POST',body:JSON.stringify(data)});await onLogin(user);}catch(err){notify(err.message);}finally{setBusy(false);}}}>{signup&&<><label>{t('name')}<input name="name" required maxLength="100" autoComplete="name"/></label><label>Account type<select name="role"><option value="patient">{t('patient')}</option><option value="caregiver">{t('caregiver')}</option></select></label></>}<label>{t('email')}<input name="email" type="email" required autoComplete="email"/></label><label>{t('password')}<input name="password" type="password" required minLength="10" maxLength="128" autoComplete={signup?'new-password':'current-password'}/></label>{signup&&<label className="check"><input name="consent" type="checkbox" required/><span>{t('consent')}</span></label>}<button className="wide" disabled={busy}>{busy?'Please wait…':signup?t('signup'):t('signin')} <ArrowRight size={20}/></button></form><button className="quiet wide" onClick={()=>setSignup(!signup)}>{signup?'Already have an account? Sign in':'New here? Create an account'}</button><p className="small">{t('support')} First sign-in requires a connection. Use a private device: offline data is stored in this browser.</p></section></div>;}

function CaregiverJourney({records,journeys}){
 const latestLocation=records.filter(r=>r.kind==='location').sort((a,b)=>b.data.at-a.data.at)[0]?.data;
 const latestJourney=journeys.sort((a,b)=>(b.updated||0)-(a.updated||0))[0];
 const active=latestJourney?.active;
 const destination=latestJourney?.destination;
 const route=latestJourney?.route;
 const [tick,setTick]=useState(Date.now());
 useEffect(()=>{const id=setInterval(()=>setTick(Date.now()),10000);return()=>clearInterval(id);},[]);
 return <section className="caregiver-page">
   <div className="page-top"><div><span className="eyebrow">LIVE MONITORING</span><h1>Patient Live Journey</h1><p className="lead">{active?'Patient is currently travelling. The marker updates from the latest shared GPS location.':'No active journey right now.'}</p></div><span className={`pill ${active?'pill-live':''}`}>{active?'● Live':'● Waiting'}</span></div>
   <section className="card caregiver-live-map"><div className="journey-meta"><div><small>DESTINATION</small><strong>{destination?.name||'No active destination'}</strong></div><div><small>LOCATION</small><strong>{latestLocation?`Updated ${Math.max(0,Math.round((tick-latestLocation.at)/1000))}s ago`:'Waiting for location'}</strong></div></div><Map position={latestLocation||null} places={[]} destination={destination||null} route={route||null} journeyActive={!!active}/></section>
   {records.filter(r=>r.kind==='alert').length>0&&<div className="card caregiver-note"><Bell size={19}/><div><strong>Recent safety alert</strong><p>Review the latest alert below. The patient's saved help voice is available when attached.</p>{records.filter(r=>r.kind==='alert').sort((a,b)=>b.data.at-a.data.at)[0]?.data.voiceDataUrl&&<div className="alert-voice"><Mic size={15}/><span>Patient's saved help voice</span><audio controls src={records.filter(r=>r.kind==='alert').sort((a,b)=>b.data.at-a.data.at)[0].data.voiceDataUrl}/></div>}</div></div>}
  </section>;
}
function CaregiverPerformance({scores,reminders,alerts}){
 const recent=scores.slice(-7);
 const avg=recent.length?Math.round(recent.reduce((a,s)=>a+(Number(s.accuracy)||0),0)/recent.length*100):0;
 const completed=reminders.filter(r=>r.done).length;
 const completion=reminders.length?Math.round(completed/reminders.length*100):0;
 const alertsCount=alerts.length;
 return <section className="caregiver-page">
  <div className="page-top"><div><span className="eyebrow">PROGRESS & WELLBEING</span><h1>Patient Performance</h1><p className="lead">A simple view of cognitive practice, routines and safety activity.</p></div><span className="pill">Last 7 activities</span></div>
  <div className="performance-stat-grid"><div className="performance-stat"><Brain/><small>Mind games</small><strong>{scores.length}</strong><span>Activities completed</span></div><div className="performance-stat"><BarChart3/><small>Average accuracy</small><strong>{avg}%</strong><span>Recent game results</span></div><div className="performance-stat"><Check/><small>Reminder completion</small><strong>{completion}%</strong><span>{completed}/{reminders.length||0} completed</span></div><div className="performance-stat"><Bell/><small>Safety alerts</small><strong>{alertsCount}</strong><span>Recorded alerts</span></div></div>
  <div className="performance-grid"><section className="card"><div className="section-heading"><div><span className="eyebrow">GAME ACCURACY</span><h2>Recent performance</h2></div></div>{recent.length?<div className="bar-chart">{recent.map((s,i)=><div className="bar-item" key={s.id||i}><div className="bar-track"><span style={{height:`${Math.max(8,Math.min(100,(Number(s.accuracy)||0)*100))}%`}}></span></div><small>{s.game||'Game'}</small><strong>{Math.round((Number(s.accuracy)||0)*100)}%</strong></div>)}</div>:<p>No game scores yet. Results will appear after the patient completes a game.</p>}</section>
   <section className="card"><span className="eyebrow">ROUTINE</span><h2>Reminder adherence</h2><div className="big-progress"><span style={{width:`${completion}%`}}></span></div><strong className="progress-value">{completion}%</strong><p>{completed} completed out of {reminders.length||0} scheduled reminders.</p><hr/><span className="eyebrow">SAFETY</span><h3>{alertsCount?'Recent caregiver alerts':'No recent alerts'}</h3><p className="small">{alertsCount?'Review the Alerts page for location or help details.':'Everything looks quiet right now.'}</p></section>
  </div>
 </section>;
}
function PatientAssistant({lang}){
 const [open,setOpen]=useState(false);
 const [messages,setMessages]=useState([]);
 const [input,setInput]=useState('');
 const [busy,setBusy]=useState(false);
 const [listening,setListening]=useState(false);
 const [err,setErr]=useState('');
 const stopRef=useRef(null);
 const messagesRef=useRef(messages);messagesRef.current=messages;
 const langName=languages.find(x=>x[0]===lang)?.[1]||lang;
 const send=async(overrideMsg)=>{
  const msg=(overrideMsg??input).trim();
  if(!msg||busy)return;
  setMessages(m=>[...m,{role:'user',content:msg}]);
  setInput('');setBusy(true);setErr('');
  try{
   const history=messagesRef.current.slice(-8).map(m=>({role:m.role,content:m.content}));
   const res=await api('/assistant',{method:'POST',body:JSON.stringify({message:msg,history,audience:'patient',lang:langName})});
   setMessages(m=>[...m,{role:'assistant',content:res.reply}]);
   readAloud(res.reply,lang).catch(()=>{});
  }catch(e){
   setErr(e.message||'Could not reach the assistant right now.');
  }finally{
   setBusy(false);
  }
 };
 const toggleMic=()=>{
  if(listening){stopRef.current?.();setListening(false);return;}
  try{
   stopRef.current=listen(lang,text=>{setListening(false);send(text);},message=>{setListening(false);setErr(message);});
   setListening(true);
  }catch(e){setErr(e.message);}
 };
 useEffect(()=>()=>{stopRef.current?.();},[]);
 return <>
  <button type="button" className="patient-assistant-fab" aria-label={open?'Close assistant':'Ask Smriti assistant'} onClick={()=>setOpen(o=>!o)}>
   {open?<X size={26}/>:<MessageCircle size={26}/>}
  </button>
  {open&&<section className="card patient-assistant-panel" role="dialog" aria-label="Ask Smriti">
   <div className="section-heading">
    <div><span className="eyebrow">ASK</span><h2 style={{fontSize:'1.05rem'}}><Sparkles size={18}/> Ask Smriti</h2></div>
    <button type="button" className="patient-assistant-close" onClick={()=>setOpen(false)} aria-label="Close">×</button>
   </div>
   <div className="chat-messages">
    {!messages.length&&<div className="chat-bubble bot">Hello! Ask me anything — type your question, or tap the mic and speak.</div>}
    {messages.map((m,i)=><div className={'chat-bubble '+(m.role==='user'?'user':'bot')} key={i}>{m.content}</div>)}
    {busy&&<div className="chat-bubble bot">Thinking…</div>}
   </div>
   {err&&<p className="small" style={{color:'#b23b3b',marginBottom:8}}>{err}</p>}
   <form className="chat-form" onSubmit={e=>{e.preventDefault();send();}}>
    <button type="button" className={'patient-assistant-mic'+(listening?' listening':'')} onClick={toggleMic} aria-label={listening?'Stop listening':'Speak your question'}><Mic size={18}/></button>
    <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type your question…" autoComplete="off"/>
    <button type="submit" disabled={busy||!input.trim()} aria-label="Send"><Send size={18}/></button>
   </form>
  </section>}
 </>;
}
export default function App(){
 const [lang,setLang]=useState(safeStorage.getItem('smriti-language')||'en');const t=useCallback(k=>translate(lang,k),[lang]);
 const [user,setUser]=useState(null),[loading,setLoading]=useState(true),[page,setPage]=useState('home'),[links,setLinks]=useState([]),[selected,setSelected]=useState(''),[records,setRecords]=useState([]),[online,setOnline]=useState(navigator.onLine),[pending,setPending]=useState(0),[message,setMessage]=useState(''),[game,setGame]=useState(null),[sos,setSos]=useState(false),[invite,setInvite]=useState(''),[position,setPosition]=useState(null),[tracking,setTracking]=useState(false),[weather,setWeather]=useState(null),[transcript,setTranscript]=useState(''),[recording,setRecording]=useState(false),[install,setInstall]=useState(null),[tick,setTick]=useState(Date.now()),[showGlance,setShowGlance]=useState(false),[gameHelp,setGameHelp]=useState(null),[chatMessages,setChatMessages]=useState([]),[chatInput,setChatInput]=useState(''),[chatBusy,setChatBusy]=useState(false),[assessStep,setAssessStep]=useState('stage'),[patientStage,setPatientStage]=useState(''),[patientChallenges,setPatientChallenges]=useState([]);
 const [famName,setFamName]=useState(''),[famRel,setFamRel]=useState(''),[famPhone,setFamPhone]=useState(''),[famAge,setFamAge]=useState(''),[famOcc,setFamOcc]=useState('');
 const watch=useRef(null),voiceStop=useRef(null),recordsRef=useRef(records),lastLocation=useRef(0),fenceState=useRef({}),notified=useRef(new Set()),activeRef=useRef(''),seedingReminders=useRef(false);recordsRef.current=records;
 const patient=user?.role==='patient'?user.id:selected;activeRef.current=patient;
 const [reminderToast,setReminderToast]=useState(null);
 const notify=useCallback(m=>{const text=String(m||'');if(/^invalid input$/i.test(text))return;setMessage(text);},[]);
 const values=kind=>records.filter(r=>r.kind===kind).map(r=>({...r.data,id:r.id}));
 const scores=values('score'),reminders=values('reminder'),journeys=values('journey'),places=useMemo(()=>records.filter(r=>r.kind==='place').map(r=>({...r.data,id:r.id})),[records]),family=values('family'),alerts=values('alert'),reports=values('report'),memories=values('memory'),settings=values('settings')[0]||{locationConsent:false,phone:'',voiceDataUrl:'',shareViaId:false};
 useEffect(()=>{if(isNative&&user?.role==='patient')syncNativeReminders(reminders).catch(e=>notify(e.message));},[records,user]);
 const latest=values('location').sort((a,b)=>b.at-a.at)[0];
 useEffect(()=>{document.documentElement.classList.toggle('large-text',safeStorage.getItem('smriti-large')==='true');},[]);
 useEffect(()=>{if(!sos)return;const previous=document.activeElement;const handle=e=>{if(e.key==='Escape')setSos(false);if(e.key==='Tab'){const nodes=[...document.querySelectorAll('[role=dialog] button:not([disabled]), [role=dialog] a[href]')];const first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}};document.addEventListener('keydown',handle);return ()=>{document.removeEventListener('keydown',handle);previous?.focus();};},[sos]);
 useEffect(()=>{document.documentElement.lang=lang;safeStorage.setItem('smriti-language',lang);},[lang]);
 const loadLinks=useCallback(async()=>{const x=await api('/links');setLinks(x);setSelected(s=>x.some(p=>p.id===s)?s:x[0]?.id||'');},[]);
 async function login(u){await local.put('session',u);setUser(u);setPage(u.role==='caregiver'?'care':'home');await loadLinks();}
 useEffect(()=>{(async()=>{try{const u=await api('/me');setUser(u);await local.put('session',u);await loadLinks();}catch(e){if(e.network){const cached=await local.get('session');if(cached?.value?.role==='patient')setUser(cached.value);}else if(e.status===401){await local.clear();}}finally{setLoading(false);}})().catch(e=>{notify(e.message);setLoading(false);});},[loadLinks,notify]);
 useEffect(()=>{const on=()=>setOnline(true),off=()=>setOnline(false),prompt=e=>{e.preventDefault();setInstall(e);};window.addEventListener('online',on);window.addEventListener('offline',off);window.addEventListener('beforeinstallprompt',prompt);return ()=>{window.removeEventListener('online',on);window.removeEventListener('offline',off);window.removeEventListener('beforeinstallprompt',prompt);};},[]);
 const refresh=useCallback(async()=>{if(!user||!patient)return;const target=patient;try{await syncQueue(user.id);let data=await api('/patients/'+target+'/records');if(activeRef.current!==target)return;const outstanding=(await local.queued()).filter(e=>e.userId===user.id&&e.patient===target).sort((a,b)=>a.created-b.created);for(const {event} of outstanding){data=data.filter(r=>r.id!==event.id);if(event.op==='put')data.push({id:event.id,kind:event.kind,data:event.data,updated:Date.now()});}setRecords(data);recordsRef.current=data;if(user.role==='patient')await local.put('records:'+target,data);}catch(e){if(e.status===403){setRecords([]);notify('Sharing access has been revoked.');}else if(!e.network)notify(e.message);}finally{setPending((await local.queued()).filter(e=>e.userId===user.id).length);}},[user,patient,notify]);
 useEffect(()=>{let cancelled=false;setRecords([]);setPosition(null);if(patient&&user?.role==='patient')local.get('records:'+patient).then(c=>{if(!cancelled&&c)setRecords(c.value);}).catch(e=>notify(e.message));refresh();return ()=>{cancelled=true;};},[patient,user?.id]);
 useEffect(()=>{if(online)refresh();const interval=setInterval(()=>{setTick(Date.now());if(navigator.onLine)refresh();},15000);return ()=>clearInterval(interval);},[refresh,online]);
 const mutate=useCallback(async(kind,data,id=uid(),op='put')=>{if(!patient||!user)throw new Error('Choose a linked patient first');const event={eventId:uid(),id,kind,op,data};if(user.role==='caregiver'){await api('/patients/'+patient+'/events',{method:'POST',body:JSON.stringify(event)});}else{await local.queue({id:event.eventId,userId:user.id,patient,event,created:Date.now()});}let updated=op==='delete'?recordsRef.current.filter(x=>x.id!==id):[...recordsRef.current.filter(x=>x.id!==id),{id,kind,data,updated:Date.now()}];if(kind==='settings'&&data&&!data.locationConsent)updated=updated.filter(r=>r.kind!=='location');setRecords(updated);recordsRef.current=updated;if(user.role==='patient'){await local.put('records:'+patient,updated);setPending((await local.queued()).filter(e=>e.userId===user.id).length);if(navigator.onLine)refresh();}return id;},[patient,user,refresh]);
 const act=fn=>async(...args)=>{try{await fn(...args);}catch(e){notify(e.message);}};
 const addFamilyMember=act(async e=>{e.preventDefault();if(!famName.trim()||!famRel.trim())return;await mutate('family',{name:famName.trim(),relation:famRel.trim(),phone:famPhone.trim(),age:famAge?Number(famAge):undefined,occupation:famOcc.trim()});setFamName('');setFamRel('');setFamPhone('');setFamAge('');setFamOcc('');notify('Family member added');});
 const removeFamilyMember=act(async id=>{await mutate('family',null,id,'delete');notify('Family member removed');});
 // Static assistant: no network call, answers come from stageTips/challengeTips/suggestionTopics above.
 const sendChat=(overrideMsg)=>{const msg=(overrideMsg??chatInput).trim();if(!msg||chatBusy)return;setChatMessages(c=>[...c,{role:'user',content:msg}]);setChatInput('');setChatBusy(true);setTimeout(()=>{setChatMessages(c=>[...c,{role:'assistant',content:staticAssistantAnswer(msg)}]);setChatBusy(false);},450);};
 const uploadReport=async data=>{await mutate('report',{...data,uploadedBy:user.role,uploaderName:user.name});notify('Report uploaded');};
 const addMemory=async data=>{await mutate('memory',{...data,addedBy:user.role,at:data.at||Date.now()});notify('Memory saved');};
 const deleteMemory=id=>mutate('memory',null,id,'delete');
 const deleteReport=act(id=>mutate('report',null,id,'delete'));
 function stopTracking(){if(watch.current!==null)gps.clearWatch(watch.current);watch.current=null;setTracking(false);}
 useEffect(()=>()=>{if(watch.current!==null)gps.clearWatch(watch.current);voiceStop.current?.();window.speechSynthesis?.cancel();},[]);
 useEffect(()=>{if(!settings.locationConsent)stopTracking();},[settings.locationConsent]);
 useEffect(()=>{
  if(user?.role!=='patient')return;
  for(const r of reminders){
    if(!r.done&&r.due<=tick&&!notified.current.has(r.id)){
      notified.current.add(r.id);
      setReminderToast({id:r.id,title:r.title});
      notify(translate(lang,'reminderPrefix')+r.title);
      readAloud(translate(lang,'reminderPrefix')+r.title,lang).catch(()=>{});
      if('Notification' in window&&Notification.permission==='granted')navigator.serviceWorker?.ready.then(reg=>reg.showNotification('SmritiSaathi reminder',{body:r.title,tag:r.id})).catch(()=>{});
      setTimeout(()=>setReminderToast(x=>x?.id===r.id?null:x),7000);
    }
  }
},[tick,records,user,notify,lang]);
useEffect(()=>{
  // Seed a few sample reminders for whichever patient is currently active (the patient
  // themselves, or the caregiver's linked patient) so the Reminders section isn't empty.
  if(!patient||reminders.length>0||seedingReminders.current)return;
  const key='smriti-demo-reminders:'+patient;
  if(safeStorage.getItem(key))return;
  seedingReminders.current=true;
  const now=Date.now();
  const seed=[
    {title:'Morning medicine',due:now+60*60000,done:false,category:'Medicine'},
    {title:'Drink water',due:now+2*60*60000,done:false,category:'Hydration'},
    {title:'Evening walk',due:now+4*60*60000,done:false,category:'Activity'},
    {title:'Doctor appointment',due:now+24*60*60000,done:false,category:'Appointment'}
  ];
  (async()=>{try{for(const r of seed)await mutate('reminder',r);safeStorage.setItem(key,'1');}catch{}finally{seedingReminders.current=false;}})();
},[patient,reminders.length]);
useEffect(()=>{
  // Show 2 sample "memory event" flashcards once, only on the patient's own home screen,
  // so the feature is visible before a caregiver has written any real memories. Intentionally
  // generic/explanatory (not a fabricated personal memory) since inventing false autobiographical
  // details would risk confusing someone with memory loss.
  if(user?.role!=='patient'||!patient||memories.some(m=>m.memType==='event'))return;
  const key='smriti-demo-memory-events:'+patient;
  if(safeStorage.getItem(key))return;
  const now=Date.now();
  const seed=[
    {title:'How memory cards work',memType:'event',eventDate:'',story:'Tap a card like this one to hear it read aloud. Ask your caregiver to add real memories here — like a wedding day, a trip, or a favourite family gathering.',at:now},
    {title:'Try adding your own',memType:'event',eventDate:'',story:'You can write a memory yourself too. Tap "Add Memory Event" below, write what happened, and it will show up here just like this card.',at:now+1}
  ];
  (async()=>{try{for(const m of seed)await mutate('memory',m);safeStorage.setItem(key,'1');}catch{}})();
},[patient,memories.length,user?.role]);
useEffect(()=>{
  if(user?.role!=='patient'||!('Notification' in window)||Notification.permission!=='default')return;
  Notification.requestPermission().catch(()=>{});
},[user?.id]);
 function startTracking(){return new Promise((resolve,reject)=>{if(!settings.locationConsent){const e=new Error('Enable location sharing in Privacy & settings first.');notify(e.message);reject(e);return;}if(!gps){const e=new Error('Location is unavailable on this device.');notify(e.message);reject(e);return;}stopTracking();setTracking(true);let firstFix=true;watch.current=gps.watchPosition(async p=>{const pos={lat:p.coords.latitude,lng:p.coords.longitude,accuracy:p.coords.accuracy,at:Date.now()};setPosition(pos);if(firstFix){firstFix=false;resolve(pos);}if(Date.now()-lastLocation.current<15000)return;lastLocation.current=Date.now();try{await mutate('location',pos,'latest-location');for(const place of places){const outside=outsideZone(pos,place);if(outside&&!fenceState.current[place.id]){const isHome=place.id==='home-place';await mutate('alert',{type:'geofence',message:isHome?'Patient has left home ('+place.name+').':'Outside safe zone: '+place.name,at:Date.now(),ack:false,location:pos});notify(isHome?'You have left your home area. Your caregiver has been alerted.':'You may be outside '+place.name+'. Contact your caregiver if you need help.');}fenceState.current[place.id]=outside;if(distanceMetres(pos,place)<place.radius)notify(place.cue);}}catch(e){notify(e.message);}},e=>{stopTracking();notify('Location unavailable: '+e.message);if(firstFix){firstFix=false;reject(e);}},{enableHighAccuracy:true,timeout:15000,maximumAge:10000});});}
 async function logout(){stopTracking();voiceStop.current?.();if(pending&&!confirm('There are unsynced changes. Signing out clears them from this device. Continue?'))return;await api('/auth/logout',{method:'POST'});await syncNativeReminders([]);await local.clear();setUser(null);setRecords([]);setLinks([]);setPending(0);setSelected('');}
 function command(text){setTranscript(text);const s=text.toLowerCase();const found=nav.find(([key])=>s.includes(key)||s.includes(t(key).toLowerCase()));if(found)setPage(found[0]);else if(/help|मदद|sos/.test(s))setSos(true);else notify('I heard: '+text+'. Choose a section below, or say “games”, “reminders”, or “help”.');setRecording(false);}
 const startVoice=act(async()=>{if(recording){voiceStop.current?.();setRecording(false);return;}voiceStop.current=listen(lang,command,err=>{notify(err);setRecording(false);});setRecording(true);});
 useEffect(()=>{const context=document.modelContext;if(!context?.registerTool)return;const controller=new AbortController();Promise.resolve(context.registerTool({name:'open_smriti_section',description:'Open a visible SmritiSaathi section. Does not create or share data.',inputSchema:{type:'object',properties:{section:{type:'string',enum:nav.map(x=>x[0])}},required:['section'],additionalProperties:false},execute:async input=>{if(!user||!nav.some(x=>x[0]===input.section))throw new Error('Sign in and choose a valid section');setPage(input.section);return {section:input.section};}},{signal:controller.signal})).catch(()=>{});return ()=>controller.abort();},[user]);
 const header=<header className="topbar"><div><span className="brand-mark">S</span><strong>SmritiSaathi</strong></div><label className="language"><span className="sr-only">Language</span><select value={lang} onChange={e=>setLang(e.target.value)}>{languages.map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label></header>;
 if(loading)return <>{header}<main><p>Opening your companion…</p></main></>;
 if(!user)return <>{header}{message&&<div className="notice" role="alert">{message}<button onClick={()=>setMessage('')}>×</button></div>}<Auth t={t} onLogin={login} notify={notify}/>{isNative&&<button className="quiet" onClick={act(async()=>{await local.clear();safeStorage.removeItem('smriti-server');location.reload();})}>Change care service</button>}</>;
 const upcoming=reminders.filter(r=>!r.done).sort((a,b)=>a.due-b.due);
 const location=position||latest;
 return <>{header}<div className="shell"><aside><div className="profile"><div className="avatar">{user.name.slice(0,1).toUpperCase()}</div><strong>{user.name}</strong><span>{t(user.role)}</span></div><nav>{(user.role==='caregiver'?caregiverNav:nav).map(([key,Icon,label])=><button key={key} className={page===key?'active':''} onClick={()=>{setPage(key);setGame(null);}}><Icon size={23}/>{user.role==='caregiver'?(label):t(key)}</button>)}</nav><div className="sidebar-bottom"><span className="connection">{online?<Wifi size={17}/>:<WifiOff size={17}/>} {online?t('online'):t('offline')}</span>{pending>0&&<small>{pending} {t('pending')}</small>}<button className="quiet" onClick={act(logout)}><LogOut size={18}/>{t('signout')}</button></div></aside><main>
 <div className="page-top"><span className="eyebrow">{new Intl.DateTimeFormat(languages.find(x=>x[0]===lang)?.[2]||'en',{weekday:'long',day:'numeric',month:'long'}).format(new Date())}</span><div className="row wrap"><button className="quiet" onClick={()=>setShowGlance(true)}>✨ Today at a glance</button><button className="help" onClick={()=>setSos(true)}><Heart size={19}/>{t('sos')}</button></div></div>
 {message&&<div className="notice" role="status">{message}<button aria-label="Dismiss message" onClick={()=>setMessage('')}>×</button></div>}
 {lang!=='en'&&<p className="translation-note">{t('translation')}</p>}
 {user.role==='caregiver'&&page==='care'&&<label className="patient-select">Linked patient<select value={selected} onChange={e=>{setSelected(e.target.value);setRecords([]);}}><option value="">Choose a patient</option>{links.map(x=><option value={x.id} key={x.id}>{x.name}</option>)}</select></label>}
 {page==='home'&&user.role==='patient'&&<PatientAssistant lang={lang}/>}
 {page==='home'&&<>{user.role==='patient'&&<GardenFeature scores={scores} lang={lang} onPlay={()=>{setPage('games');setGame('garden');}}/>}{user.role==='patient'&&<FamilyMemories user={user} family={family} memories={memories} onAddMemory={addMemory} onDeleteMemory={deleteMemory} lang={lang}/>}<section className="greeting"><div><span className="eyebrow">{t('welcome')}, {user.name.split(' ')[0]}</span><h1>{t('hello')}</h1><p>{t('practice')}</p><button onClick={()=>setPage(user.role==='patient'?'games':'care')}>{user.role==='patient'?t('games'):t('overview')}<ArrowRight size={21}/></button></div><div className="daily-mark"><Sun size={60} strokeWidth={1.1}/><span>ONE DAY<br/>AT A TIME</span></div></section><div className="stats"><div><Brain/><strong>{scores.length}</strong><span>Activities completed</span></div><div><CalendarDays/><strong>{upcoming.length}</strong><span>Upcoming reminders</span></div><div><Users/><strong>{links.length}</strong><span>Connected {user.role==='patient'?'caregivers':'patients'}</span></div></div><div className="two-col"><section className="card"><div className="section-heading"><h2>A moment for your mind</h2><span className="pill">5 rounds</span></div><div className="featured"><span className="game-icon">◈</span><div><h3>{t('memory')}</h3><p>Remember a symbol, then find it again.</p></div></div><button className="quiet" onClick={()=>{setPage('games');if(user.role==='patient')setGame('memory');}}>{t('start')}<ArrowRight size={20}/></button></section><section className="card"><div className="section-heading"><h2>{t('reminders')}</h2><Bell size={22}/></div>{upcoming.length?<><h3>{upcoming[0].title}</h3><p>{new Date(upcoming[0].due).toLocaleString()}</p></>:<p>No reminders yet. Add something you would like a little help remembering.</p>}<button className="quiet" onClick={()=>setPage('reminders')}>{t('reminders')}<ArrowRight size={20}/></button></section></div></>}
 {user.role==='caregiver'&&page==='reminders'&&<section className="caregiver-page">
   <div className="page-top"><div><span className="eyebrow">DAILY CARE</span><h1>Patient Reminders</h1><p className="lead">View or add reminders for your linked patient.</p></div><span className="pill">{reminders.filter(r=>!r.done).length} upcoming</span></div>
   <section className="caregiver-reminder-list">
    {(reminders.length?reminders:[
      {id:'demo-r1',title:'Morning medicine',due:Date.now()+3600000,done:false,category:'Medicine'}
    ]).sort((a,b)=>a.due-b.due).map(r=>{const cat=r.category||'Daily routine';const Icon=cat==='Medicine'?Pill:cat==='Hydration'?Activity:CalendarDays;return <div className="caregiver-reminder-row" key={r.id}><span className="reminder-icon"><Icon size={19}/></span><div><strong>{r.title}</strong><small>{new Date(r.due).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})} · {cat}</small></div><span className={`status-badge ${r.done?'done':'pending'}`}>{r.done?'Completed':'Upcoming'}</span>{reminders.length?<button className="quiet" aria-label="Delete reminder" onClick={act(()=>mutate('reminder',null,r.id,'delete'))}><Trash2 size={15}/></button>:null}</div>})}
   </section>
   <section className="card"><h2>Add a reminder</h2><p className="small">This will appear in the patient's own reminders too.</p><form className="inline-form" onSubmit={act(async e=>{e.preventDefault();const d=new FormData(e.currentTarget);const[h,m]=String(d.get('time')).split(':').map(Number);const due=new Date();due.setHours(h||0,m||0,0,0);if(due.getTime()<Date.now())due.setDate(due.getDate()+1);await mutate('reminder',{title:String(d.get('title')).trim(),due:due.getTime(),done:false,category:d.get('category')});e.currentTarget.reset();notify('Reminder added for patient');})}><label>Title<input name="title" required placeholder="Take medicine"/></label><label>Time<input name="time" type="time" required/></label><label>Category<select name="category"><option value="Medicine">Medicine</option><option value="Hydration">Hydration</option><option value="Activity">Activity</option></select></label><button type="submit"><Plus size={16}/> Add reminder</button></form></section>
   <div className="card caregiver-note"><Bell size={19}/><div><strong>Shared with caregiver</strong><p>When the patient completes or adds a reminder, it appears here after the next sync.</p></div></div>
  </section>}
 {user.role==='caregiver'&&page==='journey'&&<CaregiverJourney patient={patient} records={records} journeys={journeys}/>}
 {user.role==='caregiver'&&page==='performance'&&<CaregiverPerformance scores={scores} reminders={reminders} alerts={alerts}/>}
 {user.role==='caregiver'&&page==='reports'&&<section className="caregiver-page"><div className="page-top"><div><span className="eyebrow">PATIENT RECORDS</span><h1>Medical History</h1><p className="lead">Upload a report for {links.find(x=>x.id===selected)?.name||'your linked patient'}, or view what has been shared so far.</p></div></div><MedicalReports mode="caregiver" reports={reports} onUpload={uploadReport} onDelete={deleteReport}/></section>}
 {user.role==='caregiver'&&page==='suggestions'&&<section className="caregiver-page"><div className="page-top"><div><span className="eyebrow">DEMENTIA CARE</span><h1>Suggestions</h1><p className="lead">Tap a tip to see the full explanation, or ask the assistant about your specific situation.</p></div></div>
  <div className="suggestions-layout">
   <section className="card">
    {suggestionTopics.map(topic=><div className="suggestion-topic" key={topic.title}><h2>{topic.icon} {topic.title}</h2><div className="suggestion-points">{topic.points.map(p=><SuggestionPoint key={p.q} q={p.q} a={p.a}/>)}</div></div>)}
   </section>
   <section className="card chat-panel">
    <div className="section-heading"><div><span className="eyebrow">ASK</span><h2><MessageCircle size={19}/> Dementia care assistant</h2></div></div>
    <p className="small" style={{marginBottom:14}}>A couple of quick questions first, so the tips fit your situation. For emergencies or medicine changes, always contact a doctor.</p>
    <div className="chat-messages">
     {!chatMessages.length&&assessStep==='stage'&&<div className="chat-bubble bot">Hi! Before we chat — which stage is your loved one in right now?</div>}
     {assessStep==='challenges'&&<div className="chat-bubble bot">Thanks. Which of these feels hardest right now? You can pick more than one, then continue.</div>}
     {chatMessages.map((m,i)=><div className={'chat-bubble '+(m.role==='user'?'user':'bot')} key={i}>{m.content}</div>)}
     {chatBusy&&<div className="chat-bubble bot">Thinking…</div>}
    </div>
    {assessStep!=='done'?<div className="chat-quick-options">
     {assessStep==='stage'&&<>
      <div className="chip-row">{stageOptions.map(([label,hint])=><button type="button" key={label} className="chip" title={hint} onClick={()=>{setPatientStage(label);setChatMessages(c=>[...c,{role:'user',content:label}]);setAssessStep('challenges');}}>{label}</button>)}</div>
      <button type="button" className="quiet skip-assess" onClick={()=>setAssessStep('done')}>Skip and ask directly</button>
     </>}
     {assessStep==='challenges'&&<>
      <div className="chip-row">{challengeOptions.map(label=><button type="button" key={label} className={'chip'+(patientChallenges.includes(label)?' selected':'')} onClick={()=>setPatientChallenges(c=>c.includes(label)?c.filter(x=>x!==label):[...c,label])}>{label}</button>)}</div>
      <button type="button" onClick={()=>{const summary=patientChallenges.length?patientChallenges.join(', '):'nothing specific yet';setChatMessages(c=>[...c,{role:'user',content:summary}]);setAssessStep('done');setChatBusy(true);setTimeout(()=>{setChatMessages(c=>[...c,{role:'assistant',content:buildStageChallengeReply(patientStage,patientChallenges)}]);setChatBusy(false);},450);}} disabled={chatBusy}>Continue</button>
     </>}
    </div>:<form className="chat-form" onSubmit={e=>{e.preventDefault();sendChat();}}>
     <input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Ask a dementia-care question" autoComplete="off"/>
     <button type="submit" disabled={chatBusy||!chatInput.trim()} aria-label="Send"><Send size={18}/></button>
    </form>}
   </section>
  </div>
 </section>}
 {user.role==='caregiver'&&page==='alerts'&&<section className="caregiver-page"><div className="page-top"><div><span className="eyebrow">SAFETY</span><h1>Alerts</h1><p className="lead">Recent help and journey alerts from your linked patient.</p></div></div><section className="card">{alerts.length?alerts.sort((a,b)=>b.at-a.at).map(a=><div className="list-row alert-row" key={a.id}><Bell/><div style={{flex:1}}><strong>{a.message}</strong><p>{new Date(a.at).toLocaleString()} · {a.ack?'Acknowledged':'Needs a check-in'}</p>{a.voiceDataUrl&&<div className="alert-voice"><Mic size={15}/><span>Patient's saved help voice</span><audio controls src={a.voiceDataUrl}/></div>}</div></div>):<p>No alerts recorded.</p>}</section></section>}
{user.role==='caregiver'&&page==='memories'&&<CaregiverMemoriesPage patient={patient} links={links} memories={memories} onAdd={addMemory} onDelete={deleteMemory} lang={lang}/>}
 {page==='games'&&(user.role!=='patient'?<section className="card"><h1>{t('games')}</h1><p>Activities are completed from the patient’s own account. See their results in Care Overview.</p></section>:game==='garden'?<MemoryGarden userId={user.id} scores={scores} lang={lang} onComplete={(data,id)=>mutate('score',data,id)} onClose={()=>setGame(null)}/>:game?<Game key={game} id={game} lang={lang} family={family} level={nextDifficulty(scores.filter(s=>s.game===game),scores.filter(s=>s.game===game).at(-1)?.level||1)} onSave={data=>mutate('score',data)} onClose={()=>setGame(null)}/>:<><span className="eyebrow">A LITTLE PRACTICE, EVERY DAY</span><h1>{t('games')}</h1><p className="lead">{t('practice')}</p><GardenFeature scores={scores} lang={lang} onPlay={()=>setGame('garden')}/><div className="game-list">{gameIds.filter(id=>id!=='garden').map((id,i)=><article className="game-row" key={id}><span className={'game-icon tint-'+i%3}>{gameIcons[i]}</span><div className="game-row-copy"><span className="eyebrow">{domains[id]}</span><h3>{t(id)}</h3><p>{id==='memory'?'Flip cards and find matching pairs.':id==='pattern'?'Watch the sequence and repeat it.':'Remember the order of everyday activities.'}</p><small>{t('level')} {nextDifficulty(scores.filter(s=>s.game===id),scores.filter(s=>s.game===id).at(-1)?.level||1)} · 5 rounds</small></div><div className="game-row-actions"><button className="quiet" type="button" onClick={()=>setGameHelp(id)}>?&nbsp; How to Play</button><button type="button" onClick={()=>setGame(id)}><ArrowRight size={18}/>{t('start')}</button></div></article>)}</div><p className="small">Difficulty uses recent accuracy and response time. It is a simple practice heuristic, not a clinical or machine-learning assessment.</p></>)}
 {page==='stories'&&(user.role!=='patient'?<section className="card"><h1>{t('stories')}</h1><p>Story time is completed from the patient's own account.</p></section>:<StoryTime lang={lang}/>)}
 {page==='reminders'&&user.role==='patient'&&<section className="reminders-page">
   <div className="page-top"><div><span className="eyebrow">DAILY CARE</span><h1>{t('reminders')}</h1><p className="lead">Gentle reminders for medicines, water and everyday routines.</p></div><button className="reminder-notify-btn" onClick={async()=>{if('Notification' in window){const p=await Notification.requestPermission();notify(p==='granted'?'Reminder notifications enabled.':'Please allow notifications in your browser settings.');}}}><Bell size={18}/> Enable notifications</button></div>
   <section className="reminder-list">
    <div className="reminder-list-head"><h2><Bell size={21}/> Daily Reminders</h2><span>{upcoming.length} upcoming</span></div>
    {reminders.length===0?<div className="empty-reminders">No reminders yet. Add one below.</div>:reminders.sort((a,b)=>a.due-b.due).map(r=>{const cat=r.category||(r.title.toLowerCase().includes('medicine')?'Medicine':r.title.toLowerCase().includes('water')?'Hydration':'Activity');const Icon=cat==='Medicine'?Pill:cat==='Hydration'?Activity:CalendarDays;return <div className={`reminder-item ${r.done?'is-done':''}`} key={r.id}><button className="reminder-check" aria-label={r.done?'Mark incomplete':'Mark complete'} onClick={act(()=>mutate('reminder',{title:r.title,due:r.due,done:!r.done,category:cat},r.id))}>{r.done?'✓':''}</button><span className="reminder-icon"><Icon size={18}/></span><div className="reminder-copy"><strong>{r.title}</strong><span><Clock size={13}/>{new Date(r.due).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})} · <span>{cat}</span></span></div><button className="reminder-delete" aria-label="Delete reminder" onClick={act(()=>mutate('reminder',null,r.id,'delete'))}><Trash2 size={16}/></button></div>})}
   </section>
   <section className="card reminder-form-card"><div className="reminder-form-title"><Plus size={19}/><strong>Add Reminder</strong></div><form onSubmit={act(async e=>{e.preventDefault();const d=new FormData(e.currentTarget);const title=String(d.get('title'));const due=new Date(String(d.get('due'))).getTime();const category=String(d.get('category'));await mutate('reminder',{title,due,done:false,category});e.currentTarget.reset();notify('Reminder added');})}><input name="title" required maxLength={200} placeholder="e.g. Evening walk, Doctor appointment…"/><div className="reminder-form-grid"><input name="due" type="datetime-local" required/><select name="category" defaultValue="Medicine"><option>Medicine</option><option>Hydration</option><option>Activity</option><option>Appointment</option></select></div><textarea name="details" placeholder="Details (optional) — anything to remember about this reminder…"></textarea><button className="add-reminder-btn"><Plus size={18}/> Add</button></form></section>
   <p className="small reminder-note">When a reminder is due, SmritiSaathi shows a pop-up and reads it aloud in the selected app language. Browser notifications also appear when permission is enabled.</p>
  </section>}
 {page==='journey'&&user.role==='patient'&&<JourneyAssist lang={lang} t={t} position={position} places={places} weather={weather} tracking={tracking} startTracking={startTracking} stopTracking={stopTracking} helpVoice={settings.voiceDataUrl||''} locationConsent={!!settings.locationConsent} onOpenPrivacy={()=>setPage('privacy')} onJourneyState={state=>mutate('journey',state,'active-journey')} onWeather={act(async()=>setWeather(await api(`/weather?lat=${position.lat}&lng=${position.lng}`)))} onJourneyAlert={async alert=>{await mutate('alert',alert);notify(alert.type==='journey-deviation'?'Caregiver alerted: patient appears to be off the planned route.':'Caregiver alert saved.')}} />}
 {page==='care'&&<><div className="page-top"><div><span className="eyebrow">CONNECTED CARE</span><h1>{t('care')}</h1><p className="lead">A simple overview of the support circle and today’s wellbeing.</p></div></div>{user.role==='patient'&&<section className="card"><h2>Add family member</h2><p>Add the name, relationship and contact details of a caregiver or family member you trust. These details also personalise the “Familiar people” memory game.</p><form className="form-grid" onSubmit={addFamilyMember}><label>Full name<input value={famName} onChange={e=>setFamName(e.target.value)} required autoComplete="off"/></label><label>Relationship<input value={famRel} onChange={e=>setFamRel(e.target.value)} placeholder="e.g. Son, Daughter, Neighbour, Caregiver" required autoComplete="off"/></label><label>Phone number<input value={famPhone} onChange={e=>setFamPhone(e.target.value)} type="tel" autoComplete="off"/></label><label>Age (optional)<input value={famAge} onChange={e=>setFamAge(e.target.value)} type="number" min="0" autoComplete="off"/></label><label>Occupation (optional)<input value={famOcc} onChange={e=>setFamOcc(e.target.value)} autoComplete="off"/></label><button type="submit">Add family member</button></form>{family.length>0&&<div style={{marginTop:22}}>{family.map(f=><div className="list-row" key={f.id}><Users/><div><strong>{f.name}</strong><p>{f.relation}{f.age?` · ${f.age} yrs`:''}{f.occupation?` · ${f.occupation}`:''}{f.phone?` · ${f.phone}`:''}</p></div><button className="quiet" onClick={()=>removeFamilyMember(f.id)}>Remove</button></div>)}</div>}</section>}<section className="card"><h2>{user.role==='patient'?'Invite someone you trust':'Connect with a patient'}</h2>{user.role==='patient'?<><p>Generate a single-use code, valid for 10 minutes. Share it privately with your chosen caregiver.</p><form onSubmit={act(async e=>{e.preventDefault();const x=await api('/invites',{method:'POST',body:JSON.stringify({consent:true})});setInvite(x.code);})}><label className="check"><input type="checkbox" required/><span>{t('sharing')}</span></label><button>Create invitation</button></form>{invite&&<p className="invite">{invite}</p>}<hr style={{margin:'26px 0',border:0,borderTop:'1px solid var(--line)'}}/><h3>Or share your Patient ID</h3><p className="small">Turn this on once, then share the ID below privately with your caregiver. They can enter it directly to connect, any time — no fresh code needed.</p><label className="check"><input type="checkbox" checked={!!settings.shareViaId} onChange={act(async e=>{const on=e.target.checked;await mutate('settings',{...settings,shareViaId:on},'settings');notify(on?'Patient ID connection turned on':'Patient ID connection turned off');})}/><span>Allow caregivers to connect using my Patient ID</span></label>{settings.shareViaId&&<div className="invite" style={{fontSize:'1rem',display:'flex',alignItems:'center',gap:14,flexWrap:'wrap'}}><span style={{overflowWrap:'anywhere'}}>{user.id}</span><button type="button" className="quiet" onClick={()=>{navigator.clipboard?.writeText(user.id);notify('Patient ID copied');}}>Copy</button></div>}</>:<><form className="inline-form" onSubmit={act(async e=>{e.preventDefault();const data=new FormData(e.currentTarget);await api('/links',{method:'POST',body:JSON.stringify({code:data.get('code').trim()})});await loadLinks();notify('Connected with patient permission');e.currentTarget.reset();})}><label>Patient’s invitation code<input name="code" required minLength="16" maxLength="16" autoComplete="off"/></label><button>Connect</button></form><p className="small" style={{margin:'16px 0'}}>— or —</p><form className="inline-form" onSubmit={act(async e=>{e.preventDefault();const data=new FormData(e.currentTarget);await api('/links/by-id',{method:'POST',body:JSON.stringify({patientId:data.get('patientId').trim()})});await loadLinks();notify('Connected with patient permission');e.currentTarget.reset();})}><label>Patient’s ID<input name="patientId" required minLength="10" autoComplete="off" placeholder="Paste the Patient ID shared with you"/></label><button>Connect</button></form></>}{links.map(x=><div className="list-row" key={x.id}><Users/><strong>{x.name}</strong><button className="quiet" onClick={act(async()=>{await api('/links/'+x.id,{method:'DELETE'});await loadLinks();setInvite('');notify('Sharing connection removed');})}>Remove connection</button></div>)}</section><section className="card"><h2>Alerts</h2><p>Alerts sync when connected. A saved alert does not confirm someone has received help.</p>{alerts.length?alerts.sort((a,b)=>b.at-a.at).map(a=><div className="list-row alert-row" key={a.id}><Bell/><div style={{flex:1}}><h3>{a.message}</h3><p>{new Date(a.at).toLocaleString()} · {a.ack?'Acknowledged':'Needs a check-in'}</p>{a.voiceDataUrl&&<div className="alert-voice"><Mic size={15}/><span>Patient's saved help voice</span><audio controls src={a.voiceDataUrl} preload="metadata"/></div>}</div>{!a.ack&&<button className="quiet" onClick={act(()=>mutate('alert',{type:a.type,message:a.message,at:a.at,ack:true,location:a.location,destination:a.destination,voiceDataUrl:a.voiceDataUrl},a.id))}>Acknowledge</button>}</div>):<p>No alerts recorded.</p>}</section></>}
 {page==='profile'&&user.role==='patient'&&<Profile user={user} lang={lang} family={family} settings={settings} scores={scores} reports={reports} homePlace={places.find(p=>p.id==='home-place')} onSave={async patch=>{if(patch.familyAdd){await mutate('family',patch.familyAdd);return;}await mutate('settings',{...settings,...patch},'settings');setUser(u=>({...u,...patch}));notify('Profile saved');}} onDelete={id=>mutate('family',null,id,'delete')} onSetHome={act(async data=>{await mutate('place',data,'home-place');notify('Home address saved. Your caregiver will be alerted if you leave this area while live location is on.');})} onRemoveHome={act(async()=>{await mutate('place',null,'home-place','delete');notify('Home address removed.');})} onUploadReport={uploadReport} onDeleteReport={deleteReport} />}
 {page==='music'&&user.role==='patient'&&<Music/>}
 {page==='privacy'&&<><h1>{t('privacy')}</h1><section className="card"><h2>Your choices</h2><p>Linked caregivers can view your activities, reminders, places and shared location. Revoke their access in Care circle. Account passwords are hashed; offline browser records are not encrypted.</p>{user.role==='patient'&&<form onSubmit={act(async e=>{e.preventDefault();const d=new FormData(e.currentTarget);const consent=d.get('location')==='on';if(!consent){stopTracking();setPosition(null);setWeather(null);}await mutate('settings',{...settings,locationConsent:consent,phone:d.get('phone')},'settings');notify('Privacy choices saved');})}><label className="check"><input key={String(settings.locationConsent)} name="location" type="checkbox" defaultChecked={settings.locationConsent}/><span>{t('locationConsent')}</span></label><label>Trusted contact phone number<input key={settings.phone} name="phone" type="tel" defaultValue={settings.phone} pattern="[+0-9 ()\-]{0,25}"/></label><button>{t('save')}</button></form>}<p>Signing out clears this device’s cached records. Caregiver records are not cached for offline use. Data sharing and voice services require connectivity and consent.</p></section><section className="card"><h2>Voice & accessibility</h2><p>Browser speech support varies by language and device. Speech recognition may send audio to the browser’s provider. The optional transcription button sends a short recording to the configured Whisper service.</p><div className="row wrap"><button onClick={startVoice}>{recording?t('stop'):t('speak')}</button><button className="quiet" onClick={act(async()=>{if(recording){voiceStop.current?.();setRecording(false);return;}voiceStop.current=await recordWhisper(command,notify);setRecording(true);})}>Record up to 15 seconds</button><button className="quiet" onClick={()=>{const large=document.documentElement.classList.toggle('large-text');safeStorage.setItem('smriti-large',String(large));}}>Larger text</button></div>{transcript&&<p>{transcript}</p>}<p>{t('translation')}</p></section><section className="card"><h2>Offline & device</h2><p>{pending} changes waiting to sync. Keep this device private and lock the screen when away.</p><button className="quiet" onClick={act(refresh)}>Retry sync</button>{pending>0&&<button className="quiet" onClick={act(async()=>{const queue=(await local.queued()).filter(e=>e.userId===user.id);notify(queue.filter(e=>e.failed).map(e=>e.failed).join('; ')||'Changes will sync when connected.');})}>Check sync issues</button>}{install&&<button onClick={act(async()=>{await install.prompt();setInstall(null);})}>Install app</button>}<p>Without an install button, use your browser’s “Install” or “Add to Home Screen” menu where supported.</p></section><section className="card"><h2>Your data</h2><button className="quiet" onClick={act(logout)}>{t('signout')}</button><button className="quiet" onClick={act(async()=>{const data=await api('/export');const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='smritisaathi-data.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);})}>Export my data</button><button className="danger quiet" onClick={act(async()=>{if(prompt('This permanently deletes your account and server records. Type DELETE to continue.')!=='DELETE')return;await api('/account',{method:'DELETE',body:JSON.stringify({confirm:'DELETE'})});stopTracking();await syncNativeReminders([]);await local.clear();setUser(null);setRecords([]);setPending(0);})}>Delete my account</button></section></>}
 {reminderToast&&<div className="reminder-toast" role="alert"><span className="toast-bell"><Bell size={18}/></span><div><strong>Reminder</strong><span>{reminderToast.title}</span></div><button className="quiet" onClick={()=>setReminderToast(null)}>Dismiss</button></div>}
 <footer><Heart size={16}/><span>{t('support')}</span></footer></main></div>
 {showGlance&&<div className="modal-backdrop"><section role="dialog" aria-modal="true" className="modal card"><h2>📋 Today at a glance</h2><div className="list-row"><span>🔔 Reminders left</span><strong>{upcoming.length}</strong></div><div className="list-row"><span>🧠 Activities completed</span><strong>{scores.length}</strong></div><div className="list-row"><span>⭐ Latest activity</span><strong>{scores.at(-1)?.game||'None yet'}</strong></div><p className="small">A quick, gentle summary of the day.</p><button className="quiet wide" onClick={()=>setShowGlance(false)}>Close</button></section></div>}
 {sos&&<div className="modal-backdrop"><section role="dialog" aria-modal="true" aria-labelledby="sos-title" className="modal card"><h2 id="sos-title">Let’s get you some help</h2><p>Call your trusted contact, or save an alert for your linked caregiver. Alerts need a connection to reach another device and do not contact emergency services.</p>{settings.phone?<a className="button wide" href={'tel:'+settings.phone.replace(/[^+0-9]/g,'')}>Call trusted contact</a>:<p>No trusted phone number is saved. Add one in Privacy & settings.</p>}<button className="wide help" disabled={!patient} onClick={act(async()=>{await mutate('alert',{type:'sos',message:'Help requested. Please check in.',at:Date.now(),ack:false});setSos(false);notify('Help request saved. Check sync status; delivery is not confirmed. Call someone directly for urgent help.');})}>Save caregiver alert</button><button autoFocus className="quiet wide" onClick={()=>setSos(false)}>{t('cancel')}</button></section></div>}{gameHelp&&<div className="demo-overlay" role="dialog" aria-modal="true" aria-label="How to play"><div className="demo-card"><div className="section-heading"><div><span className="eyebrow">QUICK DEMO</span><h2>{t(gameHelp)}</h2></div><button className="quiet demo-close" type="button" onClick={()=>setGameHelp(null)}>×</button></div><div className="demo-preview">{gameHelp==='memory'?<><div className="demo-cards"><span>🌸</span><span>?</span><span>🌸</span><span>?</span></div><p>Flip two cards at a time and remember where matching pictures are.</p></>:gameHelp==='pattern'?<><div className="demo-sequence"><span>●</span><span>■</span><span>▲</span><span>?</span></div><p>Watch the sequence, then tap the same shapes in the same order.</p></>:<><div className="demo-routine"><span>💊 Medicine</span><span>💧 Water</span><span>🚶 Walk</span></div><p>Remember the routine order and select each activity in sequence.</p></>}</div><button type="button" onClick={()=>{setGameHelp(null);setGame(gameHelp)}}>{t('start')} <ArrowRight size={18}/></button></div></div>}
</>;
}
