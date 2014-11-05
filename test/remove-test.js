// remove-test.js

  'use strict';

  try {
    var ControlC = require('../lib/control-c');
  } catch (e) {
    console.log(e.stack);
    var ControlC = require('control-c');
  }

  var c1 = new ControlC(
    function () { console.log('c1: 1 time'); },
    function () { console.log('c1: 2 times or more -> remove');
                  this.remove(); }
  );

  var c2 = ControlC(
    function () { console.log('c2: 1 time'); },
    function () { console.log('c2: 2 times'); },
    function () { console.log('c2: 3 times or more -> remove');
                  this.remove(); }
  );

  console.log('press control-c in 20 seconds.');
  setTimeout(function () {}, 20 * 1000);
