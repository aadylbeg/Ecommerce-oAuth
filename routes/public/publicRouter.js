const express = require('express');
const router = express.Router();

router.use('/banners', require('./routes/bannersRouter'));
router.use('/categories', require('./routes/categoriesRouter'));
router.use('/brands', require('./routes/brandsRouter'));
router.use('/products', require('./routes/productsRouter'));

module.exports = router;