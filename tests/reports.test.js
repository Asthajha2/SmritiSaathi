import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {createApp} from '../server/index.js';

test('medical reports: patient + caregiver upload, list, delete',async()=>{
 const {app}=createApp(':memory:');const server=app.listen(0);await new Promise(r=>server.once('listening',r));
 const base='http://127.0.0.1:'+server.address().port+'/api';
 async function req(path,method='GET',body,cookie){const r=await fetch(base+path,{method,headers:{'content-type':'application/json','x-smriti-client':'test',...(cookie?{cookie}:{})},body:body===undefined?undefined:JSON.stringify(body)});return {status:r.status,data:await r.json(),cookie:r.headers.get('set-cookie')?.split(';')[0]};}
 const p=await req('/auth/signup','POST',{email:'patient-reports@example.test',name:'Patient',password:'a-long-password',role:'patient',consent:true});
 const c=await req('/auth/signup','POST',{email:'care-reports@example.test',name:'Carer',password:'a-long-password',role:'caregiver',consent:true});
 const id=p.data.id;
 const invite=await req('/invites','POST',{consent:true},p.cookie);
 assert.equal((await req('/links','POST',{code:invite.data.code},c.cookie)).status,200);
 const tinyPng='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
 const patientReport={eventId:randomUUID(),id:randomUUID(),kind:'report',op:'put',data:{name:'Blood test — March',category:'Blood Test',notes:'Fasting sample',fileName:'blood.png',fileType:'image/png',fileData:tinyPng,uploadedBy:'patient',uploaderName:'Patient',at:Date.now()}};
 assert.equal((await req('/patients/'+id+'/events','POST',patientReport,p.cookie)).status,200);
 const caregiverReport={eventId:randomUUID(),id:randomUUID(),kind:'report',op:'put',data:{name:'Prescription refill',category:'Prescription',notes:'',fileName:'rx.pdf',fileType:'application/pdf',fileData:'data:application/pdf;base64,JVBERi0xLjQK',uploadedBy:'caregiver',uploaderName:'Carer',at:Date.now()}};
 assert.equal((await req('/patients/'+id+'/events','POST',caregiverReport,c.cookie)).status,200);
 const rows=(await req('/patients/'+id+'/records','GET',undefined,c.cookie)).data.filter(x=>x.kind==='report');
 assert.equal(rows.length,2);
 assert.ok(rows.some(x=>x.data.uploadedBy==='patient'));
 assert.ok(rows.some(x=>x.data.uploadedBy==='caregiver'));
 const patientRows=(await req('/patients/'+id+'/records','GET',undefined,p.cookie)).data.filter(x=>x.kind==='report');
 assert.equal(patientRows.length,2);
 const badReport={eventId:randomUUID(),id:randomUUID(),kind:'report',op:'put',data:{name:'Bad',category:'General',fileName:'x.exe',fileType:'application/x-msdownload',fileData:'data:application/x-msdownload;base64,AA==',uploadedBy:'patient',at:Date.now()}};
 assert.equal((await req('/patients/'+id+'/events','POST',badReport,p.cookie)).status,400);
 const delEvent={eventId:randomUUID(),id:caregiverReport.id,kind:'report',op:'delete'};
 assert.equal((await req('/patients/'+id+'/events','POST',delEvent,p.cookie)).status,200);
 const afterDelete=(await req('/patients/'+id+'/records','GET',undefined,c.cookie)).data.filter(x=>x.kind==='report');
 assert.equal(afterDelete.length,1);
 server.close();
});
