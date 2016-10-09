/**
* @Author: Layne Faler <laynefaler>
* @Date:   09-09-2016
* @Email:  laynefaler@gmail.com
* @Last modified by:   laynefaler
* @Last modified time: 10-09-2016
*/

/*

****** ARRAYS ********

pre-made functions
To chain with others

**********************

*/

(function() {

  // cnClear

  Object.prototype.cnClear = function() {
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

  // cnPopOff

  Array.prototype.cnPopOff = function() {
    this.pop();
    return this;
  };

  // cnShiftOff

  Array.prototype.cnShiftOff = function() {
    this.shift();
    return this;
  };

  // cnSample

  Array.prototype.cnSample = function() {
    return this[Math.floor(Math.random() * this.length)];
  };

  // cnPush

  Array.prototype.cnPush = function(item, index) {
    index = index === undefined ? this.length : (index < 0 || index > this.length) ? -1 : index;
    if (index === -1) { return console.error('invalid index'); }
    if (index === this.length) {
      this[this.length] = item;
      return this;
    } else {
      var temp = this;
      var front = temp.splice(0, index-1);
      var end = temp.splice(0);

      front.push(item);
      for (var i = 0; i < end.length; i++) {
        front.push(end[i]);
      }
      return front;
    }
  };

  // cnForEach

  Object.prototype.cnForEach = function(callback, indexs) {
    var call = arguments[0], args;
    if (arguments.length > 1 && arguments[1] !== undefined) {
      args = Array.from(arguments).slice(1);
    }


    if (this.constructor !== Object) {
      for (var i = 0; i < this.length; i++) {
        if (args === undefined) {
          call(this[i], i, this);
        } else if (args.includes(i)) {
          call(this[i], i, this);
        }
      }
    } else {
      for (var i in this) {
        if (args === undefined) {
          call(this[i], i, this);
        } else if (args.includes(i)) {
          call(this[i], i, this);
        }
      }
    }

  };

  // cnRightForEach

  Array.prototype.cnRightForEach = function(callback, indexs) {
    var call = arguments[0], args;
    if (arguments.length > 1 && arguments[1] !== undefined) {
      args = Array.from(arguments).slice(1);
    }

    for (var i = this.length-1; i >= 0; i--) {
      if (args.length === 0) {
        call(this[i], i, this);
      } else if (args.includes(i)) {
        call(this[i], i, this);
      }
    }
  };

  // cnMap

  Object.prototype.cnMap = function(callback,indexs) {
      var arr = [], others;
      var calls = arguments[0];

      if (arguments.length > 1) { others = Array.from(arguments).slice(1); }
      this.cnForEach(function(e,i,a) {
        arr.push(calls(e,i,a));
      }, others);
      return arr;
  };

  // cnFilter

  Object.prototype.cnFilter = function(callback,indexs) {
    var arr = [], others;
    var calls = arguments[0];
    if (arguments.length > 1) { others = Array.from(arguments).slice(1); }
    this.cnForEach(function(e,i,a) {
      if (calls(e,i,a)) {
        arr.push(e);
      }
    }, others);
    return arr;
  };

  // cnClip

  Object.prototype.cnClip = function(indexs) {
    var indie = Array.from(arguments);
    return this.cnFilter(function(e,i,a) {
      return !indie.includes(i);
    });
  };

  // cnReject

  Object.prototype.cnReject = function(args) {
    var call = arguments[0], others;
    if (arguments.length > 1 && arguments[1] !== undefined) {
      others = Array.from(arguments).slice(1);
    }
    return this.cnFilter(function(x) {
      return !calls(x);
    }, others);
  };

  // cnFlatten

  Array.prototype.cnFlatten = function() {
    var res = [];
    this.cnForEach(function(e,i,a) {
      if (!Array.isArray(e)) {
        res.push(e);
      } else {
        res = res.concat(cnFlatten(e));
      }
    });
    return res;
  };

  // cnMax

  Array.prototype.cnMax = function() {
    return this.sort(function(a,b) { return a-b; })[this.length-1];
  };

  // cnMin

  Array.prototype.cnMin = function() {
    return this.sort(function(a,b) { return a-b; })[0];
  };

  // cnLastIndexOf

  Array.prototype.cnLastIndexOf = function(num) {
    for (var i = this.length-1; i >= 0; i--) {
      if (this[i] === num) {
        return i;
      }
    }
    return -1;
  };

  // cnRightReduce

  Array.prototype.cnRightReduce = function(call, initial, indexs) {
    init = arguments[1] === undefined ? this.pop() : arguments[1];
    var call = arguments[0], others;
    if (arguments.length > 2 && arguments[2] !== undefined) {
      others = Array.from(arguments).slice(2);
    }
    this.cnRightForEach(function(e,i,a) {
      init = call(init, e, i, a);
    }, others);
    return init;
  };

  // cnReduce

  Object.prototype.cnReduce = function(call, initial, indexs) {
    var init = arguments[1] === undefined ? this.pop() : arguments[1];
    var call = arguments[0], others;
    if (arguments.length > 2 && arguments[2] !== undefined) {
      others = Array.from(arguments).slice(2);
    }
    this.cnForEach(function(e,i,a) {
      init = call(init, e, i, a);
    }, others);
    return init;
  };

  // cnCheck

  Object.prototype.cnCheck = function(calls, index) {
    var call = arguments[0], others;
    if (arguments.length > 1 && arguments[1] !== undefined) {
      others = Array.from(arguments).slice(1);
    }
    var bool = true;

    this.cnForEach(function(e,i,a) {
      if (!call(e, i, a)) {
        bool = false;
      }
    }, others);

    return bool;
  };

  // cnFind

  Object.prototype.cnFind = function(callback, time) {
    var inn = time === undefined ? 1 : time;
    var ph = 0;

    var call = arguments[0], others;
    if (arguments.length > 2 && arguments[2] !== undefined) {
      others = Array.from(arguments).slice(2);
    }

    this.cnForEach(function(e,i,a) {
      if (callback(e,i,a)) {
        ph++;
        if (ph === inn) {
          return e;
        }
      }
    }, others);

    return undefined;
  };

  // cnUniq

  Object.prototype.cnUniq = function() {
    var call = arguments[0], others;
    if (arguments.length > 1 && arguments[1] !== undefined) {
      others = Array.from(arguments).slice(1);
    }
    return this.cnFilter(function(ele, i, arr) {
      return arr.indexOf(ele) === i;
    }, others);
  };

  // cnSortedUniq

  Array.prototype.cnSortedUniq = function() {
    var call = arguments[0], others;
    if (arguments.length > 1 && arguments[1] !== undefined) {
      others = Array.from(arguments).slice(1);
    }
    return this.sort().cnFilter(function(e,i,a) {
      return a.indexOf(e) === i;
    }, others);
  };

  // cnChunk

  Array.prototype.cnChunk = function(num) {
    num = num === undefined ? 1 : num;
    if (num < 0 || num > this.length) {
      return console.error('invalid parameter for cnChunk');
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

  // cnConcatMap

  Array.prototype.cnConcatMap = function(calls, index) {
    var arr = this.cnMap(arguments);
    return arr.concat(this);
  };

  // cnAtIndex

  Array.prototype.cnAtIndex = function(inn) {
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

  // cnIntersection

  Array.prototype.cnIntersection = function(calls, indexs) {
    var call = arguments[0], others;
    if (arguments.length > 1 && arguments[1] !== undefined) {
      others = Array.from(arguments).slice(1);
    }
    if (calls === undefined) { calls = function(x) { return x; } }
    return this.cnReduce(function(acc, item) {
      return acc.cnFilter(function(e) {
        return item.indexOf(e) > -1;
      });
    }, [], others);
  };

  // cnDifference

  Array.prototype.cnDifference = function(calls, indexs) {
    var call = arguments[0], others;
    if (arguments.length > 1 && arguments[1] !== undefined) {
      others = Array.from(arguments).slice(1);
    }
    if (calls === undefined) { calls = function(x) { return x; } }
    return this.cnReduce(function(acc, item) {
      return acc.cnFilter(function(e) {
        return item.indexOf(e) === -1;
      });
    }, [], others);
  };

  // cnUnion

  Array.prototype.cnUnion = function(calls, indexs) {
    var call = arguments[0], others;
    if (arguments.length > 1 && arguments[1] !== undefined) {
      others = Array.from(arguments).slice(1);
    }
    if (calls === undefined) { calls = function(x) { return x; } }
    return this.cnReduce(function(acc, item) {
       item.cnForEach(function(e) {
        if (acc.indexOf(e) === -1) {
          acc.push(e);
        }
      });
      return acc;
    }, [], others);
  };

  // cnRandomShuffle

  Array.prototype.cnRandomShuffle = function() {
    return this.sort(function(a,b) {
      return Math.floor(Math.random(a)) - Math.floor(Math.random(b));
    });
  };

  // shuffle

  Array.prototype.cnShuffle = function(num) {
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

  // cnFlatMap

  Array.prototype.cnFlatMap = function(args) {
    return this.cnFlatten().cnMap(arguments);
  };

  // cnCompact

  Object.prototype.cnCompact = function(indexs) {
    return this.cnFilter(function(x) { return Number(x) !== 0; }, arguments);
  };

  // cnPluck

  Object.prototype.cnPluck = function(key, indexs) {
    var others;
    if (arguments.length > 1) {
      others = Array.from(arguments).slice(1);
    }
    return this.cnMap(function(x) {
      return x[key];
    }, others);
  };


  // cnZip
  // REVIEW: adding indexs (others)

  Object.prototype.cnZip = function(index) {
    var others, arrays = this;
    if (arguments.length > 0 && arguments[0] !== undefined) {
      others = Array.from(arguments).slice(1);
    }
    return arrays[0].cnMap(function(_, i) {
      return arrays.cnMap(function(e) {
        return e[i];
      });
    });
  };

  // cnUnZip
  // REVIEW: adding indexs (others)

  Object.prototype.cnUnZip = function(index) {
    var others;
    if (arguments.length > 0 && arguments[0] !== undefined) {
      others = Array.from(arguments).slice(1);
    }
    return this.cnMap(function(e,i,a) {
      return e.cnMap(function(x,y,z) {
        return a[y][i];
      });
    });
  };

}());
