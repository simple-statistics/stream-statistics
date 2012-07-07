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

## Binary

This also provides a binary, `sstatistics`, that you can get if you
`npm install -g` the library. Pipe numbers into it and it'll return
a basic set of stats about its input.

![](https://github.com/tmcw/stream-statistics/blob/master/screenshot.png?raw=true)

## [Documentation](https://github.com/tmcw/stream-statistics/wiki)

## See Also

* The sister project, [simple-statistics](https://github.com/tmcw/simple-statistics), that implements
  many of the same measures in straightforward and literate fashion
