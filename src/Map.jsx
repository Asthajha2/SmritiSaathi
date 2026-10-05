import {useEffect,useRef} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const patientIcon=L.divIcon({className:'smriti-patient-marker',html:'<div class="patient-marker-pulse"><span>➤</span></div>',iconSize:[42,42],iconAnchor:[21,21]});

export default function Map({position,places=[],destination,route,journeyActive,patientLabel,destinationLabel,emptyText}){
 const ref=useRef(null), mapRef=useRef(null), patientRef=useRef(null), routeRef=useRef(null), destinationRef=useRef(null), initialized=useRef(false), lastPos=useRef(null);
 // Create the Leaflet map once, as soon as we have any coordinate to center on.
 // IMPORTANT: no cleanup here — this must NOT tear the map down every time
 // `position` changes (which happens every few seconds during live tracking).
 // Recreating the map on every GPS tick was why live journey / live location
 // looked broken (constant flicker, lost zoom, lost route and markers).
 useEffect(()=>{
  if(!ref.current||initialized.current)return;
  const center=position||destination||(places.length?places[0]:null); if(!center)return;
  const map=L.map(ref.current).setView([center.lat,center.lng],14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors',maxZoom:19}).addTo(map);
  mapRef.current=map; initialized.current=true;
 },[position,destination,places]);
 // Tear the map down only when this component truly unmounts (e.g. leaving the page).
 useEffect(()=>()=>{
  if(mapRef.current){mapRef.current.remove();mapRef.current=null;}
  initialized.current=false;patientRef.current=null;routeRef.current=null;destinationRef.current=null;
 },[]);
 useEffect(()=>{
  const map=mapRef.current;if(!map)return;
  if(position){
   const label=patientLabel||(journeyActive?'Patient — live location':'Patient — current location');
   if(!patientRef.current)patientRef.current=L.marker([position.lat,position.lng],{icon:patientIcon,zIndexOffset:1000}).addTo(map).bindTooltip(label,{direction:'top'});
   else{patientRef.current.setLatLng([position.lat,position.lng]);patientRef.current.setTooltipContent(label);}
   const el=patientRef.current.getElement()?.querySelector('.patient-marker-pulse span');
   if(el&&lastPos.current){const a=lastPos.current,b=position;const y=Math.sin((b.lng-a.lng)*Math.PI/180)*Math.cos(b.lat*Math.PI/180);const x=Math.cos(a.lat*Math.PI/180)*Math.sin(b.lat*Math.PI/180)-Math.sin(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.cos((b.lng-a.lng)*Math.PI/180);const bearing=(Math.atan2(y,x)*180/Math.PI+360)%360;el.style.transform=`rotate(${bearing-45}deg)`;}
   lastPos.current=position;
  }
 },[position,journeyActive,patientLabel]);
 useEffect(()=>{
  const map=mapRef.current;if(!map)return;
  if(destination){const dLabel=destinationLabel||`Destination: ${destination.name}`;if(!destinationRef.current)destinationRef.current=L.marker([destination.lat,destination.lng]).addTo(map).bindTooltip(dLabel,{permanent:true,direction:'top'});else{destinationRef.current.setLatLng([destination.lat,destination.lng]);destinationRef.current.setTooltipContent(dLabel);}}
  if(route?.geometry?.coordinates?.length){const latlngs=route.geometry.coordinates.map(([lng,lat])=>[lat,lng]);if(routeRef.current)routeRef.current.remove();routeRef.current=L.layerGroup([L.polyline(latlngs,{color:'#3158d6',weight:8,opacity:.9,lineCap:'round',lineJoin:'round'}),L.polyline(latlngs,{color:'#ffffff',weight:3,opacity:.8,lineCap:'round',lineJoin:'round'})]).addTo(map);map.fitBounds(L.latLngBounds(latlngs),{padding:[40,40]});}
 },[route,destination,destinationLabel]);
 const placeLayers=useRef([]);
 useEffect(()=>{const map=mapRef.current;if(!map)return;placeLayers.current.forEach(l=>map.removeLayer(l));placeLayers.current=places.map(place=>L.circle([place.lat,place.lng],{radius:place.radius||50,color:'#165c50'}).addTo(map).bindTooltip(place.name));},[places]);
 useEffect(()=>{const map=mapRef.current;if(map&&position&&journeyActive)map.panTo([position.lat,position.lng],{animate:true,duration:.35});},[position,journeyActive]);
 return <div className="map" ref={ref} aria-label="OpenStreetMap live journey map">{!position&&!destination&&!places.length&&<p>{emptyText||'Choose a destination to see the journey map.'}</p>}</div>;
}
