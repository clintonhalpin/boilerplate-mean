var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    itemCtrl = require('./api/components/item.ctrl'),
    config = require('./config');

// Connect to DB
mongoose.connect('mongodb://localhost:27017/' + config.dbName );

var app = express();
var apiRouter = express.Router();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('views', __dirname + '/client/dist/');

app.use(require('connect-livereload')({
    port: 35729
}));

// /api All routers are 
app.use('/api', apiRouter);
apiRouter.route('/items').get( itemCtrl.get );
apiRouter.route('/items').post( itemCtrl.post );
apiRouter.route('/items/:id').get( itemCtrl.getOne );
apiRouter.route('/items/:id').put( itemCtrl.update );
apiRouter.route('/items/:id').patch( itemCtrl.update );
apiRouter.route('/items/:id').delete( itemCtrl.destroy );

app.get('/', function(req, res) {
  res.render('index.html');
});

// 404 Page - must be the last route defined
app.use(function(req, res, next){
  res.render('404.html', 404);
});

app.listen(config.port, function () {
  console.log('Express server listening on port %d', config.port);
});
