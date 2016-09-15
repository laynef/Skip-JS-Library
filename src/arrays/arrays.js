/**
* @Author: Layne Faler <laynefaler>
* @Date:   09-09-2016
* @Email:  laynefaler@gmail.com
* @Last modified by:   laynefaler
* @Last modified time: 09-15-2016
*/

/*

****** ARRAYS ********

pre-made functions
To chain with others

**********************

*/

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

// take

Array.prototype.cnTake = function(num) {
  var arr = []; num = num === undefined ? 1 : num;
  if (num < 0) {
    num *= -1;
    if (num > this.length) { return this; }
    for (var i = this.length-1; i >= (i-num); i--) {
      arr.push(this[i]);
    }
    return arr;
  } else if (num === 0) {
    return this;
  } else {
    if (num > this.length) { return this; }
    for (var i = 0; i < num; i++) {
      arr.push(this[i]);
    }
    return arr;
  }
}

// union

Array.prototype.cnUnion = function(calls) {
  if (calls === undefined) { calls = function(x) { return x; } }
}

// difference

Array.prototype.cnDifference = function(calls) {
  if (calls === undefined) { calls = function(x) { return x; } }
}

// zip

Array.prototype.cnZip = function() {

}

// zipObject
// unzip
// sortedIndex
// findLastIndex
// range

// object

Array.prototype.cnObject = function() {

}

// shuffle

// REVIEW: test
Array.prototype.cnShuffle = function(num) {
  var arr = [];
  if (num < 0) {
    num *= -1;
    for (var i = this.length-1; i >= num; i--) {
      arr.push(this[i]);
    }
    for (var i = 0; i <= num; i++) {
      arr.push(this[i]);
    }
  } else if (num === 0) {
    return this;
  } else {
    for (var i = num; i < this.length; i++) {
      arr.push(this[i]);
    }
    for (var i = 0; i <= num; i++) {
      arr.push(this[i]);
    }
    return arr;
  }
}
