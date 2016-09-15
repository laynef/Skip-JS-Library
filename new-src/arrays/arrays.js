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

// cnClear

Array.prototype.cnClear = function() {
  return [];
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
  var calls = arguments[0];
  var others = Array.from(arguments).slice(1);

  for (var i = 0; i < this.length; i++) {
    if (args === undefined) {
      call(this[i], i, this);
    } else if (args.includes(i)) {
      call(this[i], i, this);
    }
  }
}

// cnMap

Array.prototype.cnMap = function(callback,indexs) {
    var arr = [];
    var others = Array.from(arguments).slice(1);
    var calls = arguments[0];

    this.cnForEach(function(e,i,a) {
      arr.push(calls(e,i,a));
    }, others);
    return arr;
}

// cnFilter

Array.prototype.cnFilter = function(callback,indexs) {
  var arr = [];
  var others = Array.from(arguments).slice(1);
  var calls = arguments[0];

  this.cnForEach(function(e,i,a) {
    if (calls(e,i,a)) {
      arr.push(e);
    }
  }, others);
  return arr;
}
