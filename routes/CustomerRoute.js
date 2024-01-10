const express = require('express');
const customerController = require('../controller/CustomerController');
const router = express.Router();
const verifyUser = require('../middleware/AuthMiddleware')

router.post('/create', verifyUser, customerController.create);
router.get('/find-all', verifyUser, customerController.findAll);
router.delete('/delete-by-id/:id', verifyUser, customerController.deleteById);
router.put('/update/:id', verifyUser, customerController.update);
router.get('/find-by-id/:id', verifyUser, customerController.findById);
router.get('/find-all-count', verifyUser, customerController.findCount);

module.exports = router;
