const { Brands, Categoriesandbrands } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.addBrand = catchAsync(async (req, res, next) => {
    const { name, categoryIds } = req.body;
    const newBrand = await Brands.create({ name });

    if (categoryIds)
        for (categoryId of req.body.categoryIds) {
            await Categoriesandbrands.create({
                categoryId,
                brandId: newBrand.id
            });
        }

    return res.status(201).send(newBrand);
});

exports.editBrand = catchAsync(async (req, res, next) => {
    const brand = await Brands.findOne({ where: { uuid: req.params.uuid } });
    if (!brand) return next(new AppError('Not found', 404));

    await brand.update(req.body)

    if (req.body.categoryIds) {
        await Categoriesandbrands.destroy({ where: { brandId: brand.id } });
        for (categoryId of req.body.categoryIds) {
            await Categoriesandbrands.create({
                categoryId,
                brandId: brand.id
            });
        };
    };

    return res.status(200).send(brand);
});

exports.deleteBrand = catchAsync(async (req, res, next) => {
    const brand = await Brands.findOne({ where: { uuid: req.params.uuid } });
    if (!brand) return next(new AppError('Not found', 404));

    await brand.destroy();

    return res.status(200).json({ msg: 'Successfully Deleted' });
});