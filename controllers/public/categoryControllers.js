const { Categories } = require('./../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.getAllCategories = catchAsync(async (req, res, next) => {
    const categories = await Categories.findAll();
    return res.status(200).send(categories);
});

exports.getCategory = catchAsync(async (req, res, next) => {
    const category = await Categories.findOne({
        where: { uuid: req.params.uuid },
        include: [
            'brands',
            'product'
        ],
    });
    if (!category) return next(new AppError('Not found', 404));

    return res.status(200).send(category);
});;