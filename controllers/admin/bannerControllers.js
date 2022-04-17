const AppError = require('../../utils/appError');
const { Banners } = require('./../../models');
const catchAsync = require('./../../utils/catchAsync');

exports.addBanner = catchAsync(async (req, res, next) => {
    const newBanner = await Banners.create(req.body);
    return res.status(201).send(newBanner);
});

exports.editBanner = catchAsync(async (req, res, next) => {
    const banner = await Banners.findOne({ where: { uuid: req.params.uuid } });
    if (!banner) return next(new AppError('Not found', 404));

    await banner.update(req.body);
    return res.status(200).send(banner);
});

exports.deleteBanner = catchAsync(async (req, res, next) => {
    const banner = await Banners.findOne({ where: { uuid: req.params.uuid } })
    if (!banner) return next(new AppError('Not found', 404));

    await banner.destroy();
    return res.status(200).send({ msg: 'Successfully deleted' });
});