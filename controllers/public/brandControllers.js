const { Op } = require('sequelize');
const { Brands, Categories } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.getAllBrands = catchAsync(async (req, res) => {
    const { image, price } = req.query
    var where = {};
    if (image) where.image_isAdded = image
    if (price) where.price = { [Op.gte]: price }

    const brands = await Brands.findAll({ where });

    return res.status(200).send(brands);
});

exports.getBrand = catchAsync(async (req, res, next) => {
    const brand = await Brands.findOne({
        where: { uuid: req.params.uuid },
        include: {
            model: Categories,
            as: 'categories'
        }
    });
    if (!brand) return next(new AppError('Not found', 404));

    return res.status(200).send(brand);
});