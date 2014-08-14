
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var sass = require('node-sass');

// mongodb
var mongoose = require('mongoose');
var mongoDBConnect = process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/heraldg';
mongoose.connect(mongoDBConnect);

// models
var models = require('./model/models');
models.generate();

// routes
var routes = require('./routes');

// all environments
app.configure(function() {
	app.set('port', process.env.PORT || 5000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	app.use(
		sass.middleware({
			src: __dirname + '/public/sass',
			dest: __dirname + '/public',
			debug: true,
      		outputStyle: 'compressed'
		})
	);

	app.use(express.favicon(path.join(__dirname, 'public/img/favicon.ico')));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(app.router);
});

// development only
app.configure('development', function() {
	app.use(express.errorHandler());
});



/*********************************************************
**********************************************************
*
*	HTML pages/handlers
*
*********************************************************
*********************************************************/

app.get('/', routes.index);
app.get('/new', routes.newUrl);
app.get('/:url', routes.goTo);
app.post('/addUrl', routes.addUrl);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
