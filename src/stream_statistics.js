function stream_statistics() {
    // Don't make users use new.
    if (!(this instanceof stream_statistics)) {
       return new stream_statistics();
    }
    // seed all values with floating point values to avoid conversions
    this._min = Number.POSITIVE_INFINITY;
    this._max = Number.NEGATIVE_INFINITY;
    // number of items seen
    this._n = 0.0;
    // running mean
    this._mean = 0.0;
    // the running sum
    this._sum = 0.0;
    // running intermediary values for variance, skewness and kurtosis
    this._vari = 0.0;
    this._skew = 0.0;
    this._kurt = 0.0;
}

stream_statistics.prototype.write = function write(x) {
    var value = parseFloat(x),
        old_n = this._n,
        new_n = old_n + 1.0;
    if (new_n - old_n != 1.0) {
        // accuracy losses for float, we can't incorporate updates
        // any longer because the mantissa overflows.
        // Example: 64bit float fails increment by 1 at 9.007199254740991e+15
        // which is binary ((1 << 10 + 52)) << 52 - 1 interpreted as float
        return false;
    }
    this._n = new_n;
    if (old_n === 0.0) {
        this._min = value;
        this._max = value;
        this._mean = value;
        this._sum = value;
        return true;
    }
    if (value < this._min) this._min = value;
    if (value > this._max) this._max = value;
    var delta = value - this._mean;
    var a = delta / new_n;
    this._mean += a;
    this._sum = this._n * this._mean;
    this._kurt += a * (a*a*delta*old_n*(new_n*(new_n-3.0)+3.0)) + 6.0*a*this._vari - 4.0*this._skew;
    var b = value - this._mean;
    this._skew += a * (b*delta*(new_n-2.0) - 3.0*this._vari);
    this._vari += delta * b;
    return true;
};

// for use by stream_statistics only (resultof sample() and population())
function descriptive_statistics(ss, variance) {
    var count = +(""+ss._n);
    this._is_sample_statistics = false;
    this._count = count;
    this._min = ss._min;
    this._max = ss._max;
    this._mean = ss._mean;
    this._sum = ss._sum;
    this._variance = variance;
    this._standard_deviation = Math.sqrt(variance);
    var varInv = (ss._n - 1) / ss._vari;
    var nVarInv = varInv / ss._n;
    this._skewness = nVarInv * Math.sqrt(varInv) * ss._skew;
    this._kurtosis = nVarInv * varInv * ss._kurt - 3.0;
    return this;
}

descriptive_statistics.prototype.count = function() { return this._count; };
descriptive_statistics.prototype.min = function() { return this._min; };
descriptive_statistics.prototype.max = function() { return this._max; };
descriptive_statistics.prototype.sum = function() { return this._sum; };
descriptive_statistics.prototype.mean = function() { return this._mean; };
descriptive_statistics.prototype.standard_deviation = function() { return this._standard_deviation; };
descriptive_statistics.prototype.variance = function() { return this._variance; };
descriptive_statistics.prototype.skewness = function() { return this._skewness; };
descriptive_statistics.prototype.kurtosis = function() { return this._kurtosis; };

stream_statistics.prototype.population = function() {
    return new descriptive_statistics(this, this._vari / this._n);
};

stream_statistics.prototype.sample = function() {
    var sample = new descriptive_statistics(this, this._vari / (this._n - 1.0));
    sample._is_sample_statistics = true;
    var count = sample._count;
    if (count > 2) {
        var n = this._n;
        // enough data: change G1 to g1 estimation
        sample._skewness *= (n * n) / ((n - 1.0) * (n - 2.0));
        if (count > 3) {
            // enough data: change G2 to g2 estimation
            sample._kurtosis = ((n + 1.0) * sample._kurtosis + 6.0) * (n - 1.0) / ((n - 2.0) * (n - 3.0));
        }
    }
    return sample;
};

if (typeof module !== 'undefined') {
    exports = module.exports = stream_statistics;
}
