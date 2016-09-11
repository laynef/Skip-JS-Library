/**
* @Author: Layne Faler <laynefaler>
* @Date:   09-09-2016
* @Email:  laynefaler@gmail.com
* @Last modified by:   laynefaler
* @Last modified time: 09-11-2016
*/

/*

****** ARRAYS ********

pre-made functions
To chain with others

**********************

*/

// clear

Array.prototype.cnClear = function() {
  return [];
}

// compact

Array.prototype.cnCompact = function() {
  return this.filter(function(x) { return Number(x) !== 0; });
}

// remove

Array.prototype.cnRemove = function(calls, index) {
  var args, func, newArr = [];
  if (typeof arguments[0] !== 'function') {
    args = Array.from(arguments);

    for (var i = 0; i < this.length; i++) {
      if (!args.includes(i)) {
        newArr.push(this[i]);
      }
    }

    return newArr;

  } else {
    func = arguments[0];
    args = Array.from(arguments).slice(1);

    for (var i = 0; i < this.length; i++) {
      if (!calls && !args.includes(i)) {
        newArr.push(this[i]);
      }
    }

    return newArr;

  }
}

// geo (map only indexs)

Array.prototype.cnMap = function(calls, index) {
  var newArr = [], args;
  var calls = arguments[0];
  if (arguments.length === 1)  { args = Array.from(arguments).slice(1); }

  for (var i = 0; i < this.length; i++) {
    if (args.includes(i) && args !== undefined) {
      newArr.push(calls(this[i]));
    } else if (args === undefined) {
      newArr.push(calls(this[i]));
    } else {
      newArr.push(this[i]);
    }
  }

  return newArr;
}

// atIndex

Array.prototype.cnAtIndex = function(inn) {
  if (inn === undefined) { inn = 0; }
  if (inn > this.length || inn < 0) {
    return console.error('invalid index atIndex');
  }
  return this[inn];
}

// REVIEW: check
// concat this before alg ???

Array.prototype.cnConcatMap = function(calls, index) {
  var newArr = [];
  var calls = arguments[0];
  var args = Array.from(arguments).slice(1);

  for (var i = 0; i < this.length; i++) {
    if (args.includes(i)) {
      newArr.push(calls(this[i]));
    } else {
      newArr.push(this[i]);
    }
  }
  // check concat
  return newArr.concat(this);
};

// check

Array.prototype.cnCheck = function(calls, index) {
  var call = arguments[0];
  var args = Array.from(arguments).slice(1);
  var bool = true;

  for (var i = 0 ; i < this.length; i++) {
    if (args.includes(i) && !call(i)) {
      bool = false;
    }
  }

  return bool;
}

// forEach

Array.prototype.cnForEach = function(calls, index) {
  var call = arguments[0];
  var args = Array.from(arguments).slice(1);

  for (var i = 0; i < this.length; i++) {
    if (args === undefined) {
      call(this[i]);
    } else if (args.includes(i)) {
      call(this[i]);
    }
  }
}

// find

Array.prototype.cnFind = function(callback, time) {
  var inn = time === undefined ? 1 : time;
  var ph = 0;

  for (var i = 0; i < this.length; i++) {
    if (callback(this[i])) {
      ph++;
      if (ph === inn) {
        return this[i];
      }
    }
  }

  return undefined;
}

// 
