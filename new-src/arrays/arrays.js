/**
* @Author: Layne Faler <laynefaler>
* @Date:   09-09-2016
* @Email:  laynefaler@gmail.com
* @Last modified by:   laynefaler
* @Last modified time: 09-16-2016
*/

/*

****** ARRAYS ********

pre-made functions
To chain with others

**********************

*/

// cnClear

Array.prototype.cnClear = function() {
  return [];
}

// cnPopOff

Array.prototype.cnPopOff = function() {
  this.pop();
  return this;
}

// cnShiftOff

Array.prototype.cnShiftOff = function() {
  this.shift();
  return this;
}

// cnSample

Array.prototype.cnSample = function() {
  return this[Math.random() * this.length];
}

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
}

// cnForEach

Array.prototype.cnForEach = function(callback, indexs) {
  var call = arguments[0], args;
  if (arguments.length > 1 && arguments[1] !== undefined) {
    args = Array.from(this).slice(1);
  }

  for (var i = 0; i < this.length; i++) {
    if (args === undefined) {
      call(this[i], i, this);
    } else if (args.includes(i)) {
      call(this[i], i, this);
    }
  }
}

// cnRightForEach

Array.prototype.cnRightForEach = function(callback, indexs) {
  var call = arguments[0], args;
  if (arguments.length > 1 && arguments[1] !== undefined) {
    args = Array.from(this).slice(1);
  }

  for (var i = this.length-1; i >= 0; i--) {
    if (args.length === 0) {
      call(this[i], i, this);
    } else if (args.includes(i)) {
      call(this[i], i, this);
    }
  }
}

// cnMap

Array.prototype.cnMap = function(callback,indexs) {
    var arr = [], others;
    var calls = arguments[0];
    if (arguments.length > 1) { others = Array.from(arguments).slice(1); }
    this.cnForEach(function(e,i,a) {
      arr.push(calls(e,i,a));
    }, others);
    return arr;
}

// cnFilter

Array.prototype.cnFilter = function(callback,indexs) {
  var arr = [], others;
  var calls = arguments[0];
  if (arguments.length > 1) { others = Array.from(arguments).slice(1); }
  this.cnForEach(function(e,i,a) {
    if (calls(e,i,a)) {
      arr.push(e);
    }
  }, others);
  return arr;
}

// cnClip

Array.prototype.cnClip = function(indexs) {
  var indie = Array.from(arguments);
  return this.cnFilter(function(e,i,a) {
    return !indie.includes(i);
  });
}

console.log([1,2,3,4,5].cnClip(1,2));

// cnReject

Array.prototype.cnReject = function(args) {
  var others = Array.from(arguments).slice(1);
  var calls = arguments[0];
  return this.cnFilter(function(x) {
    return !calls(x);
  }, others);
}

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
}

// cnMax

Array.prototype.cnMax = function() {
  return this.sort(function(a,b) { return a-b; })[this.length-1];
}

// cnMin

Array.prototype.cnMin = function() {
  return this.sort(function(a,b) { return a-b; })[0];
}

// cnLastIndexOf

Array.prototype.cnLastIndexOf = function(num) {
  for (var i = this.length-1; i >= 0; i--) {
    if (this[i] === num) {
      return i;
    }
  }
  return -1;
}

// cnRightReduce

Array.prototype.cnRightReduce = function(call, initial) {
  initial = initial === undefined ? this.pop() : initial;
  this.cnRightForEach(function(e,i,a) {
    initial = call(initial, e, i, a);
  });
  return initial;
}

// cnCheck

Array.prototype.cnCheck = function(calls, index) {
  var call = arguments[0];
  var args = Array.from(arguments).slice(1);
  var bool = true;

  this.cnForEach(function(e,i,a) {
    if (args.includes(i) && !call(e, i, a)) {
      bool = false;
    }
  });

  return bool;
}

// cnFind

Array.prototype.cnFind = function(callback, time) {
  var inn = time === undefined ? 1 : time;
  var ph = 0;

  this.cnForEach(function(e,i,a) {
    if (callback(e,i,a)) {
      ph++;
      if (ph === inn) {
        return e;
      }
    }
  });

  return undefined;
}

// cnUniq

Array.prototype.cnUniq = function() {
  return this.filter(function(ele, i, arr) {
    return arr.indexOf(ele) === i;
  });
}

// cnSortedUniq

Array.prototype.cnSortedUniq = function() {
  return this.sort().filter(function(e,i,a) {
    return a.indexOf(e) === i;
  });
}

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
}

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
}

// cnIntersection

Array.prototype.cnIntersection = function(calls) {
  if (calls === undefined) { calls = function(x) { return x; } }
  return this.reduce(function(acc, item) {
    item.cnUniq().forEach(function(x) {
      if (!acc.includes(calls(x))) {
        acc.push(x)
      }
    })
    return acc;
  },[]);
}

// cnRandomShuffle

Array.prototype.cnRandomShuffle = function() {
  return this.sort(function(a,b) { return Math.random(a) - Math.random(b); });
}

// cnFlatMap

Array.prototype.cnFlatMap = function(args) {
  return this.cnFlatten().cnMap(args);
}

// cnCompact

Array.prototype.cnCompact = function() {
  return this.filter(function(x) { return Number(x) !== 0; });
}
