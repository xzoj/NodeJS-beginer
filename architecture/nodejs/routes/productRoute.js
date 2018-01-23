var productController = require('../controllers/productController');

module.exports = function(app){
	// product api.
	app.route('/_api/v1/products')
		.get(productController.getList)
		.post(productController.add);	

	app.route('/_api/v1/products/:id')
		.get(productController.getDetail)
		.put(productController.update)
		.delete(productController.delete);	
		
}