import {safeStorage} from './browserStorage';
import {validateServerOrigin} from '../shared/server-origin';
import {Capacitor} from '@capacitor/core';
import {Geolocation} from '@capacitor/geolocation';
import {LocalNotifications} from '@capacitor/local-notifications';
export const isNative=Capacitor.isNativePlatform();
export const validateServer=value=>validateServerOrigin(value,import.meta.env.VITE_ANDROID_DEV==='true');
export const serverURL=()=>{if(!isNative)return import.meta.env.VITE_API_URL||'';const value=safeStorage.getItem('smriti-server')||import.meta.env.VITE_API_URL||'';try{return validateServer(value);}catch{return '';}};
let nextWatch=0;const watches=new Map();
export const gps=isNative?{watchPosition(success,error,options){const key=++nextWatch;watches.set(key,null);Geolocation.requestPermissions().then(()=>Geolocation.watchPosition(options,(position,err)=>err?error(err):position&&success(position))).then(id=>{if(watches.has(key))watches.set(key,id);else Geolocation.clearWatch({id});}).catch(error);return key;},clearWatch(key){const id=watches.get(key);watches.delete(key);if(id)Geolocation.clearWatch({id}).catch(()=>{});}}:navigator.geolocation;
const notificationId=id=>{let n=0;for(const c of id)n=(n*31+c.charCodeAt(0))|0;return (n&0x7fffffff)||1;};
export async function syncNativeReminders(reminders,request=false){if(!isNative)return;const permission=request?await LocalNotifications.requestPermissions():await LocalNotifications.checkPermissions();if(permission.display!=='granted'){if(request)throw new Error('Notification permission was not granted');return;}const pending=await LocalNotifications.getPending();if(pending.notifications.length)await LocalNotifications.cancel({notifications:pending.notifications.map(x=>({id:x.id}))});const notifications=reminders.filter(r=>!r.done&&r.due>Date.now()+1000).map(r=>({id:notificationId(r.id),title:'SmritiSaathi',body:'A reminder is due. Open your companion.',schedule:{at:new Date(r.due)},extra:{reminderId:r.id}}));if(notifications.length)await LocalNotifications.schedule({notifications});}
