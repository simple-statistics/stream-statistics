var test = require('tap').test;
var StreamStatistics = require('../');
var ss = require('simple-statistics');
var Readable = require('readable-stream');

function range(a, b) {
    var rs = [];
    for (var i = a; i < b; i++) { rs.push(i); }
    return rs;
}

function rangeStream(a, b) {
    var rs = new Readable({ objectMode: true });
    for (var i = a; i < b; i++) { rs.push(i); }
    rs.push(null);
    return rs;
}

test('min, max, sum, mean, variance, standard_deviation', function(t) {
    var r = range(10, 1000);
    rangeStream(10, 1000).pipe(StreamStatistics()).on('data', function(d) {
        t.equal(d.min, 10, '.min');
        t.equal(d.max, 999, '.max');
        t.equal(d.sum, 499455, '.sum');
        t.equal(d.mean, 504.5, '.mean');
        t.equal(d.mean, ss.mean(r), '.mean=ss');
        t.equal(d.variance, ss.variance(r), '.variance=ss');
        t.equal(d.variance, 81674.91666666667, '.variance');
        t.equal(d.harmonic_mean, ss.harmonic_mean(r), '.harmonic_mean=ss');
        t.equal(d.standard_deviation, 285.78823745330504, '.standard_deviation');
        t.equal(d.standard_deviation, ss.standard_deviation(r), '.standard_deviation=ss');
        t.end();
    });
});

test('geometric mean', function(t) {
    rangeStream(1, 5).pipe(StreamStatistics()).on('data', function(d) {
        t.equal(d.geometric_mean, 2.2133638394006434, '.geometric_mean');
        t.equal(d.geometric_mean, ss.geometric_mean(range(1, 5)), '.geometric_mean');
        t.end();
    });
});
