const express = require('express');
const { getAllBrands, getBrand } = require('../../../controllers/public/brandControllers');
const { addBrand, editBrand, deleteBrand } = require('../../../controllers/admin/brandControllers');
const router = express.Router();

router.get('/', getAllBrands);
router.get('/:uuid', getBrand);
router.post('/add', addBrand);
router.patch('/edit/:uuid', editBrand);
router.delete('/delete/:uuid', deleteBrand);

module.exports = router;