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

## See Also

* The sister project, [simple-statistics](https://github.com/tmcw/simple-statistics), that implements
  many of the same measures in straightforward and literate fashion
