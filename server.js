'use strict';

/**
 * MODULE DEPENDENCIES
 * like a motherfucker (^________-)
 *
 * Check out the OCD stuff below
 * If you know what I mean...
 */
const mongoose = require('mongoose');
const session = require('koa-generic-session');
const router = require('koa-router')();
const redis = require('koa-redis');
const koala = require('koala');
const send = require('koa-send');
const app = koala();

// MONGODB
const MU = process.env.MONGODB_URL || 'mongodb://localhost/btg';
const db = mongoose.connect(MU);
app.context.model = db.model;
require('./app/models/')(mongoose);

// ROUTES BITCHES!
require('./app/routes/')(router);
app.use(router.routes());

// SESSION STORE MIDDLEWARE
app.keys = ['key', 'wadiwasi'];
app.use(session({
  store: redis({
    url: `${process.env.REDIS_URL || 'redis://localhost'}`
  })
}));

// STATIC FILES MIDDLEWARE
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

// SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('Server running on port', PORT);
