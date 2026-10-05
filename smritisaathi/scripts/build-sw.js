import {readdirSync,readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const assets=readdirSync('dist/assets').map(x=>'/assets/'+x);
const version=createHash('sha256').update(assets.join('|')+readFileSync('public/sw-template.js')).digest('hex').slice(0,12);
const files=['/','/index.html','/manifest.webmanifest','/icon.svg','/icon-192.png','/icon-512.png',...assets];
writeFileSync('dist/sw.js',readFileSync('public/sw-template.js','utf8').replace('__VERSION__',version).replace('__ASSETS__',JSON.stringify(files)));
console.log('Offline shell generated:',files.length,'assets');
