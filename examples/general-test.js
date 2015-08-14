// general-test.js

  'use strict';

  try {
    var ControlC = require('../control-c');
  } catch (e) {
    console.log(e.stack);
    var ControlC = require('control-c');
  }

  var c1 = new ControlC(
    function () { console.log('c1: 1 time'); },
    function () { console.log('c1: 2 times -> remove');
                  this.remove(); },
    function () { console.log('c1: 3 times'); },
    function () { console.log('c1: 4 times or more -> exit');
                  process.nextTick(process.exit); }
  );

  var c2 = ControlC(
    function () { console.log('c2: 1 time'); },
    function () { console.log('c2: 2 times'); },
    function () { console.log('c2: 3 times -> remove');
                  this.remove(); },
    function () { console.log('c2: 4 times or more -> exit');
                  process.nextTick(process.exit); }
  );

  var c3 = ControlC.create(
    function () { console.log('c3: 1 time -> add c1 and c2');
                  c1.add(); c2.add(); },
    function () { console.log('c3: 2 times'); },
    function () { console.log('c3: 3 times'); },
    function () { console.log('c3: 4 times or more -> exit');
                  process.nextTick(process.exit); }
  );

  console.log('ControlC.interval =', ControlC.interval, ControlC.getInterval());
  ControlC.setInterval(600);
  console.log('ControlC.interval =', ControlC.interval, ControlC.getInterval());
  ControlC.setInterval(0);
  console.log('ControlC.interval =', ControlC.interval, ControlC.getInterval());
  try { ControlC.setInterval('string');}
  catch(e) { console.log(e + ''); }
  try { ControlC.setInterval(NaN);}
  catch(e) { console.log(e + ''); }
  try { ControlC.setInterval(Infinity); }
  catch(e) { console.log(e + ''); }
  console.log('ControlC.interval =', ControlC.interval, ControlC.getInterval());
  ControlC.setInterval(400);
  console.log('ControlC.interval =', ControlC.interval, ControlC.getInterval());

  console.log('press control-c in 30 seconds.');
  setTimeout(function () {}, 30 * 1000);
