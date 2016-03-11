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

let FB_KEY = process.env.FB_KEY;
let FB_SECRET = process.env.FB_SECRET;

// FOR DEVELOPMENT
// we use .fbkey
if (!process.env.NODE_ENV) {
  const fs = require('fs');
  if (!fs.existsSync('.fbkey')) {
    throw new Error(`
      Can't find .fbkey, please create one that contains
      fb api keys and secret separated in new line.

      i.e:
       keykeykeykeykey
       secretsecretsecret
      `);
  }

  const fb = fs.readFileSync('.fbkey').toString().split('\n');
  FB_KEY = fb[0];
  FB_SECRET = fb[1];
}

// PUREST
const Purest = require('purest');
app.context.facebook = new Purest({ provider: 'facebook', promise: true });

// GRANT
const mount = require('koa-mount');
const grant = new require('grant-koa')({
  server: {
    protocol: 'http',
    host: 'localhost:3000'
  },
  facebook: {
    key: FB_KEY,
    secret: FB_SECRET,
    callback: '/fb/callback'
  }
});
app.use(mount(grant));

// MONGODB
const MU = process.env.MONGODB_URL || 'mongodb://localhost/btg';
const db = mongoose.connect(MU);
app.context.model = db.model;
require('./app/models/')(mongoose);

// ROUTES BITCHES!
require('./app/routes/')(router);
app.use(router.routes());

// SESSION STORE MIDDLEWARE
app.keys = ['3cced13707cba542effe9f3796bb9c531f770ebe'];
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
