function introduce(fn, memo, dependents) {
  return (function(memo) {
    dependents = dependents || [];
    return function(item) {
      return item === undefined ? memo : memo = fn.apply(undefined, [item, memo].concat(dependents.map(d => d(item))));
    };
  }).bind(undefined, memo);
}

module.exports.createSum = introduce((item, sum) => sum + item, 0);

module.exports.createCount = introduce((item, count) => ++count, 0);

module.exports.createMean = introduce((item, last, sum, count) => sum / count, undefined, [
  module.exports.createSum(),
  module.exports.createCount()
]);

module.exports.createMin = introduce((item, min) => min === undefined || item < min ? item : min, undefined);

module.exports.createMax = introduce((item, max) => max === undefined || item > max ? item : max, undefined);
