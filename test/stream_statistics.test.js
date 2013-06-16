var assert = require('assert');
var stream_statistics = require('../');
var ss = require('simple-statistics');

it('records a maximum and minimum', function() {
    var streamy = new stream_statistics();
    for (var i = 10; i < 1000; i++) {
        streamy.write(i);
    }
    var stats = streamy.population();
    assert.equal(stats.min(), 10);
    assert.equal(stats.max(), 999);
});

it('records a sum', function() {
    var streamy = new stream_statistics();
    streamy.write(5);
    streamy.write(50);
    var stats = streamy.population();
    assert.equal(stats.sum(), 55);
});

it('tolerates strings', function() {
    var streamy = new stream_statistics();
    streamy.write('5');
    var stats = streamy.population();
    assert.equal(stats.sum(), 5);
});

it('calculates a running mean equal to the actual mean', function() {
    var streamy = new stream_statistics();
    for (var i = 0; i <= 100; i++) {
        streamy.write(i);
    }
    var stats = streamy.population();
    assert.equal(stats.mean(), 50);
    assert.equal(stats.mean(), stats.sum() / stats.n());
});

it('calculates variance the same as ss', function() {
    var n = [1, 2, 3, 4, 5, 6];
    var streamy = new stream_statistics();
    n.forEach(function(x) { streamy.write(x); });
    var stats = streamy.population();
    assert.equal(stats.variance(), ss.variance(n));
});

it('calculates standard deviation the same as ss', function() {
    var n = [1, 2, 3, 4, 5, 6];
    var streamy = new stream_statistics();
    n.forEach(function(x) { streamy.write(x); });
    var stats = streamy.population();
    assert.equal(stats.standard_deviation(), ss.standard_deviation(n));
});

it('does not make users use new', function() {
    var streamy = stream_statistics();
    assert.equal(typeof streamy.write, 'function');
});
