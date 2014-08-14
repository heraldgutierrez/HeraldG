var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// comparing _id
// var ObjectId = mongoose.Types.ObjectId;
// var id = new ObjectId('id string');
// OR
// var id = mongoose.Types.ObjectId('id string');

exports.generate = generate;

function generate() {
	var UrlModel = urlModel();
}


function urlModel() {
	var urlSchema = new Schema({
		url			: String,
		param		: String
	});

	return mongoose.model('Url', urlSchema);
}