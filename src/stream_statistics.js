function stream_statistics() {
    this._min = null;
    this._max = null;
    this._n = null;
    this._sum = 0;
    this.writable = true;
}

stream_statistics.prototype.write = function write(x) {
    x = parseFloat(x);

    // Accounting for minimum and maximum values
    if (this._min === null || x < this._min) this._min = x;
    if (this._max === null || x > this._max) this._max = x;

    // For sums
    this._sum += x;

    // For means
    this._n++;
};

stream_statistics.prototype.n = function() { return this._n; };
stream_statistics.prototype.min = function() { return this._min; };
stream_statistics.prototype.max = function() { return this._max; };
stream_statistics.prototype.sum = function() { return this._sum; };

stream_statistics.prototype.mean = function() {
    return this._sum / this._n;
};

if (typeof module !== 'undefined') {
    exports = module.exports = stream_statistics;
}
