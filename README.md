[![Build Status](https://travis-ci.org/tmcw/stream-statistics.svg?branch=v0.1.0)](https://travis-ci.org/tmcw/stream-statistics)

## stream-statistics

Install:

    npm install stream-statistics

API:

Emits a statistics object with the following members:

* min
* max
* sum
* mean
* variance
* standard_deviation

Use:

```javascript
var streamStatistics = require('stream-statistics'),
    assert = require('assert');

function rangeStream(a, b) {
    var rs = new Readable({ objectMode: true });
    for (var i = 10; i < 1000; i++) { rs.push(i); }
    rs.push(null);
    return rs;
}

rangeStream(10, 1000).pipe(streamStatistics())
    .on('data', function(d) {
        assert.equal(d.min, 10);
    });
```

## cli

This also provides a binary, `sstatistics`, that you can get if you
`npm install -g` the library. Pipe numbers into it and it'll return
a basic set of stats about its input.

![](https://github.com/tmcw/stream-statistics/blob/master/screenshot.png?raw=true)

## [Documentation](https://github.com/tmcw/stream-statistics/wiki)

## See Also

* The sister project, [simple-statistics](https://github.com/tmcw/simple-statistics), that implements
  many of the same measures in straightforward and literate fashion
