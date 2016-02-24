'use strict';

const render = require('./app/lib/render');
const route  = require('koa-route');
const send   = require('koa-send');
const parse  = require('co-body');
const koala  = require('koala');
const app    = koala();

// 12 factor
const PORT = process.env.PORT || 3000;

// route
const root     = require('./app/routes/root');
const question = require('./app/routes/question');

app.use(route.get('/', root.getHome));
app.use(route.get('/question', question.getQuestion));

// Static file server
app.use(function * (){
  let opt = {
    root   : __dirname + '/public',
    maxage: 0,
    gzip: false
  };

  // Enable gzip and maxage in prod
  if (process.env.NODE_ENV && process.env.NODE_ENV.match(/prod/)) {
    opt.maxage = 1000*60*60*24*7;
    opt.gzip   = true;
  }

  yield send(this, this.path, opt);
})

app.listen(PORT);
console.log('Server running on port', PORT);
