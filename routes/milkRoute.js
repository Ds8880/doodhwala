const express = require('express');
const router = express.Router();
const controller = require('../controllers/milkController');

const { authentication, authorize } = require('../middleware/auth');


router.post('/create/:id', authentication, authorize, controller.createMilkRecord);
router.get('/allMilkRecord/', authentication, authorize, controller.getAllMilkRecord);
router.get('/byBuyerId/:id', authentication, authorize, controller.getMilkRecordByBuyerId);
router.patch('/updateRecord/:id', authentication, authorize, controller.updateCustomerMilkRecord);
router.delete('/deleteRecord/:id', authentication, authorize, controller.deleteCustomerMilkRecord);
router.get('/summary/:id', authentication, authorize, controller.summaryMilkRecord);
router.get('/monthlyData/:id', authentication, authorize, controller.MonthWiseData);

module.exports = router;