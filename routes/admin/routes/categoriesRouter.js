const express = require('express');
const { addCategory, editCategory, deleteCategory } = require('../../../controllers/admin/categoryControllers');
const { getAllCategories, getCategory } = require('./../../../controllers/public/categoryControllers');

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:uuid', getCategory);
router.post('/add', addCategory);
router.patch('/edit/:uuid', editCategory);
router.delete('/delete/:uuid', deleteCategory);

module.exports = router;