'use strict';

const router = require('koa-router')();
const session = require('koa-generic-session');
const redis = require('koa-redis');
const send = require('koa-send');
const koala = require('koala');
const app = koala();

// 12 factor
const PORT = process.env.PORT || 3000;

// routes
require('./app/routes/home.js')(router);

app.use(router.routes());
app.keys = ['key', 'wadiwasi'];
app.use(session({
  store: redis({
    url: `${process.env.REDIS_URL || 'redis://localhost'}`
  })
}));

// Static file server
app.use(function * fileserver() {
  const opt = {
    root: `${__dirname}/public`,
    maxage: 0,
    gzip: false
  };

  // Enable gzip and maxage in prod
  if (process.env.NODE_ENV && process.env.NODE_ENV.match(/prod/)) {
    opt.maxage = 1000 * 60 * 60 * 24 * 7;
    opt.gzip = true;
  }

  yield send(this, this.path, opt);
});

app.listen(PORT);
console.log('Server running on port', PORT);
