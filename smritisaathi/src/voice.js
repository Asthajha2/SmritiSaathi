import {Capacitor,registerPlugin} from '@capacitor/core';
const NativeVoice=registerPlugin('SmritiVoice');
import {languages} from './i18n';
import {api} from './storage';

// Some browsers (esp. on first load) return an empty voice list until the
// async 'voiceschanged' event fires. Waiting for it means we pick a proper
// native voice for the selected language instead of silently falling back
// to whatever the browser's default voice/accent happens to be.
function getVoicesAsync(){
  const existing=window.speechSynthesis?.getVoices()||[];
  if(existing.length)return Promise.resolve(existing);
  return new Promise(resolve=>{
    const done=()=>resolve(window.speechSynthesis?.getVoices()||[]);
    if(!window.speechSynthesis){resolve([]);return;}
    speechSynthesis.addEventListener('voiceschanged',done,{once:true});
    setTimeout(done,400); // don't hang forever if the event never fires
  });
}

function pickVoice(voices,bcp47){
  const target=bcp47.toLowerCase();
  const short=target.split('-')[0];
  return voices.find(v=>v.lang.toLowerCase()===target) // exact locale, e.g. hi-IN
    ||voices.find(v=>v.lang.toLowerCase().startsWith(short+'-')) // same language, any region
    ||voices.find(v=>v.lang.toLowerCase()===short)
    ||null;
}

// Resolves once playback actually finishes (not just once it starts), so
// callers can chain something onto "audio has ended" — e.g. auto-starting
// recall questions right after a story finishes playing.
export async function readAloud(text,lang){
  const bcp47=languages.find(x=>x[0]===lang)?.[2]||'en-IN';
  if(Capacitor.isNativePlatform()){
    await NativeVoice.speak({text,lang:bcp47});
    // The native plugin's promise resolves once the speak call is issued,
    // not once playback ends, so estimate a duration from word count
    // (~2.3 words/sec at a slow, patient-friendly pace) and wait it out.
    const words=String(text||'').trim().split(/\s+/).filter(Boolean).length;
    const ms=Math.max(1200,Math.round(words/2.3*1000));
    return new Promise(resolve=>setTimeout(resolve,ms));
  }
  if(!window.speechSynthesis)return Promise.reject(new Error('Speech output is unavailable on this browser'));
  speechSynthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(text);
  // Always set the target locale, even if no matching voice is installed —
  // this keeps the correct language tag on the utterance so the browser's
  // own language routing (not a mismatched voice/accent) drives pronunciation.
  utterance.lang=bcp47;
  utterance.rate=.85;
  const voices=await getVoicesAsync();
  const voice=pickVoice(voices,bcp47);
  if(voice)utterance.voice=voice;
  return new Promise((resolve,reject)=>{
    utterance.onend=()=>resolve();
    utterance.onerror=e=>{
      // 'interrupted'/'canceled' happen when a new readAloud call cancels
      // this one (e.g. user taps another button) — not a real failure.
      if(e.error==='interrupted'||e.error==='canceled')resolve();
      else reject(new Error('Speech output failed'));
    };
    speechSynthesis.speak(utterance);
  });
}
export function listen(lang,onResult,onError){if(Capacitor.isNativePlatform()){let active=true;NativeVoice.listen({lang:languages.find(x=>x[0]===lang)?.[2]||'en-IN'}).then(r=>active&&onResult(r.text)).catch(e=>active&&onError(e.message));return ()=>{active=false;NativeVoice.stop().catch(()=>{});};}const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;if(!Recognition)throw new Error('Browser speech input is unavailable. Use typing or the optional audio transcription button.');const recognition=new Recognition();recognition.lang=languages.find(x=>x[0]===lang)?.[2]||'en-IN';recognition.interimResults=false;recognition.onresult=e=>onResult(e.results[0][0].transcript);recognition.onerror=e=>onError('Speech input: '+e.error);recognition.start();return ()=>recognition.abort();}
export async function recordWhisper(onResult,onError){const stream=await navigator.mediaDevices.getUserMedia({audio:true});const recorder=new MediaRecorder(stream);const chunks=[];recorder.ondataavailable=e=>chunks.push(e.data);recorder.onstop=async()=>{stream.getTracks().forEach(t=>t.stop());try{const response=await api('/transcribe',{method:'POST',headers:{'Content-Type':recorder.mimeType},body:new Blob(chunks,{type:recorder.mimeType}),signal:AbortSignal.timeout(65000)});onResult(response.text);}catch(e){onError(e.message);}};recorder.start();const timer=setTimeout(()=>recorder.state==='recording'&&recorder.stop(),15000);return ()=>{clearTimeout(timer);if(recorder.state==='recording')recorder.stop();};}
