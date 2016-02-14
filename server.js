var koa = require('koa');
var app = koa();

app.use(function *(){
    this.body = 'Shit! and stuff';
});

app.listen(3000);
