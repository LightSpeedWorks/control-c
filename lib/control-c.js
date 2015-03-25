// control-c.js

  'use strict';

  var extend = require('base-class-extend').extend;

  var slice = Array.prototype.slice;

  // class variables
  var instances = [];
  var interval = 500;

  var ControlC = extend.call(Object, {
    constructor: function ControlC() {
      if (!(this instanceof ControlC))
        return ControlC.new.apply(ControlC, arguments);

      var handlers = slice.call(arguments);

      if (handlers.length === 0)
        throw new RangeError('no handlers specified');

      for (var i = 0, n = handlers.length; i < n; ++i)
        if (typeof handlers[i] !== 'function')
          throw new RangeError('handlers must be a function');

      this.private({
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
        val = 500;

      interval = val; },
  });

  var timer = null;
  var count = -1;

  function sigint() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(timeout, interval);

    ++count;

    function timeout() {
      var objects = slice.call(instances);

      for (var i = 0, n = objects.length; i < n; ++i)
        objects[i].fire(count);

      timer = null;
      count = -1;
    }
  }

  function start() {
    process.on('SIGINT', sigint);
  }

  function stop() {
    process.removeListener('SIGINT', sigint);
  }

  module.exports = exports = ControlC;
