const express = require('express');
const { editBanner, deleteBanner, addBanner } = require('../../../controllers/admin/bannerControllers');
const { getAllBanners, getBanner } = require('./../../../controllers/public/bannerControllers');

const router = express.Router();

router.get('/', getAllBanners);
router.get('/:uuid', getBanner);
router.post('/add', addBanner);
router.patch('/edit/:uuid', editBanner);
router.delete('/delete/:uuid', deleteBanner);

module.exports = router;