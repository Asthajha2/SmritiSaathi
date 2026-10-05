export function validateServerOrigin(value,allowLocal=false){
 const url=new URL(value);
 if(url.username||url.password||url.search||url.hash||url.pathname!=='/')throw new Error('Enter only the server origin, without a path or credentials.');
 const local=allowLocal&&url.protocol==='http:'&&['localhost','127.0.0.1','10.0.2.2'].includes(url.hostname);
 if(url.protocol!=='https:'&&!local)throw new Error('Use an HTTPS server address.');
 return url.origin;
}
