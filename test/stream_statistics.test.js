var assert = require('assert');
var stream_statistics = require('../');
var ss = require('simple-statistics');

it('records a maximum and minimum', function() {
    var streamy = new stream_statistics();
    for (var i = 10; i < 1000; i++) {
        streamy.write(i);
    }
    assert.equal(streamy.min(), 10);
    assert.equal(streamy.max(), 999);
});

it('records a sum', function() {
    var streamy = new stream_statistics();
    streamy.write(5);
    streamy.write(50);
    assert.equal(streamy.sum(), 55);
});

it('tolerates strings', function() {
    var streamy = new stream_statistics();
    streamy.write('5');
    assert.equal(streamy.sum(), 5);
});
