var fs = require('fs'),
    assert = require('assert'),
    byline = require('byline'),
    StreamStatistics = require('../');


it('can be piped into', function(done) {
    var ss = new StreamStatistics();
    var stream = byline(fs.createReadStream(__dirname + '/samples.txt'));
    stream.pipe(ss);
    stream.on('end', function() {
        assert.equal(ss.max(), 120);
        assert.equal(~~ss.mean(), 33);
        assert.equal(ss.min(), 1);
        done();
    });
});
