// control-c.js

this.ControlC = function () {
  'use strict';

  var extend = require('base-class-extend').extend;

  // class variables
  var instances = [];
  var DEFAULT_INTERVAL = 400;
  var interval = DEFAULT_INTERVAL;

  var ControlC = extend('ControlC', {
    constructor: function ControlC() {
      if (!(this instanceof ControlC))
        return ControlC.create.apply(ControlC, arguments);

      var handlers = arguments;

      if (handlers.length === 0)
        throw new RangeError('no handlers specified');

      for (var i = 0, n = handlers.length; i < n; ++i)
        if (typeof handlers[i] !== 'function')
          throw new RangeError('handlers must be a function');

      this.addPrototype({
        fire: function fire(index) {
          if (index >= handlers.length)
            index = handlers.length - 1;

          handlers[index].call(this);
        },
      });

      this.add();
    },
    add: function add() {
      if (instances.indexOf(this) >= 0) return;
      instances.push(this);
      if (instances.length === 1) start();
    },
    remove: function remove() {
      var index = instances.indexOf(this);
      if (index < 0) return;
      instances.splice(index, 1);
      if (instances.length === 0) stop();
    },
  }, {
    get interval() { return interval; },
    set interval(val) {
      if (typeof val !== 'number' || !isFinite(val))
        throw new RangeError('interval must be a number: ' + val);

      // interval range: between 0.2 and 2 sec
      if (val < 200 || val > 2000)
        val = DEFAULT_INTERVAL;

      interval = val; },
  });

  var timer = null;
  var count = -1;
  //var startTime = Date.now();

  function sigint() {
    //console.log(Date.now() - startTime);
    //startTime = Date.now();
    if (timer) clearTimeout(timer);
    timer = setTimeout(timeout, interval);

    ++count;
  }

  function timeout() {
    fire(count);

    timer = null;
    count = -1;
  }

  function fire(count) {
    var objects = instances.slice();

    for (var i = 0, n = objects.length; i < n; ++i)
      objects[i].fire(count);
  }

  function start() {
    process.on('SIGINT', sigint);
  }

  function stop() {
    process.removeListener('SIGINT', sigint);
  }

  ControlC.ControlC = ControlC;

  if (typeof module === 'object' && module && module.exports)
    module.exports = ControlC;

  return ControlC;

}();
