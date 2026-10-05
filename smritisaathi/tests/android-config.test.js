import test from 'node:test';
import assert from 'node:assert/strict';
import {validateServerOrigin} from '../shared/server-origin.js';
test('Android service addresses enforce HTTPS and reject embedded credentials',()=>{
 assert.equal(validateServerOrigin('https://care.example/'),'https://care.example');
 for(const value of ['http://care.example','https://user:secret@care.example','https://care.example/api','https://care.example/?secret=x','javascript:alert(1)'])assert.throws(()=>validateServerOrigin(value));
 assert.throws(()=>validateServerOrigin('http://localhost:3001'));
 assert.equal(validateServerOrigin('http://localhost:3001',true),'http://localhost:3001');
 assert.equal(validateServerOrigin('http://10.0.2.2:3001',true),'http://10.0.2.2:3001');
 assert.throws(()=>validateServerOrigin('http://192.168.1.5:3001',true));
});
