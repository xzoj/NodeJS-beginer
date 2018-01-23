var mongoose = require('mongoose');

module.exports = mongoose.model('products', {
	code: {
		type: String,
		required: 'Please enter product code.'
	},
	name: String,
	description: String,	
	unitPrice: Number,
	imagesUrl: String,
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
	status: {
		type: Number,
		default: 1
	}
});