var through2 = require('through2');

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
                get variance() {
                    return this.ss / this.n;
                },
                get standard_deviation() {
                    return Math.sqrt(this.variance);
                },
                get geometric_mean() {
                    return Math.pow(this._geometric_mean, 1 / this.n);
                },
                get harmonic_mean() {
                    return this.n / this._reciprocal_sum;
                }
            };
        }

        var x = parseFloat(chunk);

        if (this._stats.n === 0) {
            this._stats.min = x;
            this._stats.max = x;
            this._stats.mean = x;
            this._stats.sum = x;
        } else {
            if (x < this._stats.min) this._stats.min = x;
            if (x > this._stats.max) this._stats.max = x;
            this._stats.ss += this._stats.n *
                Math.pow(x - this._stats.mean, 2) /
                (this._stats.n + 1);
            this._stats.mean += (x - this._stats.mean) /
                (this._stats.n + 1);
            this._stats.sum += x;
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
