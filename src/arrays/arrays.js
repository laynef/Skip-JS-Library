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



// atIndex

// TODO: negatives
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
      newArr.push(calls(this[i], i, this));
    } else {
      newArr.push(this[i]);
    }
  }
  // check concat
  return newArr.concat(this);
};

// find

Array.prototype.cnFind = function(callback, time) {
  var inn = time === undefined ? 1 : time;
  var ph = 0;

  for (var i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      ph++;
      if (ph === inn) {
        return this[i];
      }
    }
  }

  return undefined;
}

// chuck

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

// intersection

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

// union

Array.prototype.cnUnion = function(calls) {
  if (calls === undefined) { calls = function(x) { return x; } }
}

// difference

Array.prototype.cnDifference = function(calls) {
  if (calls === undefined) { calls = function(x) { return x; } }
}

// uniq

Array.prototype.cnUniq = function() {
  return this.filter(function(ele, i, arr) {
    return arr.indexOf(ele) === i;
  });
}

// sortUniq

Array.prototype.cnSortedUniq = function() {
  return this.sort().filter(function(e,i,a) {
    return a.indexOf(e) === i;
  });
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

// flatMap

Array.prototype.cnFlatMap = function(args) {
  return this.cnFlatten().cnMap(args);
}

// randomShuffle

Array.prototype.cnRandomShuffle = function() {
  return this.sort(function(a,b) { return Math.random(a) - Math.random(b); });
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
