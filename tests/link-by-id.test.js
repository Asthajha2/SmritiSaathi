import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {createApp} from '../server/index.js';

test('connect by patient id: requires patient opt-in, links, and is rejected when off',async()=>{
 const {app}=createApp(':memory:');const server=app.listen(0);await new Promise(r=>server.once('listening',r));
 const base='http://127.0.0.1:'+server.address().port+'/api';
 async function req(path,method='GET',body,cookie){const r=await fetch(base+path,{method,headers:{'content-type':'application/json','x-smriti-client':'test',...(cookie?{cookie}:{})},body:body===undefined?undefined:JSON.stringify(body)});return {status:r.status,data:await r.json(),cookie:r.headers.get('set-cookie')?.split(';')[0]};}
 const p=await req('/auth/signup','POST',{email:'patient-byid@example.test',name:'Patient',password:'a-long-password',role:'patient',consent:true});
 const c=await req('/auth/signup','POST',{email:'care-byid@example.test',name:'Carer',password:'a-long-password',role:'caregiver',consent:true});
 const id=p.data.id;

 // Not opted in yet -> rejected, and patient care data is not accessible.
 assert.equal((await req('/links/by-id','POST',{patientId:id},c.cookie)).status,403);
 assert.equal((await req('/patients/'+id+'/records','GET',undefined,c.cookie)).status,403);

 // Patient turns on Patient-ID sharing.
 const settingsEvent={eventId:randomUUID(),id:'settings',kind:'settings',op:'put',data:{locationConsent:false,phone:'',shareViaId:true}};
 assert.equal((await req('/patients/'+id+'/events','POST',settingsEvent,p.cookie)).status,200);

 // Random / unrelated caregiver-only endpoint check: a patient account can't call it.
 assert.equal((await req('/links/by-id','POST',{patientId:id},p.cookie)).status,403);

 // Now the caregiver can connect using just the ID.
 const link=await req('/links/by-id','POST',{patientId:id},c.cookie);
 assert.equal(link.status,200);
 assert.equal((await req('/patients/'+id+'/records','GET',undefined,c.cookie)).status,200);

 // A bogus / non-existent id is rejected.
 assert.equal((await req('/links/by-id','POST',{patientId:randomUUID()},c.cookie)).status,404);

 // Patient turns sharing back off; existing link is untouched (still linked), but a fresh connect attempt by a new caregiver fails.
 const off={eventId:randomUUID(),id:'settings',kind:'settings',op:'put',data:{locationConsent:false,phone:'',shareViaId:false}};
 assert.equal((await req('/patients/'+id+'/events','POST',off,p.cookie)).status,200);
 const c2=await req('/auth/signup','POST',{email:'care-byid-2@example.test',name:'Carer2',password:'a-long-password',role:'caregiver',consent:true});
 assert.equal((await req('/links/by-id','POST',{patientId:id},c2.cookie)).status,403);
 assert.equal((await req('/patients/'+id+'/records','GET',undefined,c.cookie)).status,200);

 server.close();
});
