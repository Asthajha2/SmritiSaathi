import React,{useRef,useState} from 'react';
import {Music2,Pause,Play,Sparkles,Volume2} from 'lucide-react';

const playlists={
 'Calming & Soothing':[
  {n:'Gentle Morning',notes:[261.63,329.63,392,329.63]},
  {n:'Slow Evening',notes:[220,261.63,329.63,261.63]},
  {n:'Quiet Breathing',notes:[196,246.94,293.66,246.94]}
 ],
 'Familiar Classics':[
  {n:'Warm Melody',notes:[262,294,330,392,330,294]},
  {n:'Family Time',notes:[330,392,440,392,330]}
 ],
 'Nature':[
  {n:'Rain-like Tones',notes:[196,220,247,220,196]},
  {n:'Garden Walk',notes:[262,330,392,523,392,330]}
 ]
};
function playSequence(ctx,track){track.notes.forEach((f,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.0001,ctx.currentTime+i*.65);g.gain.exponentialRampToValueAtTime(.07,ctx.currentTime+i*.65+.04);g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+i*.65+.55);o.connect(g);g.connect(ctx.destination);o.start(ctx.currentTime+i*.65);o.stop(ctx.currentTime+i*.65+.6);});}
export default function Music(){const [playing,setPlaying]=useState('');const ctx=useRef(null);const timer=useRef(null);const toggle=(cat,track)=>{const key=cat+'|'+track.n;if(playing===key){ctx.current?.close();ctx.current=null;clearTimeout(timer.current);setPlaying('');return;}ctx.current?.close();const C=window.AudioContext||window.webkitAudioContext;if(!C)return;ctx.current=new C();playSequence(ctx.current,track);setPlaying(key);clearTimeout(timer.current);timer.current=setTimeout(()=>setPlaying(''),track.notes.length*650+300);};return <><div className="page-top"><div><span className="eyebrow">SUR SANGEET</span><h1>Music</h1><p className="lead">Familiar, gentle sounds for quiet moments.</p></div><Volume2 size={28}/></div>{Object.entries(playlists).map(([cat,tracks])=><section className="card" key={cat}><h2 style={{display:'flex',alignItems:'center',gap:8}}>{cat==='Calming & Soothing'?<Sparkles size={19}/>:<Music2 size={19}/>} {cat}</h2><p className="small">Audio is generated locally on this device and is not uploaded.</p>{tracks.map(track=>{const key=cat+'|'+track.n;return <div className="list-row" key={track.n}><button className="quiet" onClick={()=>toggle(cat,track)}>{playing===key?<Pause size={16}/>:<Play size={16}/>} {playing===key?'Playing':'Play'}</button><strong>{track.n}</strong><span className="small">Gentle {cat.toLowerCase()} tones</span></div>;})}</section>)}<section className="card"><h2>Your own favourite music</h2><p className="small">Choose an audio file from this device. It stays on this device and is not uploaded.</p><label>Choose music<input type="file" accept="audio/*" onChange={e=>{const f=e.target.files?.[0];if(f){const a=new Audio(URL.createObjectURL(f));a.play();}}}/></label></section></>}
