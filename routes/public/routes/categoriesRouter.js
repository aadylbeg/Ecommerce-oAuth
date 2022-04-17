const express = require('express');
const { getAllCategories, getCategory } = require('./../../../controllers/public/categoryControllers');

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:uuid', getCategory);

module.exports = router;