import {isNative,serverURL} from './native';
import NativeSetup from './NativeSetup';
import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './style.css';
class Boundary extends React.Component{state={error:null};static getDerivedStateFromError(error){console.error('SmritiSaathi render error:',error);return {error};}componentDidCatch(error,info){console.error('SmritiSaathi component stack:',info?.componentStack||'');}render(){if(this.state.error){const message=this.state.error?.message||String(this.state.error);return <main className="error-screen"><h1>SmritiSaathi could not open</h1><p>Something in the app failed while loading.</p><details><summary>Technical error</summary><pre>{message}</pre></details><div className="row wrap"><button onClick={()=>location.reload()}>Reload</button><button className="quiet" onClick={()=>{try{localStorage.clear();}catch{};location.reload();}}>Clear browser data & reload</button></div></main>}return this.props.children;}}
createRoot(document.getElementById('root')).render(<Boundary>{isNative&&!serverURL()?<NativeSetup/>:<App/>}</Boundary>);
if(!isNative&&import.meta.env.PROD&&'serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js').catch(console.error);
