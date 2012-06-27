## stream-statistics

Statistics written in the style of a [stream](http://nodejs.org/api/stream.html).

Install:

    npm install stream-statistics

Use:

```javascript
var streamy = new stream_statistics();

[1, 2, 3, 4, 5].forEach(function(i) {
    streamy.write(i);
});

assert.equal(streamy.variance(), 2);
```

## [Documentation](https://github.com/tmcw/stream-statistics/wiki)

Heavily inspired by:

* https://github.com/brendano/running_stat
* https://github.com/brendano/running_stat/blob/master/running_stat.cc
* http://brenocon.com/blog/2008/11/calculating-running-variance-in-python-and-c/
* http://numerics.mathdotnet.com/blog/2011/4/12/online-computation-of-statistics.html
