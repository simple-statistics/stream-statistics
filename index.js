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
                // for mode calculations
                _seen_this: null,
                _mode: null,
                _mode_valid: true,
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
                },
                get mode() {
                    if (!this._mode_valid) {
                        return null;
                    }
                    if (this._seen_this > this._max_seen) {
                        return this._last;
                    } else {
                        return this._mode;
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
            if (this._stats._last > x) {
                this._mode_valid = false;
            }
            if (this._mode_valid) {
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
