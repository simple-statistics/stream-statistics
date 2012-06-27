function stream_statistics() {
    this._min = null;
    this._max = null;
    // number of items seen
    this._n = 0;
    // running mean
    this._mean = 0;
    // running sum of squares deviations from the mean
    this._ss = 0;
    this._sum = 0;
    this.writable = true;
}

stream_statistics.prototype.write = function write(x) {
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
};

stream_statistics.prototype.n = function() { return this._n; };
stream_statistics.prototype.min = function() { return this._min; };
stream_statistics.prototype.max = function() { return this._max; };
stream_statistics.prototype.sum = function() { return this._sum; };
stream_statistics.prototype.mean = function() { return this._mean; };

stream_statistics.prototype.variance = function() {
    return this._ss / this._n;
};

stream_statistics.prototype.standard_deviation = function() {
    return Math.sqrt(this.variance());
};

if (typeof module !== 'undefined') {
    exports = module.exports = stream_statistics;
}
