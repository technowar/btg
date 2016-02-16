'use strict';

const render = require('./app/lib/render');
const route  = require('koa-route');
const parse  = require('co-body');
const koala  = require('koala');
const app    = koala({
  fileServer: {
    root: './public'
  }
});

// 12 factor
const PORT = process.env.PORT || 3000;

// route
app.use(route.get('/', home));

function* home() {
  this.body = yield render('home', {title: 'Home'});
}

app.listen(PORT);
console.log('Server running on port', PORT);
