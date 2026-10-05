import test from 'node:test';
import assert from 'node:assert/strict';
import {nextDifficulty,distanceMetres,outsideZone,trend,gameIds} from '../shared/logic.js';
test('difficulty respects minimum evidence, speed and limits',()=>{assert.equal(nextDifficulty([],3),3);assert.equal(nextDifficulty(Array(3).fill({accuracy:1,latency:2000}),3),4);assert.equal(nextDifficulty(Array(3).fill({accuracy:1,latency:20000}),3),3);assert.equal(nextDifficulty(Array(3).fill({accuracy:0,latency:2000}),1),1);assert.equal(nextDifficulty(Array(3).fill({accuracy:1,latency:2000}),5),5);assert.equal(gameIds.length,10);});
test('geofence accounts for GPS uncertainty',()=>{const home={lat:0,lng:0,radius:100};assert.equal(distanceMetres(home,home),0);assert.ok(Math.abs(distanceMetres(home,{lat:.001,lng:0})-111.19)<1);assert.equal(outsideZone({lat:.001,lng:0,accuracy:20},home),false);assert.equal(outsideZone({lat:.002,lng:0,accuracy:20},home),true);});
test('trend requires six observations',()=>{assert.equal(trend([]),null);assert.equal(trend([1,1,1,.5,.5,.5].map((accuracy,at)=>({accuracy,at}))),-50);});
