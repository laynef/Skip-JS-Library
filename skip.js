/**
* @Author: Layne Faler <laynefaler>
* @Date:   09-09-2016
* @Email:  laynefaler@gmail.com
* @Last modified by:   laynefaler
* @Last modified time: 10-25-2016
*/

/*

****** ARRAYS ********

pre-made functions
To chain with others

**********************

*/



  // sClear

  Object.prototype.sClear = function() {
    switch (this.constructor) {
      case String:
        return '';
      case Object:
        return {};
      case Array:
        return [];
      case Number:
        return 0;
    }
  };

  // sPopOff

  Array.prototype.sPopOff = function() {
    this.pop();
    return this;
  };

  // sShiftOff

  Array.prototype.sShiftOff = function() {
    this.shift();
    return this;
  };

  // sSample

  Array.prototype.sSample = function() {
    return this[Math.floor(Math.random() * this.length)];
  };


  // sPush

  Array.prototype.sPush = function(item, index) {
    index = index === undefined ? this.length : (index < 0 || index > this.length) ? -1 : index;
    if (index === -1) { return console.error('invalid index'); }
    if (index === this.length) {
      this[this.length] = item;
      return this;
    } else {
      var temp = this;
      var front = temp.splice(0, index);
      var end = temp.splice(0);

      front.push(item);
      for (var i = 0; i < end.length; i++) {
        front.push(end[i]);
      }
      return front;
    }
  };

  // sForEach

  Object.prototype.sForEach = function(callback, indexs) {
    var call = arguments[0], args;
    if (arguments.length > 1 && arguments[1] !== undefined && arguments[1].constructor !== Array) {
      args = Array.from(arguments).slice(1);
    } else if (arguments.length > 1 && arguments[1] !== undefined && arguments[1].constructor === Array) {
      args = arguments[1];
    }

    if (this.constructor !== Object) {
      for (var i = 0; i < this.length; i++) {
        if (args === undefined) {
          call(this[i], i, this);
        } else if (!args.includes(i)) {
          call(this[i], i, this);
        }
      }
    } else {
      for (var i in this) {
        if (args === undefined) {
          call(this[i], i, this);
        } else if (!args.includes(i)) {
          call(this[i], i, this);
        }
      }
    }

  };

  // sRightForEach

  Array.prototype.sRightForEach = function(callback, indexs) {
    var call = arguments[0], args;
    if (arguments.length > 1 && arguments[1] !== undefined && arguments[1].constructor !== 'array') {
      args = Array.from(arguments).slice(1);
    } else if (arguments.length > 1 && arguments[1] !== undefined && arguments[1].constructor === 'array') {
      args = arguments[1];
    }

    for (var i = this.length-1; i >= 0; i--) {
      if (args.length === 0) {
        call(this[i], i, this);
      } else if (!args.includes(i)) {
        call(this[i], i, this);
      }
    }
  };

  // sMap

  Object.prototype.sMap = function(callback,indexs) {
      var arr = [], others;
      var calls = arguments[0];

      if (arguments.length > 1) { others = Array.from(arguments).slice(1); }
      this.sForEach(function(e,i,a) {
        arr.push(calls(e,i,a));
      }, others);
      return arr;
  };

  // sFilter

  Object.prototype.sFilter = function(callback,indexs) {
    var arr = [], others;
    var calls = arguments[0];
    if (arguments.length > 1) { others = Array.from(arguments).slice(1); }
    this.sForEach(function(e,i,a) {
      if (calls(e,i,a)) {
        arr.push(e);
      }
    }, others);
    return arr;
  };

  // sClip

  Object.prototype.sClip = function(indexs) {
    var indie = Array.from(arguments);
    return this.sFilter(function(e,i,a) {
      return !indie.includes(i);
    });
  };

  // sReject

  Object.prototype.sReject = function(args) {
    var call = arguments[0], others;
    if (arguments.length > 1 && arguments[1] !== undefined) {
      others = Array.from(arguments).slice(1);
    }
    return this.sFilter(function(x) {
      return !calls(x);
    }, others);
  };

  // sFlatten

  Array.prototype.sFlatten = function() {
    var res = [];
    this.sForEach(function(e,i,a) {
      if (!Array.isArray(e)) {
        res.push(e);
      } else {
        res = res.concat(sFlatten(e));
      }
    });
    return res;
  };

  // sMax

  Array.prototype.sMax = function() {
    return this.sort(function(a,b) { return a-b; })[this.length-1];
  };

  // sMin

  Array.prototype.sMin = function() {
    return this.sort(function(a,b) { return a-b; })[0];
  };

  // sLastIndexOf

  Array.prototype.sLastIndexOf = function(num) {
    for (var i = this.length-1; i >= 0; i--) {
      if (this[i] === num) {
        return i;
      }
    }
    return -1;
  };

  // sRightReduce

  Array.prototype.sRightReduce = function(call, initial, indexs) {
    init = arguments[1] === undefined ? this.pop() : arguments[1];
    var call = arguments[0], others;
    if (arguments.length > 2 && arguments[2] !== undefined) {
      others = Array.from(arguments).slice(2);
    }
    this.sRightForEach(function(e,i,a) {
      init = call(init, e, i, a);
    }, others);
    return init;
  };

  // sReduce

  Object.prototype.sReduce = function(call, initial, indexs) {
    var init = arguments[1] === undefined ? this.pop() : arguments[1];
    var call = arguments[0], others;
    if (arguments.length > 2 && arguments[2] !== undefined) {
      others = Array.from(arguments).slice(2);
    }
    this.sForEach(function(e,i,a) {
      init = call(init, e, i, a);
    }, others);
    return init;
  };

  // sCheck

  Object.prototype.sCheck = function(calls, index) {
    var call = arguments[0], others;
    if (arguments.length > 1 && arguments[1] !== undefined) {
      others = Array.from(arguments).slice(1);
    }
    var bool = true;

    this.sForEach(function(e,i,a) {
      if (!call(e, i, a)) {
        bool = false;
      }
    }, others);

    return bool;
  };

  // sFind

  Object.prototype.sFind = function(callback, time) {
    var inn = time === undefined ? 1 : time;
    var ph = 0;

    var call = arguments[0], others;
    if (arguments.length > 2 && arguments[2] !== undefined) {
      others = Array.from(arguments).slice(2);
    }

    this.sForEach(function(e,i,a) {
      if (callback(e,i,a)) {
        ph++;
        if (ph === inn) {
          return e;
        }
      }
    }, others);

    return undefined;
  };

  // sUniq

  Object.prototype.sUniq = function() {
    var call = arguments[0], others;
    if (arguments.length > 1 && arguments[1] !== undefined) {
      others = Array.from(arguments).slice(1);
    }
    return this.sFilter(function(ele, i, arr) {
      return arr.indexOf(ele) === i;
    }, others);
  };

  // sSortedUniq

  Array.prototype.sSortedUniq = function() {
    var call = arguments[0], others;
    if (arguments.length > 1 && arguments[1] !== undefined) {
      others = Array.from(arguments).slice(1);
    }
    return this.sort().sFilter(function(e,i,a) {
      return a.indexOf(e) === i;
    }, others);
  };

  // sChunk

  Array.prototype.sChunk = function(num) {
    num = num === undefined ? 1 : num;
    if (num < 0 || num > this.length) {
      return console.error('invalid parameter for sChunk');
    }

    var origin = [];
    for (var i = 0; i < this.length; i+=num) {
      var arr = [];
      for (var j = i; j < num+i; j++) {
        arr.push(this[j]);
      }
      origin.push(arr);
    }
    return origin;
  };

  // sConcatMap

  Array.prototype.sConcatMap = function(calls, index) {
    var arr = this.sMap(arguments);
    return arr.concat(this);
  };

  // sAtIndex

  Array.prototype.sAtIndex = function(inn) {
    if (inn === undefined) { inn = 0; }
    if (inn > this.length || inn < -this.length) {
      return console.error('invalid index atIndex');
    }
    if (inn > 0) {
      return this[inn];
    } else {
      var zombie = this.length + inn;
      return this[zombie];
    }
  };

  // sIntersection

  Array.prototype.sIntersection = function(calls, indexs) {
    var call = arguments[0], others;
    if (arguments.length > 1 && arguments[1] !== undefined) {
      others = Array.from(arguments).slice(1);
    }
    if (calls === undefined) { calls = function(x) { return x; } }
    return this.sReduce(function(acc, item) {
      return acc.sFilter(function(e) {
        return item.indexOf(e) > -1;
      });
    }, [], others);
  };

  // sDifference

  Array.prototype.sDifference = function(calls, indexs) {
    var call = arguments[0], others;
    if (arguments.length > 1 && arguments[1] !== undefined) {
      others = Array.from(arguments).slice(1);
    }
    if (calls === undefined) { calls = function(x) { return x; } }
    return this.sReduce(function(acc, item) {
      return acc.sFilter(function(e) {
        return item.indexOf(e) === -1;
      });
    }, [], others);
  };

  // sUnion

  Array.prototype.sUnion = function(calls, indexs) {
    var call = arguments[0], others;
    if (arguments.length > 1 && arguments[1] !== undefined) {
      others = Array.from(arguments).slice(1);
    }
    if (calls === undefined) { calls = function(x) { return x; } }
    return this.sReduce(function(acc, item) {
       item.sForEach(function(e) {
        if (acc.indexOf(e) === -1) {
          acc.push(e);
        }
      });
      return acc;
    }, [], others);
  };

  // sRandomShuffle

  Array.prototype.sRandomShuffle = function() {
    return this.sort(function(a,b) {
      return Math.floor(Math.random(a)) - Math.floor(Math.random(b));
    });
  };

  // shuffle

  Array.prototype.sShuffle = function(num) {
    var arr = [];
    if ((num > this.length-1) || (-this.length+1 > num)) {
      return console.error('invalid number');
    }
    if (num < 0) {
      var newer = this.length - (num * -1);
      for (var i = newer; i < this.length; i++) {
        arr.push(this[i]);
      }
      for (var i = 0; i < newer; i++) {
        arr.push(this[i]);
      }
      return arr;
    } else if (num === 0) {
      return this;
    } else {
      for (var i = num; i < this.length; i++) {
        arr.push(this[i]);
      }
      for (var i = 0; i < num; i++) {
        arr.push(this[i]);
      }
      return arr;
    }
  };

  // sFlatMap

  Array.prototype.sFlatMap = function(args) {
    return this.sFlatten().sMap(arguments);
  };

  // sCompact

  Object.prototype.sCompact = function(indexs) {
    return this.sFilter(function(x) { return Number(x) !== 0; }, arguments);
  };

  // sPluck

  Object.prototype.sPluck = function(key, indexs) {
    var others;
    if (arguments.length > 1) {
      others = Array.from(arguments).slice(1);
    }
    return this.sMap(function(x) {
      return x[key];
    }, others);
  };

  // sRemove

  Array.prototype.sRemove = function(index) {
    var res = [], others, first = arguments[0];
    if (first instanceof Array) {
      others = first;
    } else {
      others = Array.from(arguments);
    }
    this.sForEach(function(x) {
      res.push(x);
    }, others);
    return res;
  };

  // sZip

  Object.prototype.sZip = function(calls, index) {
    var others, arr = this;
    if (arguments.length > 1 && arguments[1] !== undefined) {
      others = Array.from(arguments).slice(1);
    }

    var arrays = arr.sMap(function(a) {
      return a.sRemove(others);
    });

    return arrays[0].sMap(function(_, i) {
      return arrays.sMap(function(e) {
        return e[i];
      });
    });
  };

  // sUnZip
  // only one index

  Object.prototype.sUnZip = function(index) {
    var others, arr = this;
    if (arguments.length > 0 && arguments[0] !== undefined) {
      others = Array.from(arguments);
    }
    return this.sMap(function(e,i,a) {
      return e.sMap(function(x,y,z) {
        return a[y][i];
      });
    });
  };
