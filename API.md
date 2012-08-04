stream-statistics implements various statistical measures with online algorithms

## Create a new stream instance

    var ss = require('stream-statistics');
    var stream_statistics = new ss();
    stream_statistics

# Documentation

### .write(x)

Write a new number to this accumulator. The single argument must be a number.

Self-explanatory: `.sum()`, `.mean()`, `.min()`, `.max()`

### .variance()

The [variance](http://en.wikipedia.org/wiki/Variance) of the stream.

### .standard_deviation()

The [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation) of the stream.
