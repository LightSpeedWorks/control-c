// no-new-test.js

  'use strict';

  try {
    var ControlC = require('../lib/control-c');
  } catch (e) {
    console.log(e.stack);
    var ControlC = require('control-c');
  }

  console.log('press control-c in 10 seconds.');
  setTimeout(function () {}, 10 * 1000);
