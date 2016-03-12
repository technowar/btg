'use strict';

// MODULE DEPENDENCIES
const mongoose = require('mongoose');
const session = require('koa-generic-session');
const models = require('./app/models/');
const routes = require('./app/routes/');
const router = require('koa-router')();
const Purest = require('purest');
const flash = require('koa-connect-flash');
const Grant = require('grant-koa');
const mount = require('koa-mount');
const redis = require('koa-redis');
const koala = require('koala');
const send = require('koa-send');
const app = koala();
const fs = require('fs');

// ENV
const NODE_ENV = process.env.NODE_ENV || 'dev';

// FACEBOOK API KEY/SECRET
let FB_KEY = process.env.FB_KEY;
let FB_SECRET = process.env.FB_SECRET;

// CONFIGS
const grantConfig = require('./config/grant.json')[NODE_ENV];
const appConfig = require('./config/app.json')[NODE_ENV];
const fsConfig = require('./config/fileserver.json')[NODE_ENV];

// If NODE_ENV matches either dev, docker, test, or local,
// then let's load .fbkey
if (NODE_ENV.match(/(dev|docker|test|local)/i)) {
  if (!fs.existsSync('.fbkey')) {
    throw new Error(`
    Can't find .fbkey, please create one that contains
    fb api keys and secret separated in new line.

    example:
      keykeykeykeykey
      secretsecretsecret
    `);
  }

  const fb = fs.readFileSync('.fbkey').toString().split('\n');
  // Override key and secret
  FB_KEY = fb[0];
  FB_SECRET = fb[1];
}

grantConfig.facebook.key = FB_KEY;
grantConfig.facebook.secret = FB_SECRET;

// PUREST (FACEBOOK)
app.context.facebook = new Purest({
  provider: 'facebook',
  promise: true
});

// GRANT
const grant = new Grant(grantConfig);
app.use(mount(grant));

// MONGODB
const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost/btg';
const mongoConnection = mongoose.connect(mongoUrl);

// MODELS
models(mongoConnection);
app.context.model = mongoConnection.model;

// SESSION STORE
app.keys = appConfig.keys;
app.use(session({
  store: redis({
    url: process.env.REDIS_URL || 'redis://localhost'
  })
}));

// FLASH
app.use(flash());

// 404 MIDDLEWARE
app.use(require('./app/lib/notfound')('notfound'));

// ROUTES
routes(router);
app.use(router.routes());

// STATIC FILE SERVER
app.use(function* () {
  yield send(this, this.path, fsConfig);
});

// SERVER
const PORT = process.env.PORT || appConfig.port;
app.listen(PORT);
console.log(`
  [BTG] Bitching on port: ${PORT}
`);
