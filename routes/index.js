var mongoose = require('mongoose');
var UrlModel = mongoose.model('Url');

/*
 * GET home page.
 */

exports.index = function(req, res){
	res.redirect('http://heraldgutierrez.com')
};

exports.newUrl = function(req, res) {
	res.render('new');
};

exports.goTo = function(req, res) {
	var param = req.params.url;

	UrlModel.findOne({ param : param },
		function(err, url) {
			if(err)
				throw err;

			if(url == null) {
				res.redirect('/');
			} else {
				var newUrl = url.url;
				res.redirect(newUrl);
			}
		}// end: function
	);// end: findOne
};

exports.addUrl = function(req, res) {
	var url = req.body.url;
	var shorten = req.body.shorten;

	var urlModel = new UrlModel({
		url : url,
		param : shorten
	});

	// need to check if the param already exists
	UrlModel.findOne({ param : shorten },
		function(err, result_1) {
			// if(result == null) --> no param exists, okay to save new user
			if(result_1 == null) {
				// save new user
				urlModel.save(function(err, result_2) {
					res.redirect('/new');
				});
			} else {
				// reload home page with warning that username already exists
				res.redirect('/new?warning=paramExists');
			}
		}// end: function
	);// end: findOne

}; // end: signup