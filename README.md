[![Build Status](https://travis-ci.org/tmcw/stream-statistics.svg?branch=v0.1.0)](https://travis-ci.org/tmcw/stream-statistics)

![](https://farm9.staticflickr.com/8282/7711892138_6a4c08cd71_b.jpg)

## stream-statistics

### Install

    npm install stream-statistics

### API

This module exposes a single function that creates a stream. The stream
reads data, which it parses with `parseFloat()`, and computes statistics
on that data. When the input stream ends, `stream-statistics` emits the
`data` object.

The statistics object has the following members:

* `min`
* `max`
* `sum`
* `mean`
* `variance`
* `standard_deviation`
* `geometric_mean`

### Use

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
