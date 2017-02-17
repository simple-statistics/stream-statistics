var test = require('tap').test;
var StreamStatistics = require('../');

test('StreamStatistics', function(t) {
  var input = [1, 2, 3, -6];
  [
    ['createCount', [1, 2, 3, 4]],
    ['createMean', [1, 1.5, 2, 0]],
    ['createMin', [1, 1, 1, -6]],
    ['createMax', [1, 2, 3, 3]],
    ['createSum', [1, 3, 6, 0]]
  ].forEach(function(metric) {
    var fn = StreamStatistics[metric[0]]();
    t.deepEqual(input.map(fn), metric[1], metric);
  });
  t.end();
});
