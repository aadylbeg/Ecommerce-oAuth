const express = require('express');
const { getAllBanners, getBanner } = require('./../../../controllers/public/bannerControllers');

const router = express.Router();

router.get('/', getAllBanners);
router.get('/:uuid', getBanner);


module.exports = router;