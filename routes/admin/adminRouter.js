const express = require('express');
const { protect, login, updateAdmin } = require('./../../controllers/admin/adminControllers');

const router = express.Router();

router.post('/login', login);

router.use(protect);

router.use('/banners', require('./routes/bannersRouter'));
router.use('/categories', require('./routes/categoriesRouter'));
router.use('/brands', require('./routes/brandsRouter'));
router.use('/products', require('./routes/productsRouter'));
router.use('/users', require('./routes/usersRouter'));
router.use('/orders', require('./routes/ordersRouter'));

router.post('/updateAdmin', updateAdmin);

module.exports = router;