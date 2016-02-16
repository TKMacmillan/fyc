'use strict';

var app = require('koa')()
, gzip = require('koa-gzip')
, serve = require('koa-static')
, views = require('koa-render')
, bodyParser = require('koa-bodyparser')
, Router = require('koa-router')
, general = new Router();

app.use(bodyParser());

app.use(serve(__dirname+'/public'));

app.use(gzip());

// append view renderer
app.use(views('./views', {
  map: { html: 'handlebars' },
  cache: false
}));

general.get('/find-your-course', function*() {
  this.body = yield this.render('find-your-course');
});

general.get('/', function*() {
  this.redirect('/find-your-course');
});

app.use(general.middleware());

// start server
app.listen(process.env.PORT || 2000);