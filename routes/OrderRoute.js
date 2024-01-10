const express = require('express');
const orderController = require('../controller/OrderController');
const router = express.Router();
const verifyUser = require('../middleware/AuthMiddleware')

router.post('/create', verifyUser, orderController.create);
router.get('/find-by-id/:id', verifyUser, orderController.findById);
router.put('/update/:id', verifyUser, orderController.update);
router.delete('/delete-by-id/:id', verifyUser, orderController.deleteById);
router.get('/find-all', verifyUser, orderController.findAll);
router.get('/find-all-count', verifyUser, orderController.findCount);
router.get('/find-income', verifyUser, orderController.findAllIncome);

module.exports = router;
