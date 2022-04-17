const express = require('express');
const { getAllOrders, getOrder, editOrder } = require('../../../controllers/admin/orderControllers');

const router = express.Router();

router.get('/', getAllOrders);
router.get('/:uuid', getOrder);
router.patch('/edit/:uuid', editOrder);

module.exports = router;