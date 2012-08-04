var assert = require('assert');
var StreamStatistics = require('../');
var ss = require('simple-statistics');

it('records a maximum and minimum', function() {
    var streamy = new StreamStatistics();
    for (var i = 10; i < 1000; i++) {
        streamy.write(i);
    }
    assert.equal(streamy.min(), 10);
    assert.equal(streamy.max(), 999);
});

it('records a sum', function() {
    var streamy = new StreamStatistics();
    streamy.write(5);
    streamy.write(50);
    assert.equal(streamy.sum(), 55);
});

it('tolerates strings', function() {
    var streamy = new StreamStatistics();
    streamy.write('5');
    assert.equal(streamy.sum(), 5);
});

it('calculates a running mean equal to the actual mean', function() {
    var streamy = new StreamStatistics();
    for (var i = 0; i <= 100; i++) {
        streamy.write(i);
    }
    assert.equal(streamy.mean(), 50);
    assert.equal(streamy.mean(), streamy.sum() / streamy.n());
});

it('calculates variance the same as ss', function() {
    var n = [1, 2, 3, 4, 5, 6];
    var streamy = new StreamStatistics();
    n.forEach(function(x) { streamy.write(x); });
    assert.equal(streamy.variance(), ss.variance(n));
});

it('calculates standard deviation the same as ss', function() {
    var n = [1, 2, 3, 4, 5, 6];
    var streamy = new StreamStatistics();
    n.forEach(function(x) { streamy.write(x); });
    assert.equal(streamy.standard_deviation(), ss.standard_deviation(n));
});

it('does not make users use new', function() {
    var streamy = StreamStatistics();
    assert.equal(typeof streamy.write, 'function');
});
