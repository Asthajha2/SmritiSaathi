import {useEffect,useMemo,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,BookOpen,Mic,Volume2} from 'lucide-react';
import {nerStates} from './stories';
import {languages,translate,tf} from './i18n';
import {readAloud,listen} from './voice';

function normalize(s){return String(s||'').toLowerCase().trim();}
function isCloseEnough(answer,accepted){
 const a=normalize(answer);
 if(!a)return false;
 return accepted.some(k=>a.includes(normalize(k)));
}

// Splits a story into its natural chapters — one per paragraph, since each
// story is written as a handful of substantial paragraphs. This keeps every
// chapter a proper, full read (not a single sentence) instead of slicing by
// sentence count.
function splitIntoChapters(text){
 const paragraphs=String(text||'').split(/\n+/).map(p=>p.trim()).filter(Boolean);
 return paragraphs.length?paragraphs:[String(text||'').trim()].filter(Boolean);
}

function QuestionCard({question,index,voiceLang,uiLang,onAnswered}){
 const t=k=>translate(uiLang,k);
 const tt=(k,vars)=>tf(uiLang,k,vars);
 const [value,setValue]=useState('');
 const [listening,setListening]=useState(false);
 const [result,setResult]=useState(null); // null | 'good' | 'try'
 const [err,setErr]=useState('');
 const stopRef=useRef(null);
 useEffect(()=>()=>{stopRef.current?.();},[]);
 const submit=(overrideText)=>{
  const text=(overrideText??value).trim();
  if(!text)return;
  const good=isCloseEnough(text,question.answers);
  setResult(good?'good':'try');
  onAnswered(good);
 };
 const toggleMic=()=>{
  if(listening){stopRef.current?.();setListening(false);return;}
  try{
   stopRef.current=listen(voiceLang,text=>{setListening(false);setValue(text);submit(text);},message=>{setListening(false);setErr(message);});
   setListening(true);
  }catch(e){setErr(e.message);}
 };
 return <div className="card story-question">
  <div className="section-heading"><div><span className="eyebrow">{tt('storyQuestionLabel',{n:index+1})}</span><h3>{question.q}</h3></div>
   <button type="button" className="quiet" onClick={()=>readAloud(question.q,voiceLang).catch(()=>{})} aria-label="Read question aloud"><Volume2 size={18}/></button>
  </div>
  {result===null?<>
   <form onSubmit={e=>{e.preventDefault();submit();}} className="inline-form">
    <label>{t('storyYourAnswer')}<input value={value} onChange={e=>setValue(e.target.value)} placeholder={t('storyAnswerPlaceholder')} autoComplete="off"/></label>
    <div className="row" style={{gap:10}}>
     <button type="button" className={'patient-assistant-mic'+(listening?' listening':'')} onClick={toggleMic} aria-label={listening?'Stop listening':'Speak your answer'}><Mic size={18}/></button>
     <button type="submit" disabled={!value.trim()}>{t('storySubmit')}<ArrowRight size={18}/></button>
    </div>
   </form>
   {question.hint&&<p className="small">{t('storyHintPrefix')}{question.hint}</p>}
   {err&&<p className="small" style={{color:'#b23b3b'}}>{err}</p>}
  </>:<div className={'story-feedback '+(result==='good'?'good':'try')}>
   <p>{result==='good'?t('storyGoodFeedback'):tt('storyTryFeedback',{answer:question.answers[0]})}</p>
  </div>}
 </div>;
}

export default function StoryTime({lang,onComplete}){
 const t=k=>translate(lang,k);
 const tt=(k,vars)=>tf(lang,k,vars);
 const [stateId,setStateId]=useState(null);
 const [storyId,setStoryId]=useState(null);
 const [chapterIndex,setChapterIndex]=useState(null); // null = chapter list; number = reading that chapter
 const [stage,setStage]=useState('chapters'); // chapters | questions | done
 const [qIndex,setQIndex]=useState(0);
 const [goodCount,setGoodCount]=useState(0);
 const [audioLang,setAudioLang]=useState(lang||'hi');
 const [playing,setPlaying]=useState(false);
 const nerState=nerStates.find(s=>s.id===stateId);
 const story=nerState?.stories.find(s=>s.id===storyId);
 // When the chosen listening language is Hindi, show/read the Hindi
 // retelling (if we have one) instead of the English text, so the story
 // that is heard matches the story that is shown, not just the voice accent.
 const isHindi=audioLang==='hi';
 const displayTitle=(isHindi&&story?.titleHi)||story?.title;
 const displayStory=(isHindi&&story?.storyHi)||story?.story;
 const chapters=useMemo(()=>splitIntoChapters(displayStory),[displayStory]);

 const openState=id=>setStateId(id);
 const backToStates=()=>setStateId(null);
 const openStory=id=>{setStoryId(id);setChapterIndex(null);setStage('chapters');setQIndex(0);setGoodCount(0);};
 const backToStories=()=>{setStoryId(null);setChapterIndex(null);setStage('chapters');};
 const openChapter=i=>{setChapterIndex(i);setStage('read');};
 const backToChapters=()=>{setChapterIndex(null);setStage('chapters');};

 const goPrevChapter=()=>{if(chapterIndex>0)setChapterIndex(i=>i-1);};
 const goNextChapter=()=>{
  if(chapterIndex+1<chapters.length)setChapterIndex(i=>i+1);
  else{setChapterIndex(null);setStage('questions');}
 };

 const answered=good=>{
  if(good)setGoodCount(c=>c+1);
  setTimeout(()=>{
   if(qIndex+1<story.questions.length)setQIndex(i=>i+1);
   else{setStage('done');onComplete?.({id:story.id,total:story.questions.length,correct:goodCount+(good?1:0)});}
  },1400);
 };

 const playChapter=()=>{
  if(chapterIndex==null)return;
  setPlaying(true);
  readAloud(chapters[chapterIndex],audioLang).then(()=>setPlaying(false)).catch(()=>setPlaying(false));
 };

 // Step 1: choose a state, shown as full-width horizontal bars, one per row.
 if(!nerState){
  return <section className="story-time">
   <span className="eyebrow">{t('storyEyebrow')}</span>
   <h1><BookOpen size={26}/> {t('storyChooseState')}</h1>
   <p className="lead">{t('storyChooseStateLead')}</p>
   <div className="story-state-list">
    {nerStates.map(s=><button type="button" key={s.id} className="story-state-bar" onClick={()=>openState(s.id)} title={s.iconLabel}>
     <span className="story-state-icon" role="img" aria-label={s.iconLabel}>{s.icon}</span>
     <span className="story-state-text">
      <span className="story-state-name">{s.state}</span>
      <span className="story-state-sub">{tt('storyStateSub',{icon:s.iconLabel,count:s.stories.length})}</span>
     </span>
     <ArrowRight size={22}/>
    </button>)}
   </div>
  </section>;
 }

 // Step 2: choose one of the state's stories, also as full-width horizontal bars.
 if(!story){
  return <section className="story-time">
   <button type="button" className="quiet" onClick={backToStates}><ArrowLeft size={16}/> {t('storyBackToStates')}</button>
   <span className="eyebrow">{nerState.iconLabel} {nerState.icon}</span>
   <h1>{tt('storyStoriesOf',{state:nerState.state})}</h1>
   <div className="story-state-list">
    {nerState.stories.map((s,i)=><button type="button" key={s.id} className="story-state-bar" onClick={()=>openStory(s.id)}>
     <span className="story-chapter-num">{i+1}</span>
     <span className="story-state-text">
      <span className="story-state-name">{(audioLang==='hi'&&s.titleHi)||s.title}</span>
      <span className="story-state-sub">{tt('storyStorySub',{count:s.questions.length})}</span>
     </span>
     <ArrowRight size={22}/>
    </button>)}
   </div>
  </section>;
 }

 // Step 3: choose a chapter, shown as full-width horizontal bars.
 if(stage==='chapters'){
  return <section className="story-time">
   <button type="button" className="quiet" onClick={backToStories}><ArrowLeft size={16}/> {tt('storyBackToStories',{state:nerState.state})}</button>
   <span className="eyebrow">{nerState.state.toUpperCase()}</span>
   <h1>{displayTitle}</h1>
   <label className="story-lang-row">{t('storyLangLabel')}
    <select value={audioLang} onChange={e=>setAudioLang(e.target.value)}>
     {languages.map(([code,label])=><option key={code} value={code}>{label}</option>)}
    </select>
   </label>
   <p className="lead">{tt('storyChapterLead',{count:chapters.length})}</p>
   <div className="story-state-list">
    {chapters.map((c,i)=><button type="button" key={i} className="story-state-bar" onClick={()=>openChapter(i)}>
     <span className="story-chapter-num">{i+1}</span>
     <span className="story-state-text">
      <span className="story-state-name">{tt('storyChapter',{n:i+1})}</span>
      <span className="story-state-sub">{c.slice(0,70)}{c.length>70?'…':''}</span>
     </span>
     <ArrowRight size={22}/>
    </button>)}
   </div>
  </section>;
 }

 // Step 4: read one chapter, full-page.
 if(stage==='read'&&chapterIndex!=null){
  return <section className="story-time story-reader">
   <button type="button" className="quiet" onClick={backToChapters}><ArrowLeft size={16}/> {t('storyBackToChapters')}</button>
   <span className="eyebrow">{displayTitle?.toUpperCase()} · {tt('storyChapter',{n:chapterIndex+1})} / {chapters.length}</span>
   <div className="card story-text story-reader-card">
    <div className="section-heading">
     <h2 style={{marginBottom:0}}>{tt('storyChapter',{n:chapterIndex+1})}</h2>
     <button type="button" onClick={playChapter} disabled={playing}><Volume2 size={18}/> {playing?t('storyPlaying'):t('storyListenChapter')}</button>
    </div>
    <p style={{whiteSpace:'pre-line'}}>{chapters[chapterIndex]}</p>
   </div>
   <div className="row">
    <button type="button" className="quiet" onClick={goPrevChapter} disabled={chapterIndex===0}><ArrowLeft size={18}/> {t('storyPrevChapter')}</button>
    <button type="button" onClick={goNextChapter}>{chapterIndex+1<chapters.length?t('storyNextChapter'):t('storyStartQuestions')}<ArrowRight size={18}/></button>
   </div>
  </section>;
 }

 // Step 5: recall questions, then a done screen.
 return <section className="story-time">
  <button type="button" className="quiet" onClick={backToStories}><ArrowLeft size={16}/> {tt('storyBackToStories',{state:nerState.state})}</button>
  <span className="eyebrow">{nerState.state.toUpperCase()}</span>
  <h1>{displayTitle}</h1>
  {stage==='questions'&&<QuestionCard key={qIndex} question={story.questions[qIndex]} index={qIndex} voiceLang={audioLang} uiLang={lang} onAnswered={answered}/>}
  {stage==='done'&&<div className="card story-done">
   <h2>{t('storyDoneHeading')}</h2>
   <p>{tt('storyDoneBody',{title:displayTitle,count:story.questions.length})}</p>
   <button onClick={backToStories}>{tt('storyAnotherStory',{state:nerState.state})}<ArrowRight size={18}/></button>
  </div>}
 </section>;
}
