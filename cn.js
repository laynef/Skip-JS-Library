/**
* @Author: Layne Faler <laynefaler>
* @Date:   09-09-2016
* @Email:  laynefaler@gmail.com
* @Last modified by:   laynefaler
* @Last modified time: 10-06-2016
*/

/*

****** ARRAYS ********

pre-made functions
To chain with others

**********************

*/

window._ = {};

module.exports = {

  // cnPopOff

  cnPopOff : function(array) {
    array.pop();
    return array;
  },

  // cnShiftOff

  cnShiftOff : function(array) {
    array.shift();
    return array;
  },

  // cnSample

  cnSample : function(array) {
    return array[Math.floor(Math.random() * array.length)];
  },

  // cnForEach

  cnForEach : function(array, callback, indexs) {
    var call = arguments[1], args;
    if (arguments.length > 2 && arguments[2] !== undefined) {
      args = Array.from(arguments).slice(2);
    }


    if (array.constructor !== Object) {
      for (var i = 0; i < array.length; i++) {
        if (args === undefined) {
          call(array[i], i, array);
        } else if (args.includes(i)) {
          call(array[i], i, array);
        }
      }
    } else {
      for (var i in array) {
        if (args === undefined) {
          call(array[i], i, array);
        } else if (args.includes(i)) {
          call(array[i], i, array);
        }
      }
    }

  },

  // cnRightForEach

  cnRightForEach : function(array, callback, indexs) {
    var call = arguments[1], args;
    if (arguments.length > 2 && arguments[2] !== undefined) {
      args = Array.from(arguments).slice(2);
    }

    for (var i = array.length-1; i >= 0; i--) {
      if (args.length === 0) {
        call(array[i], i, array);
      } else if (args.includes(i)) {
        call(array[i], i, array);
      }
    }
  },

  // cnMap

  cnMap : function(array, callback,indexs) {
      var arr = [], others;
      var calls = arguments[1];

      if (arguments.length > 2) { others = Array.from(arguments).slice(2); }
      _.cnForEach(array, function(e,i,a) {
        arr.push(calls(e,i,a));
      }, others);
      return arr;
  },

  // cnFilter

  cnFilter : function(array, callback,indexs) {
    var arr = [], others;
    var calls = arguments[1];
    if (arguments.length > 2) { others = Array.from(arguments).slice(2); }
    _.cnForEach(array, function(e,i,a) {
      if (calls(e,i,a)) {
        arr.push(e);
      }
    }, others);
    return arr;
  },

  // cnClip

  cnClip : function(array, indexs) {
    var indie = Array.from(arguments);
    return _.cnFilter(array, function(e,i,a) {
      return !indie.includes(i);
    });
  },

  // cnReject

  cnReject : function(array, args) {
    var call = arguments[1], others;
    if (arguments.length > 2 && arguments[2] !== undefined) {
      others = Array.from(arguments).slice(2);
    }
    return _.cnFilter(array, function(x) {
      return !calls(x);
    }, others);
  },

  // cnFlatten

  cnFlatten : function(array) {
    var res = [];
    _.cnForEach(array, function(e,i,a) {
      if (!Array.isArray(e)) {
        res.push(e);
      } else {
        // REVIEW: recursion
        res = res.concat(cnFlatten(e));
      }
    });
    return res;
  },

  // cnMax

  cnMax : function(array) {
    return array.sort(function(a,b) { return a-b; })[array.length-1];
  },

  // cnMin

  cnMin : function(array) {
    return array.sort(function(a,b) { return a-b; })[0];
  },

  // cnLastIndexOf

  cnLastIndexOf : function(array, num) {
    for (var i = array.length-1; i >= 0; i--) {
      if (array[i] === num) {
        return i;
      }
    }
    return -1;
  },

  // cnRightReduce

  cnRightReduce : function(array, call, initial, indexs) {
    init = arguments[2] === undefined ? array.pop() : arguments[2];
    var call = arguments[1], others;
    if (arguments.length > 3 && arguments[3] !== undefined) {
      others = Array.from(arguments).slice(3);
    }
    _.cnRightForEach(array, (function(e,i,a) {
      init = call(init, e, i, a);
    }, others));
    return init;
  },

  // cnReduce

  cnReduce : function(array, call, initial, indexs) {
    var init = arguments[2] === undefined ? array.pop() : arguments[2];
    var call = arguments[1], others;
    if (arguments.length > 3 && arguments[3] !== undefined) {
      others = Array.from(arguments).slice(3);
    }
    _.cnForEach(array, function(e,i,a) {
      init = call(init, e, i, a);
    }, others);
    return init;
  },

  // cnCheck

  cnCheck : function(array, calls, index) {
    var call = arguments[1], others;
    if (arguments.length > 2 && arguments[2] !== undefined) {
      others = Array.from(arguments).slice(2);
    }
    var bool = true;

    _.cnForEach(array, function(e,i,a) {
      if (!call(e, i, a)) {
        bool = false;
      }
    }, others);

    return bool;
  },

  // cnFind

  cnFind : function(array, callback, time) {
    var inn = time === undefined ? 1 : time;
    var ph = 0;

    var call = arguments[1], others;
    if (arguments.length > 3 && arguments[3] !== undefined) {
      others = Array.from(arguments).slice(3);
    }

    _.cnForEach(array, function(e,i,a) {
      if (callback(e,i,a)) {
        ph++;
        if (ph === inn) {
          return e;
        }
      }
    }, others);

    return undefined;
  },

  // cnUniq

  cnUniq : function(array) {
    var call = arguments[1], others;
    if (arguments.length > 2 && arguments[2] !== undefined) {
      others = Array.from(arguments).slice(2);
    }
    return _.cnFilter(array, function(ele, i, arr) {
      return arr.indexOf(ele) === i;
    }, others);
  },

  // cnSortedUniq

  cnSortedUniq : function(array) {
    var call = arguments[1], others;
    array = array.sort();
    if (arguments.length > 2 && arguments[2] !== undefined) {
      others = Array.from(arguments).slice(2);
    }
    return _.cnFilter(array, function(e,i,a) {
      return a.indexOf(e) === i;
    }, others);
  },

  // cnChunk

  cnChunk : function(array, num) {
    num = num === undefined ? 1 : num;
    if (num < 0 || num > array.length) {
      return console.error('invalid parameter for cnChunk');
    }

    var origin = [];
    for (var i = 0; i < array.length; i+=num) {
      var arr = [];
      for (var j = i; j < num+i; j++) {
        arr.push(array[j]);
      }
      origin.push(arr);
    }
    return origin;
  },

  // cnConcatMap

  cnConcatMap : function(array, calls, index) {
    var arr = _.cnMap(arguments);
    return arr.concat(array);
  },

  // cnAtIndex

  cnAtIndex : function(array, inn) {
    if (inn === undefined) { inn = 0; }
    if (inn > array.length || inn < -array.length) {
      return console.error('invalid index atIndex');
    }
    if (inn > 0) {
      return array[inn];
    } else {
      var zombie = array.length + inn;
      return array[zombie];
    }
  },

  // cnIntersection

  cnIntersection : function(array, calls, indexs) {
    var call = arguments[1], others;
    if (arguments.length > 2 && arguments[2] !== undefined) {
      others = Array.from(arguments).slice(2);
    }
    if (calls === undefined) { calls = function(x) { return x; } }
    return _.cnReduce(array, function(acc, item) {
      return _.cnFilter(acc, function(e) {
        return item.indexOf(e) > -1;
      });
    }, [], others);
  },

  // cnDifference

  cnDifference : function(array, calls, indexs) {
    var call = arguments[1], others;
    if (arguments.length > 2 && arguments[2] !== undefined) {
      others = Array.from(arguments).slice(2);
    }
    if (calls === undefined) { calls = function(x) { return x; } }
    return _.cnReduce(array, function(acc, item) {
      return _.cnFilter(acc, function(e) {
        return item.indexOf(e) === -1;
      });
    }, [], others);
  },

  // cnUnion

  cnUnion : function(array, calls, indexs) {
    var call = arguments[1], others;
    if (arguments.length > 2 && arguments[2] !== undefined) {
      others = Array.from(arguments).slice(2);
    }
    if (calls === undefined) { calls = function(x) { return x; } }
    return _.cnReduce(array, function(acc, item) {
       _.cnForEach(item, function(e) {
        if (acc.indexOf(e) === -1) {
          acc.push(e);
        }
      });
      return acc;
    }, [], others);
  },

  // cnRandomShuffle

  cnRandomShuffle : function(array) {
    return array.sort(function(a,b) {
      return Math.floor(Math.random(a)) - Math.floor(Math.random(b));
    });
  },

  // shuffle

  cnShuffle : function(array, num) {
    var arr = [];
    if ((num > array.length-1) || (-array.length+1 > num)) {
      return console.error('invalid number');
    }
    if (num < 0) {
      var newer = array.length - (num * -1);
      for (var i = newer; i < array.length; i++) {
        arr.push(array[i]);
      }
      for (var i = 0; i < newer; i++) {
        arr.push(array[i]);
      }
      return arr;
    } else if (num === 0) {
      return array;
    } else {
      for (var i = num; i < array.length; i++) {
        arr.push(array[i]);
      }
      for (var i = 0; i < num; i++) {
        arr.push(array[i]);
      }
      return arr;
    }
  },

  // REVIEW: rest
  // cnFlatMap

  cnFlatMap : function(array, args) {
    var rest = arguments.slice(1);
    return _.cnMap(_.cnFlatten(array), rest);
  },

  // REVIEW: rest
  // cnCompact

  cnCompact : function(array, indexs) {
    var rest = arguments.slice(1);
    return _.cnFilter(array, function(x) { return Number(x) !== 0; }, rest);
  },

  // cnPluck

  cnPluck : function(array, key, indexs) {
    var others;
    if (arguments.length > 2) {
      others = Array.from(arguments).slice(2);
    }
    return _.cnMap(array, function(x) {
      return x[key];
    }, others);
  },


  // cnZip
  // REVIEW: adding indexs (others)

  cnZip : function(array, index) {
    var others, arrays = arguments[0];
    if (arguments.length > 1 && arguments[1] !== undefined) {
      others = Array.from(arguments).slice(2);
    }
    return _.cnMap(arrays[0], function(_, i) {
      return _.cnMap(arrays, function(e) {
        return e[i];
      });
    });
  },

  // cnUnZip
  // REVIEW: adding indexs (others)

  cnUnZip : function(array, index) {
    var others;
    if (arguments.length > 1 && arguments[1] !== undefined) {
      others = Array.from(arguments).slice(2);
    }
    return _.cnMap(array, function(e,i,a) {
      return _.cnMap(e, function(x,y,z) {
        return a[y][i];
      });
    });
  }

};
