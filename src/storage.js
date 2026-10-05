import {serverURL} from './native';
const memoryCache=new Map();
const memoryQueue=new Map();
let dbPromise;
try {
  if (typeof indexedDB !== 'undefined') {
    dbPromise=new Promise((resolve,reject)=>{
      const req=indexedDB.open('smriti-v1',1);
      req.onupgradeneeded=()=>{for(const name of ['cache','queue'])if(!req.result.objectStoreNames.contains(name))req.result.createObjectStore(name,{keyPath:'id'});};
      req.onsuccess=()=>resolve(req.result);
      req.onerror=()=>reject(req.error);
    });
  }
} catch {}
async function operation(store,mode,fn){
  if(!dbPromise){
    const data=store==='cache'?memoryCache:memoryQueue;
    if(mode==='readonly') return fn({get:id=>({result:data.get(id)}),getAll:()=>({result:[...data.values()]})}).result;
    const fake={put:v=>{data.set(v.id,v);return {result:v};},delete:id=>{data.delete(id);return {result:undefined};},clear:()=>{data.clear();return {result:undefined};}};
    return fn(fake).result;
  }
  try {
    const db=await dbPromise;
    return await new Promise((resolve,reject)=>{
      const tx=db.transaction(store,mode);const req=fn(tx.objectStore(store));
      tx.oncomplete=()=>resolve(req?.result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);
    });
  } catch {
    const data=store==='cache'?memoryCache:memoryQueue;
    if(mode==='readonly') return fn({get:id=>({result:data.get(id)}),getAll:()=>({result:[...data.values()]})}).result;
    const fake={put:v=>{data.set(v.id,v);return {result:v};},delete:id=>{data.delete(id);return {result:undefined};},clear:()=>{data.clear();return {result:undefined};}};
    return fn(fake).result;
  }
}
export const local={get:id=>operation('cache','readonly',s=>s.get(id)),put:(id,value)=>operation('cache','readwrite',s=>s.put({id,value})),queue:e=>operation('queue','readwrite',s=>s.put(e)),queued:()=>operation('queue','readonly',s=>s.getAll()),remove:id=>operation('queue','readwrite',s=>s.delete(id)),clear:async()=>{await operation('cache','readwrite',s=>s.clear());await operation('queue','readwrite',s=>s.clear());}};
export async function api(path,options={}){let response;try{response=await fetch(serverURL()+'/api'+path,{...options,credentials:'include',headers:{'Content-Type':'application/json','X-Smriti-Client':'web',...options.headers},signal:options.signal||AbortSignal.timeout(15000)});}catch{throw Object.assign(new Error('Cannot reach the server. Your saved changes will wait on this device.'),{network:true});}if(!response.ok){const data=await response.json().catch(()=>({error:'Request failed'}));throw Object.assign(new Error(data.error),{status:response.status});}return response.json();}
let syncing=false;
export async function syncQueue(userId){if(syncing)return;syncing=true;let lastError;try{const events=(await local.queued()).filter(e=>e.userId===userId).sort((a,b)=>a.created-b.created);for(const event of events){try{await api('/patients/'+event.patient+'/events',{method:'POST',body:JSON.stringify(event.event)});await local.remove(event.id);}catch(e){if([400,403,409].includes(e.status)){await local.queue({...event,failed:e.message});}else{lastError=e;}}}}finally{syncing=false;}if(lastError)throw lastError;}
