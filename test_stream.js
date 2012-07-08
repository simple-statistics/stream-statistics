var spec = require('stream-spec'),
    stream_statistics = require('./');

var ss = new stream_statistics();

spec(ss)
  .writable()
  .validate();
