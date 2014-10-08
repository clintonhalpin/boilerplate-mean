var express = require('express')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var itemCtrl = require('./components/item.ctrl');
var config = require('./config');

// Connect to DB
mongoose.connect('mongodb://localhost:27017/' + config.dbName );

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var router = express.Router();

app.use('/api', router);

router.route('/items').get( itemCtrl.get );
router.route('/items').post( itemCtrl.post );
router.route('/items/:id').get( itemCtrl.getOne );
router.route('/items/:id').put( itemCtrl.update );
router.route('/items/:id').patch( itemCtrl.update );
router.route('/items/:id').delete( itemCtrl.destroy );

app.listen(config.port, function () {
  console.log('Express server listening on port %d', config.port);
});
