import React,{useRef,useState} from 'react';
import {FileText,Upload,Eye,EyeOff,Trash2,Image as ImageIcon} from 'lucide-react';

const categories=['General','Blood Test','Prescription','Scan/Imaging','Vaccination','Other'];
const MAX_FILE_BYTES=4*1024*1024;

export default function MedicalReports({mode='patient',reports=[],onUpload,onDelete}){
 const [name,setName]=useState('');
 const [category,setCategory]=useState('General');
 const [notes,setNotes]=useState('');
 const [fileName,setFileName]=useState('');
 const [fileType,setFileType]=useState('');
 const [fileData,setFileData]=useState('');
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState('');
 const [showList,setShowList]=useState(mode==='patient');
 const fileRef=useRef(null);

 const pickFile=file=>{
  setError('');
  if(!file)return;
  if(!/^image\//.test(file.type)&&file.type!=='application/pdf'){setError('Please choose an image or PDF file.');if(fileRef.current)fileRef.current.value='';return;}
  if(file.size>MAX_FILE_BYTES){setError('That file is too large. Please choose one under 4 MB.');if(fileRef.current)fileRef.current.value='';return;}
  const r=new FileReader();
  r.onload=()=>{setFileData(String(r.result));setFileName(file.name);setFileType(file.type);};
  r.onerror=()=>setError('Could not read the selected file.');
  r.readAsDataURL(file);
 };

 const submit=async e=>{
  e.preventDefault();
  setError('');
  if(!name.trim()){setError('Please enter a report name.');return;}
  if(!fileData){setError('Please choose a file to upload.');return;}
  setBusy(true);
  try{
   await onUpload({name:name.trim(),category,notes:notes.trim(),fileName,fileType,fileData,at:Date.now()});
   setName('');setCategory('General');setNotes('');setFileName('');setFileType('');setFileData('');
   if(fileRef.current)fileRef.current.value='';
   setShowList(true);
  }catch(err){setError(err.message||'Could not upload report.');}
  finally{setBusy(false);}
 };

 const list=[...reports].sort((a,b)=>(b.at||0)-(a.at||0));

 return <section className="card medical-reports">
  <div className="section-heading">
   <div>
    <h2><FileText size={19}/> Medical Reports</h2>
    <p className="small">{mode==='patient'?'Reports your caregiver uploads appear here, and anything you add here is visible to your linked caregiver too.':'Upload a report for your linked patient. It becomes part of their medical history, and you can view everything uploaded here.'}</p>
   </div>
   {mode==='caregiver'&&<button type="button" className="quiet" onClick={()=>setShowList(s=>!s)}>{showList?<EyeOff size={16}/>:<Eye size={16}/>} {showList?'Hide reports':'View reports'}</button>}
  </div>
  <form onSubmit={submit}>
   <div className="form-grid">
    <label>Report name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Blood test — March" maxLength={200}/></label>
    <label>Category<select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c} value={c}>{c}</option>)}</select></label>
    <label>File (image or PDF)<input ref={fileRef} type="file" accept="image/*,application/pdf" onChange={e=>pickFile(e.target.files?.[0])}/></label>
    <label>Notes (optional)<input value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Any context for this report" maxLength={500}/></label>
   </div>
   {error&&<p className="small error-text">{error}</p>}
   <button style={{marginTop:6}} disabled={busy}><Upload size={16}/> {busy?'Uploading…':'Upload report'}</button>
  </form>
  {(mode==='patient'||showList)&&<>
   <hr/>
   {list.length===0?<p className="small">No medical reports yet.</p>:list.map(r=>{
    const isImage=/^image\//.test(r.fileType||'');
    return <div className="list-row" key={r.id}>
     <span className="report-thumb">{isImage?<img src={r.fileData} alt=""/>:<FileText size={18}/>}</span>
     <div><strong>{r.name}</strong><p>{r.category}{' · '}{r.at?new Date(r.at).toLocaleDateString():''}{' · '}{r.uploadedBy==='caregiver'?'Uploaded by caregiver':'Uploaded by patient'}{r.notes?` — ${r.notes}`:''}</p></div>
     <a className="quiet" href={r.fileData} target="_blank" rel="noreferrer" download={r.fileName||r.name}><Eye size={15}/> View</a>
     {onDelete&&<button className="quiet" onClick={()=>onDelete(r.id)}><Trash2 size={15}/> Delete</button>}
    </div>;
   })}
  </>}
 </section>;
}
