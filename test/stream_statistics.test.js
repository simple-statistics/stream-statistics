var test = require('tap').test;
var StreamStatistics = require('../');
var ss = require('simple-statistics');
var Readable = require('readable-stream');

function rangeStream(a, b) {
    var rs = new Readable({ objectMode: true });
    for (var i = 10; i < 1000; i++) { rs.push(i); }
    rs.push(null);
    return rs;
}

test('min, max, sum, mean, variance, standard_deviation', function(t) {
    var streamy = StreamStatistics();
    rangeStream(10, 1000).pipe(streamy).on('data', function(d) {
        t.equal(d.min, 10, '.min');
        t.equal(d.max, 999, '.max');
        t.equal(d.sum, 499455, '.sum');
        t.equal(d.mean, 504.5, '.mean');
        t.equal(d.variance, 81674.91666666667, '.variance');
        t.equal(d.standard_deviation, 285.78823745330504, '.standard_deviation');
        t.end();
    });
});
