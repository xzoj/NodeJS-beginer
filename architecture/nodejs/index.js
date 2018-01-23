const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

var app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myshop');
mongoose.Promise = global.Promise;

app.use(cors());
app.use(fileUpload());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static('./public'));

var productRoute = require('./routes/productRoute');
productRoute(app);

// image api.	
app.post('/_api/v1/images', function(req, res) {
	console.log(req.files);
	if (!req.files){
		return res.status(400).send('No files were uploaded.');
	}
	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	let sampleFile = req.files.myFile;	

	// Use the mv() method to place the file somewhere on your server
	sampleFile.mv('./public/images/' + sampleFile.name, function(err) {
		if (err){
		  return res.status(500).send(err);
		}
		res.send('http://localhost:3000/images/' + sampleFile.name);
	});
});	

app.listen(3000, function(){
	console.log('Running at port 3000!');
});