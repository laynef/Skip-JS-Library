/**
* @Author: Layne Faler <laynefaler>
* @Date:   09-09-2016
* @Email:  laynefaler@gmail.com
* @Last modified by:   laynefaler
* @Last modified time: 09-10-2016
*/

/*

****** ARRAYS ********

pre-made functions
To chain with others

**********************

*/

// clear

Array.prototype.clear = function() {
  return [];
}

// compact

Array.prototype.compact = function() {
  return this.filter(function(x) { return Number(x) !== 0; });
}

// remove

Array.prototype.remove = function(calls, index) {
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

Array.prototype.geo = function(calls, index) {
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

  return newArr;
}

// atIndex

Array.prototype.atIndex = function(in) {
  if (in === undefined) { in = 0; }
  if (in > this.length || in < 0) {
    return console.error('invalid index atIndex');
  }
  return this[in];
}

// 
