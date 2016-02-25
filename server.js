'use strict';

const mongoose = require('mongoose');
const session = require('koa-generic-session');
const router = require('koa-router')();
const redis = require('koa-redis');
const koala = require('koala');
const send = require('koa-send');
const app = koala();

// MONGODB URL
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/btg';

// SCHEMAS/MODELS
require('./app/models/')(mongoose);

// MONGO INIT CONNECTION
const db = mongoose.connect(MONGODB_URL);
// ADD MODEL TO APP CONTEXT
app.context.model = db.model;

const PORT = process.env.PORT || 3000;

// ROUTES BITCHES!
require('./app/routes/home.js')(router);
app.use(router.routes());

// SESSION STORE
app.keys = ['key', 'wadiwasi'];
app.use(session({
  store: redis({
    url: `${process.env.REDIS_URL || 'redis://localhost'}`
  })
}));

// STATIC FILES
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
