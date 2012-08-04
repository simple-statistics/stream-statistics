function StreamStatistics() {
    // Don't make users use new.
    if (!(this instanceof StreamStatistics)) {
       return new StreamStatistics();
    }
    this._min = null;
    this._max = null;
    // number of items seen
    this._n = 0;
    // running mean
    this._mean = 0;
    // running sum of squares deviations from the mean
    this._ss = 0;
    // the running 'actual sum'
    this._sum = 0;
    this.writable = true;
}

if (typeof module !== 'undefined') {
    var util = require('util'),
        Stream = require('stream');

    util.inherits(StreamStatistics, Stream);
    exports = module.exports = StreamStatistics;
}

StreamStatistics.prototype.write = function write(x) {
    x = parseFloat(x);

    if (this._n === 0) {
        this._min = x;
        this._max = x;
        this._mean = x;
        this._sum = x;
    } else {
        if (x < this._min) this._min = x;
        if (x > this._max) this._max = x;
        this._ss += this._n * Math.pow(x - this._mean, 2) / (this._n + 1);
        this._mean += (x - this._mean) / (this._n + 1);
        this._sum += x;
    }

    this._n++;

    return true;
};

StreamStatistics.prototype.end = function() {
};

StreamStatistics.prototype.destroy = function() {
};

StreamStatistics.prototype.n = function() { return this._n; };
StreamStatistics.prototype.min = function() { return this._min; };
StreamStatistics.prototype.max = function() { return this._max; };
StreamStatistics.prototype.sum = function() { return this._sum; };
StreamStatistics.prototype.mean = function() { return this._mean; };

StreamStatistics.prototype.variance = function() {
    return this._ss / this._n;
};

StreamStatistics.prototype.standard_deviation = function() {
    return Math.sqrt(this.variance());
};
