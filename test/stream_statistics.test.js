var test = require('tap').test;
var StreamStatistics = require('../');

var testData = [
  {
    val: 1,
    count: 1,
    mean: 1,
    min: 1,
    max: 1,
    sum: 1,
    geometricMean: 1
  },
  {
    val: 2,
    count: 2,
    mean: 1.5,
    min: 1,
    max: 2,
    sum: 3,
    geometricMean: 1
  },
  {
    val: 3,
    count: 3,
    mean: 2,
    min: 1,
    max: 3,
    sum: 6,
    geometricMean: 1
  },
  {
    val: -6,
    count: 4,
    mean: 0,
    min: -6,
    max: 3,
    sum: 0,
    geometricMean: 1
  }
];

test('StreamStatistics', function(t) {
  var count = StreamStatistics.createCount();
  var mean = StreamStatistics.createMean();
  var min = StreamStatistics.createMin();
  var max = StreamStatistics.createMax();
  var sum = StreamStatistics.createSum();
  var geometricMean = StreamStatistics.createGeometricMean();
  testData.forEach(function(input) {
    t.equal(count(input.val), input.count, 'count');
    t.equal(mean(input.val), input.mean, 'mean');
    t.equal(min(input.val), input.min, 'min');
    t.equal(sum(input.val), input.sum, 'sum');
    t.equal(geometricMean(input.val), input.geometricMean, 'geometricMean');
  });
  t.end();
});
