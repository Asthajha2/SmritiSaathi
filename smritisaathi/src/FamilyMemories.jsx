import React,{useState,useEffect,useCallback,useRef,useMemo} from 'react';
import {Camera,X,ChevronLeft,ChevronRight,Heart,Plus,Trash2,Sparkles,Volume2,Calendar,Type} from 'lucide-react';
import {safeStorage} from './browserStorage';
import {readAloud} from './voice';

const FLASH_GRADIENTS=[
  'linear-gradient(150deg,#f6a56b,#e2724a)',
  'linear-gradient(150deg,#7fb7a3,#3f8a72)',
  'linear-gradient(150deg,#8fa7d8,#5a6fc0)',
  'linear-gradient(150deg,#e0a3c4,#c06a94)'
];
const MAX_FLASH_TILES=3;

export default function FamilyMemories({user,family,memories,onAddMemory,onDeleteMemory,lang}){
  const [activeGroup,setActiveGroup]=useState(null);
  const [slideIdx,setSlideIdx]=useState(0);
  const [flashIdx,setFlashIdx]=useState(null); // index into eventCards, or null when closed
  const [speaking,setSpeaking]=useState(false);
  const [adding,setAdding]=useState(false);
  const [addMode,setAddMode]=useState('photo'); // 'photo' | 'event'
  const [newTitle,setNewTitle]=useState('');
  const [newPhoto,setNewPhoto]=useState('');
  const [newEventWhen,setNewEventWhen]=useState('');
  const [newStory,setNewStory]=useState('');
  const fileRef=useRef(null);
  const timerRef=useRef(null);

  /* ── Text memory flashcards: important life events, tap to hear/read ── */
  const eventCards=useMemo(()=>(memories||[])
    .filter(m=>m.memType==='event')
    .sort((a,b)=>(b.at||0)-(a.at||0))
    .map(m=>({id:m.id,title:m.title||'Memory',eventDate:m.eventDate||'',story:m.story||'',photoDataUrl:m.photoDataUrl||'',addedBy:m.addedBy,deletable:true})),
  [memories]);

  /* ── Build photo groups (Google Photos style albums) ── */
  const groups=useMemo(()=>{
    const list=[];

    /* 1. Family member photos stored in localStorage */
    const famItems=(family||[]).map(f=>{
      const photo=safeStorage.getItem('smriti-family-photo:'+f.name.trim().toLowerCase());
      return photo?{id:'fam-'+f.id,title:f.name,subtitle:f.relation||'',photoDataUrl:photo,deletable:false}:null;
    }).filter(Boolean);
    if(famItems.length>0){
      list.push({id:'loved-ones',label:'Loved Ones',emoji:'❤️',cover:famItems[0].photoDataUrl,items:famItems});
    }

    /* 2. Server memory records (photo type only) — group by year */
    const byYear={};
    for(const m of (memories||[])){
      if(m.memType==='event')continue;
      const yr=m.at?new Date(m.at).getFullYear():'Memories';
      if(!byYear[yr])byYear[yr]=[];
      byYear[yr].push({id:m.id,title:m.title||m.memberName||'Memory',subtitle:m.addedBy==='caregiver'?'Shared by caregiver':'',photoDataUrl:m.photoDataUrl,deletable:true});
    }

    const now=new Date().getFullYear();
    Object.keys(byYear).sort((a,b)=>b-a).forEach(yr=>{
      const items=byYear[yr];
      const label=Number(yr)===now?'This Year':Number(yr)===now-1?'Last Year':Number(yr)<now-3?'Flashback':String(yr);
      list.push({id:'yr-'+yr,label,emoji:Number(yr)<now-3?'✨':'📷',cover:items[0].photoDataUrl,items});
    });

    return list;
  },[family,memories]);

  /* ── Slideshow controls (photo albums) ── */
  const startTimer=useCallback(()=>{
    clearInterval(timerRef.current);
    if(activeGroup&&activeGroup.items.length>1){
      timerRef.current=setInterval(()=>setSlideIdx(i=>(i+1)%activeGroup.items.length),3500);
    }
  },[activeGroup]);

  useEffect(()=>{
    if(!activeGroup){clearInterval(timerRef.current);return;}
    startTimer();
    return()=>clearInterval(timerRef.current);
  },[activeGroup,startTimer]);

  const openGroup=g=>{setActiveGroup(g);setSlideIdx(0);};
  const closeSlide=()=>{setActiveGroup(null);clearInterval(timerRef.current);};

  const next=useCallback(()=>{
    if(!activeGroup)return;
    setSlideIdx(i=>(i+1)%activeGroup.items.length);
  },[activeGroup]);

  const prev=useCallback(()=>{
    if(!activeGroup)return;
    setSlideIdx(i=>(i-1+activeGroup.items.length)%activeGroup.items.length);
  },[activeGroup]);

  /* ── Flashcard (text memory) controls ── */
  const speak=useCallback(text=>{
    setSpeaking(true);
    readAloud(text,lang||'en').catch(()=>{}).finally(()=>setSpeaking(false));
  },[lang]);

  const openFlash=i=>{
    setFlashIdx(i);
    const c=eventCards[i];
    if(c)speak([c.title,c.eventDate?('On '+c.eventDate):'',c.story].filter(Boolean).join('. '));
  };
  const closeFlash=()=>{
    setFlashIdx(null);
    if(window?.speechSynthesis)window.speechSynthesis.cancel();
    setSpeaking(false);
  };
  const flashNext=()=>{if(flashIdx==null)return;const i=(flashIdx+1)%eventCards.length;openFlash(i);};
  const flashPrev=()=>{if(flashIdx==null)return;const i=(flashIdx-1+eventCards.length)%eventCards.length;openFlash(i);};
  const replaySpeech=()=>{
    const c=eventCards[flashIdx];
    if(c)speak([c.title,c.eventDate?('On '+c.eventDate):'',c.story].filter(Boolean).join('. '));
  };
  const deleteFlashAndAdvance=()=>{
    const current=eventCards[flashIdx];
    onDeleteMemory(current.id);
    const remaining=eventCards.filter(x=>x.id!==current.id);
    if(remaining.length===0)closeFlash();
    else setFlashIdx(i=>Math.min(i,remaining.length-1));
  };

  /* ── Photo picker (shared by both add modes) ── */
  const readPhoto=file=>{
    if(!file)return;
    const r=new FileReader();
    r.onload=()=>setNewPhoto(String(r.result));
    r.readAsDataURL(file);
  };

  const resetAddForm=()=>{setNewTitle('');setNewPhoto('');setNewEventWhen('');setNewStory('');setAddMode('photo');};

  const saveMemory=async()=>{
    if(addMode==='event'){
      if(!newTitle.trim()||!newStory.trim())return;
      await onAddMemory({title:newTitle.trim(),memType:'event',eventDate:newEventWhen.trim(),story:newStory.trim(),photoDataUrl:newPhoto||undefined,addedBy:'patient',at:Date.now()});
    }else{
      if(!newPhoto)return;
      await onAddMemory({title:newTitle.trim()||'Memory',photoDataUrl:newPhoto,addedBy:'patient',memberName:newTitle.trim(),at:Date.now()});
    }
    resetAddForm();setAdding(false);
  };

  const deleteAndAdvance=()=>{
    const current=activeGroup.items[slideIdx];
    onDeleteMemory(current.id);
    const remaining=activeGroup.items.filter(x=>x.id!==current.id);
    if(remaining.length===0){closeSlide();}
    else{
      setActiveGroup({...activeGroup,items:remaining});
      setSlideIdx(i=>Math.min(i,remaining.length-1));
    }
  };

  if(groups.length===0&&eventCards.length===0&&user?.role!=='patient')return null;

  const visibleFlashCards=eventCards.slice(0,MAX_FLASH_TILES);
  const extraFlashCount=eventCards.length-visibleFlashCards.length;
  const flashCard=flashIdx!=null?eventCards[flashIdx]:null;

  return(<>
    {/* ══ Google Photos style memory blocks + text memory flashcards ══ */}
    <div className="mgp-bar">
      <div className="mgp-scroll">

        {/* Text memory flashcards — "do you remember this?" style prompts */}
        {visibleFlashCards.map((c,i)=>(
          <button key={c.id} className="mgp-card mgp-card-flash" style={{background:FLASH_GRADIENTS[i%FLASH_GRADIENTS.length]}}
            onClick={()=>openFlash(i)} type="button" aria-label={'Open memory: '+c.title}>
            <Sparkles size={20} color="rgba(255,255,255,.85)"/>
            <span className="mgp-flash-eyebrow">Do you remember?</span>
            <span className="mgp-flash-title">{c.title}</span>
            {c.eventDate&&<span className="mgp-flash-date"><Calendar size={12}/>{c.eventDate}</span>}
          </button>
        ))}
        {extraFlashCount>0&&(
          <button className="mgp-card mgp-card-flash mgp-card-flash-more" style={{background:FLASH_GRADIENTS[3]}}
            onClick={()=>openFlash(MAX_FLASH_TILES)} type="button" aria-label="See more memories">
            <Sparkles size={20} color="rgba(255,255,255,.85)"/>
            <span className="mgp-flash-title">+{extraFlashCount} more {extraFlashCount===1?'memory':'memories'}</span>
          </button>
        )}

        {groups.map(g=>(
          <button key={g.id} className="mgp-card" onClick={()=>openGroup(g)} type="button" aria-label={'Open '+g.label}>
            <img src={g.cover} alt={g.label} className="mgp-card-img"/>
            <div className="mgp-card-overlay"/>
            <div className="mgp-card-body">
              <span className="mgp-card-title">{g.label}</span>
              <span className="mgp-card-sub">{g.items.length} photo{g.items.length!==1?'s':''}</span>
            </div>
          </button>
        ))}

        {/* Add buttons — look like cards with dashed border */}
        {user?.role==='patient'&&(<>
          <button className="mgp-card mgp-card-add" onClick={()=>{setAddMode('photo');setAdding(true);}} type="button" aria-label="Add a photo memory">
            <Plus size={30} color="#5f9b82"/>
            <span className="mgp-add-text">Add<br/>Photo</span>
          </button>
          <button className="mgp-card mgp-card-add mgp-card-add-event" onClick={()=>{setAddMode('event');setAdding(true);}} type="button" aria-label="Add a written memory event">
            <Sparkles size={26} color="#5f9b82"/>
            <span className="mgp-add-text">Add Memory<br/>Event</span>
          </button>
        </>)}

        {/* Empty hint for patient */}
        {groups.length===0&&eventCards.length===0&&user?.role==='patient'&&(
          <p className="mgp-empty-hint">Ask your caregiver to share photos or memories, or tap "Add Memory" →</p>
        )}
      </div>
    </div>

    {/* ══ Photo slideshow overlay ══ */}
    {activeGroup&&(
      <div className="memory-overlay" role="dialog" aria-modal="true" aria-label="Memory slideshow">

        {/* Progress bars */}
        <div className="memory-progress-row">
          {activeGroup.items.map((_,i)=>(
            <div key={i} className="memory-progress-track">
              <div className={'memory-progress-fill'+(i<slideIdx?' done':i===slideIdx?' active':'')}
                style={i===slideIdx?{animationDuration:'3.5s'}:undefined}/>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="mgp-slide-header">
          <Heart size={16} fill="white" color="white"/>
          <span>{activeGroup.label}</span>
          <button className="mgp-close-btn" onClick={closeSlide} aria-label="Close"><X size={22}/></button>
        </div>

        {/* Main image */}
        <div className="memory-slide-wrap">
          <img
            key={activeGroup.items[slideIdx].id}
            src={activeGroup.items[slideIdx].photoDataUrl}
            alt={activeGroup.items[slideIdx].title}
            className="memory-slide-img"
          />
          <div className="memory-slide-caption">
            <strong>{activeGroup.items[slideIdx].title}</strong>
            {activeGroup.items[slideIdx].subtitle&&<span>{activeGroup.items[slideIdx].subtitle}</span>}
          </div>
        </div>

        {/* Invisible tap zones (left / right half) */}
        <button className="memory-tap-prev" onClick={()=>{prev();startTimer();}} aria-label="Previous"/>
        <button className="memory-tap-next" onClick={()=>{next();startTimer();}} aria-label="Next"/>

        {/* Visible arrow buttons (desktop) */}
        <button className="memory-arrow memory-arrow-left" onClick={()=>{prev();startTimer();}}><ChevronLeft size={26}/></button>
        <button className="memory-arrow memory-arrow-right" onClick={()=>{next();startTimer();}}><ChevronRight size={26}/></button>

        {activeGroup.items[slideIdx].deletable&&onDeleteMemory&&(
          <button className="memory-delete-btn" onClick={deleteAndAdvance} aria-label="Delete"><Trash2 size={15}/></button>
        )}
      </div>
    )}

    {/* ══ Text memory flashcard overlay — "do you remember this?" reveal ══ */}
    {flashCard&&(
      <div className="memory-overlay flash-overlay" role="dialog" aria-modal="true" aria-label="Memory flashback">
        <div className="flash-card-inner" style={{background:FLASH_GRADIENTS[flashIdx%FLASH_GRADIENTS.length]}}>
          <div className="mgp-slide-header" style={{position:'static',background:'none',padding:'0 0 18px'}}>
            <Sparkles size={17} color="#fff"/>
            <span>Memory Flashback</span>
            <button className="mgp-close-btn" onClick={closeFlash} aria-label="Close"><X size={22}/></button>
          </div>

          {flashCard.eventDate&&<span className="flash-date-pill"><Calendar size={14}/>{flashCard.eventDate}</span>}
          <h2 className="flash-title">{flashCard.title}</h2>
          {flashCard.photoDataUrl&&<img src={flashCard.photoDataUrl} alt={flashCard.title} className="flash-photo"/>}
          <p className="flash-story">{flashCard.story}</p>

          <div className="flash-actions">
            <button type="button" onClick={replaySpeech} className="flash-listen-btn" aria-label="Listen">
              <Volume2 size={19}/> {speaking?'Speaking…':'Listen again'}
            </button>
            {flashCard.deletable&&onDeleteMemory&&(
              <button type="button" className="quiet flash-delete-btn" onClick={deleteFlashAndAdvance} aria-label="Delete"><Trash2 size={15}/></button>
            )}
          </div>
        </div>

        {eventCards.length>1&&<>
          <button className="memory-arrow memory-arrow-left" onClick={flashPrev}><ChevronLeft size={26}/></button>
          <button className="memory-arrow memory-arrow-right" onClick={flashNext}><ChevronRight size={26}/></button>
        </>}
      </div>
    )}

    {/* ══ Add memory sheet ══ */}
    {adding&&(
      <div className="memory-overlay memory-add-overlay" onClick={()=>{setAdding(false);resetAddForm();}}>
        <div className="memory-add-sheet" onClick={e=>e.stopPropagation()}>
          <button className="memory-x" style={{position:'static',marginLeft:'auto',display:'flex'}} onClick={()=>{setAdding(false);resetAddForm();}}><X size={20}/></button>
          <h3 style={{margin:'4px 0 14px'}}>Add a Memory</h3>

          <div className="add-mode-tabs">
            <button type="button" className={'add-mode-tab'+(addMode==='photo'?' active':'')} onClick={()=>setAddMode('photo')}><Camera size={16}/> Photo</button>
            <button type="button" className={'add-mode-tab'+(addMode==='event'?' active':'')} onClick={()=>setAddMode('event')}><Type size={16}/> Written memory</button>
          </div>

          {addMode==='photo'?(<>
            {newPhoto?(
              <div style={{marginBottom:14}}>
                <img src={newPhoto} alt="Preview" style={{width:'100%',maxHeight:220,objectFit:'cover',borderRadius:14}}/>
                <button type="button" className="quiet" style={{marginTop:8,fontSize:'.8rem',minHeight:'auto',padding:'8px 14px'}} onClick={()=>setNewPhoto('')}><Trash2 size={13}/> Remove</button>
              </div>
            ):(
              <button type="button" className="memory-photo-pick" onClick={()=>fileRef.current?.click()}>
                <Camera size={26}/><span>Choose a photo</span>
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={e=>readPhoto(e.target.files?.[0])}/>
            <label style={{marginBottom:14}}>Caption (optional)<input value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="e.g. Dad at the park"/></label>
            <button onClick={saveMemory} disabled={!newPhoto} style={{width:'100%'}}>Save memory</button>
          </>):(<>
            <label style={{marginBottom:14}}>What is this memory called?<input value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="e.g. Our wedding day" maxLength="120"/></label>
            <label style={{marginBottom:14}}>When did it happen? (optional)<input value={newEventWhen} onChange={e=>setNewEventWhen(e.target.value)} placeholder="e.g. 12 August 1975, or just 1975"/></label>
            <label style={{marginBottom:14}}>Tell the story<textarea value={newStory} onChange={e=>setNewStory(e.target.value)} placeholder="Write what happened, so it can be read back later…" rows={4} style={{width:'100%',border:'1px solid #aebfb5',borderRadius:9,padding:'11px 12px',fontFamily:'inherit',fontSize:'1rem',resize:'vertical'}}/></label>
            {newPhoto?(
              <div style={{marginBottom:14}}>
                <img src={newPhoto} alt="Preview" style={{width:'100%',maxHeight:180,objectFit:'cover',borderRadius:14}}/>
                <button type="button" className="quiet" style={{marginTop:8,fontSize:'.8rem',minHeight:'auto',padding:'8px 14px'}} onClick={()=>setNewPhoto('')}><Trash2 size={13}/> Remove photo</button>
              </div>
            ):(
              <button type="button" className="quiet" style={{marginBottom:14,width:'100%'}} onClick={()=>fileRef.current?.click()}>
                <Camera size={16}/> Add a photo (optional)
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={e=>readPhoto(e.target.files?.[0])}/>
            <button onClick={saveMemory} disabled={!newTitle.trim()||!newStory.trim()} style={{width:'100%'}}>Save memory</button>
          </>)}
        </div>
      </div>
    )}
  </>);
}
