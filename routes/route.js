const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

const { authentication, authorize } = require('../middleware/auth');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/logout', controller.logout);
router.get('/', authentication, authorize, controller.getAllCustomersData);
router.get('/customer', authentication, controller.getCustomerData);

module.exports = router; 