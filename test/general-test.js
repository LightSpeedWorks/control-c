// general-test.js

  'use strict';

  try {
    var ControlC = require('../lib/control-c');
  } catch (e) {
    console.log(e.stack);
    var ControlC = require('control-c');
  }

  var c1 = new ControlC(
    function () { console.log('c1: 1 time'); },
    function () { console.log('c1: 2 times');
                  this.remove(); },
    function () { console.log('c1: 3 times'); },
    function () { console.log('c1: 4 times or more -> exit');
                  process.nextTick(process.exit); }
  );

  var c2 = ControlC(
    function () { console.log('c2: 1 time'); },
    function () { console.log('c2: 2 times'); },
    function () { console.log('c2: 3 times');
                  this.remove(); },
    function () { console.log('c2: 4 times or more -> exit');
                  process.nextTick(process.exit); }
  );

  var c3 = ControlC.new(
    function () { console.log('c3: 1 time');
                  c1.add(); c2.add(); },
    function () { console.log('c3: 2 times'); },
    function () { console.log('c3: 3 times'); },
    function () { console.log('c3: 4 times or more -> exit');
                  process.nextTick(process.exit); }
  );

  console.log('ControlC.interval =', ControlC.interval);
  ControlC.interval = 600;
  console.log('ControlC.interval =', ControlC.interval);
  ControlC.interval = 0;
  console.log('ControlC.interval =', ControlC.interval);
  try { ControlC.interval = 'string';}
  catch(e) { console.log(e + ''); }
  try { ControlC.interval = NaN;}
  catch(e) { console.log(e + ''); }
  try { ControlC.interval = Infinity; }
  catch(e) { console.log(e + ''); }
  console.log('ControlC.interval =', ControlC.interval);

  console.log('key in control-c in 20 seconds.');
  setTimeout(function () {}, 20 * 1000);
