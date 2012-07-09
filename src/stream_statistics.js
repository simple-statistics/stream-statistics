function stream_statistics() {
    // Don't make users use new.
    if (!(this instanceof stream_statistics)) {
       return new stream_statistics();
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
    this.readable = false;
}

if (typeof module !== 'undefined') {
    var util = require('util'),
        Stream = require('stream');

    util.inherits(stream_statistics, Stream);
    exports = module.exports = stream_statistics;
}

// # Stream API

// Write takes a number or a string that can be parsed
// as a number and adds it to the accumulators
stream_statistics.prototype.write = function(x) {
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

// Herein we attempt to fulfill the WritableStream specification
// via https://github.com/dominictarr/stream-spec/blob/master/stream_spec.md#writablestream

stream_statistics.prototype.end = function(x) {
    if (x !== undefined) this.write(x);
    // Calling end must set writable to false.
    this.writable = false;
    // If the Stream in not also readable, it must eventually emit 'close' but not emit 'end'.
    this.emit('close');
};

stream_statistics.prototype.destroy = function() {
    this._destroyed = true;
    this.writable = false;
    // Calling destroy must dispose of any underlying resources.
    // Calling destroy must emit 'close' eventually, once any underlying resources are disposed of.
    this.emit('close');
};

// # Accessor Methods

// These methods are simple accessors, in that we have the value
// stored internally and could even expose it, but prefer not to just in
// case we have a hairy implementation eventually that deals with huge
// numbers properly
stream_statistics.prototype.n = function() { return this._n; };
stream_statistics.prototype.min = function() { return this._min; };
stream_statistics.prototype.max = function() { return this._max; };
stream_statistics.prototype.sum = function() { return this._sum; };
stream_statistics.prototype.mean = function() { return this._mean; };

// Computing the variance is constant time, and so is the standard deviation,
// which is just the variance squared
stream_statistics.prototype.variance = function() {
    return this._ss / this._n;
};

stream_statistics.prototype.standard_deviation = function() {
    return Math.sqrt(this.variance());
};


