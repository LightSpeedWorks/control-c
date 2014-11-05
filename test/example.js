// example.js

'use strict';

try { var ControlC = require('../lib/control-c'); }
catch (e) {
  console.log(e.stack);
  var ControlC = require('control-c');
}

var singleCount = 0;
var doubleCount = 0;

var c1 = new ControlC(
  function singleControlC() { console.log('Single:', ++singleCount); },
  function doubleControlC() { console.log('Double:', ++doubleCount); },
  function tripleControlC() { console.log('Reset'); singleCount = doubleCount = 0; },
  function quadrupleControlC() { console.log('Exit'); process.nextTick(process.exit); });

console.log('press control-c in 30 seconds.');
setTimeout(function () {}, 30000);
