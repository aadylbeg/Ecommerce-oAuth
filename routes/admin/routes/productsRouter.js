const express = require('express');
const { getAllProducts, getProduct, addProduct, editProduct, deleteProduct, uploadPhoto, savePhoto } = require('../../../controllers/admin/productControllers');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:uuid', getProduct);
router.post('/add', addProduct);
router.patch('/edit/:uuid', editProduct);
router.patch('/upload-photo/:uuid', uploadPhoto, savePhoto);
router.delete('/delete/:uuid', deleteProduct);

module.exports = router;