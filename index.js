// var through2 = require('through2');

/**
 * Create a sum function
 */
function createSum() {
  var sum = 0;
  return function addItem(item) {
    if (item == undefined) {
      return sum;
    }
    return sum += item;
  };
}
module.exports.createSum = createSum;

/**
 * Create a mean function
 */
function createCount() {
  var count = 0;
  return function addItem(item) {
    if (item == undefined) {
      return count;
    }
    return count += 1;
  };
}
module.exports.createCount = createCount;

/**
 * Create a mean function
 */
function createMean() {
  var count = createCount();
  var sum = createSum();
  return function addItem(item) {
    if (item == undefined) {
      return sum() / count();
    }
    return sum(item) / count(item);
  };
}
module.exports.createMean = createMean;

function createGeometricMean() {
  var count = createCount();
  var rollingMean = 1;
  return function addItem(item) {
    if (item == undefined || item < 0) {
      return Math.pow(rollingMean, 1 / count());
    }
    return Math.pow(rollingMean *= item, 1 / count(item));
  };
}
module.exports.createGeometricMean = createGeometricMean;

function createMin() {
  var min;
  return function addItem(item) {
    if (item === undefined) {
      return min;
    } else if (min === undefined || item < min) {
      min = item;
    }
    return min;
  };
}
module.exports.createMin = createMin;

function createMax() {
  var max;
  return function addItem(item) {
    if (item === undefined) {
      return max;
    } else if (max === undefined || item > max) {
      max = item;
    }
    return max;
  };
}
module.exports.createMax = createMax;

// TODO: not right yet
// function createSumOfSquares() {
//   var count = createCount();
//   var mean = createMean();
//   var sumOfSquares = 0;
//   return function addItem(item) {
//     var c = count(item);
//     return sumOfSquares += (c - 1) * Math.pow(item - mean(item), 2) / c;
//   };
// }
// module.exports.createSumOfSquares = createSumOfSquares;
// function createVariance() {
//   var count = createCount();
//   var sumOfSquares = createSumOfSquares();
//   return function addItem(item) {
//     return sumOfSquares(item) / count(item);
//   };
// }
// module.exports.createVariance = createVariance;

/*
module.exports = function() {
    return through2({
        objectMode: true
    }, function(chunk, enc, callback) {
        if (this._stats === undefined) {
            this._stats = {
                max: null,
                min: null,
                n: 0,
                _geometric_mean: 1,
                _reciprocal_sum: 0,
                mean: null,
                ss: null,
                sum: null,
                // for mode calculations
                _seen_this: null,
                _mode: null,
                _mode_valid: true,
                get variance() {
                    return this.ss / this.n;
                },
                get standardDeviation() {
                    return Math.sqrt(this.variance);
                },
                get geometricMean() {
                    return Math.pow(this._geometric_mean, 1 / this.n);
                },
                get harmonicMean() {
                    return this.n / this._reciprocal_sum;
                },
                get mode() {
                    if (this._mode_valid) {
                        if (this._seen_this > this._max_seen) {
                            return this._last;
                        } else {
                            return this._mode;
                        }
                    }
                }
            };
        }

        var x = parseFloat(chunk);

        if (this._stats.n === 0) {
            this._stats.min = x;
            this._stats.max = x;
            this._stats.mean = x;
            this._stats.sum = x;

            // mode calculations
            // the current mode
            this._stats._mode = x;
            // seen the current value
            this._stats._seen_this = 1;
            // seen the mode
            this._stats._max_seen = 1;
            this._stats._last = x;
        } else {
            if (x < this._stats.min) this._stats.min = x;
            if (x > this._stats.max) this._stats.max = x;
            this._stats.ss += this._stats.n *
                Math.pow(x - this._stats.mean, 2) /
                (this._stats.n + 1);
            this._stats.mean += (x - this._stats.mean) /
                (this._stats.n + 1);
            this._stats.sum += x;
            if (this._stats._last < x) {
                this._mode_valid = false;
            }
            if (this._stats._mode_valid) {
                if (x !== this._stats._last) {
                    if (this._stats._seen_this > this._stats._max_seen) {
                        this._stats._max_seen = this._stats._seen_this;
                        this._stats._seen_this = 1;
                        this._stats._mode = this._stats._last;
                    }
                    this._stats._last = x;
                } else {
                    this._stats._seen_this++;
                }
            }
        }

        // geometric mean is only valid for positive numbers
        if (x > 0) {
            this._stats._geometric_mean *= x;
            this._stats._reciprocal_sum += 1 / x;
        }

        this._stats.n++;
        callback();
    }, function(callback) {
        this.push(this._stats);
        callback();
    });
};
*/
