const { Banners } = require('./../../models');
const AppError = require('../../utils/appError');
const catchAsync = require('./../../utils/catchAsync');

exports.getAllBanners = catchAsync(async (req, res, next) => {
    const banners = await Banners.findAll()
    res.status(200).send(banners)
});

exports.getBanner = catchAsync(async (req, res, next) => {
    const banner = await Banners.findOne({ where: { uuid: req.params.uuid } });
    if (!banner) return next(new AppError('Not found', 404));

    res.status(200).send(banner);
});