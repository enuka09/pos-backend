const express = require('express');
const productController = require('../controller/ProductController');
const router = express.Router();
const verifyUser = require('../middleware/AuthMiddleware')

router.post('/create', verifyUser, productController.create);
router.get('/find-by-id/:id', verifyUser, productController.findById);
router.put('/update/:id', verifyUser, productController.update);
router.delete('/delete-by-id/:id', verifyUser, productController.deleteById);
router.get('/find-all', verifyUser, productController.findAll);
router.get('/find-all-min', verifyUser, productController.findAllMin);
router.get('/find-all-count', verifyUser, productController.findCount);

module.exports = router;
