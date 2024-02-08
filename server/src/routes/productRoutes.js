const express = require('express');
const router = express.Router();

const fileServerUpload = require('../middleware/fileServerUpload');
const ProductController = require('../controllers/productController');
const ProductPolicy = require('../policies/productPolicy')
const FilePolicy = require('../policies/filePolicy')
const verifyAuth = require('../middleware/verifyAuth');

module.exports = () => {
// get all prod
router.get('/', ProductController.getAllProducts);

//get onsale prod
router.get('/sale', ProductController.getSaleProducts);

//get by id
router.get('/:id', ProductController.getProductById);


//add prod
router.post('/', [verifyAuth.auth, ProductPolicy.validateProduct, FilePolicy.filePayloadExists, FilePolicy.fileSizeLimiter, FilePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg', '.gif']), fileServerUpload], ProductController.postProducts);
//get by id

//update by id
router.put('/:id', [verifyAuth.auth, ProductPolicy.validateProduct, FilePolicy.filePayloadExists, FilePolicy.fileSizeLimiter, FilePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg', '.gif']), fileServerUpload], ProductController.editProductById);

//delete by id
router.delete('/:id', [verifyAuth.auth, verifyAuth.admin],
    ProductController.deleteProductById);


return router
}
