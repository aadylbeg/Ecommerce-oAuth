const { Categories, Categoriesandbrands, ProductsandCategories } = require('./../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.addCategory = catchAsync(async (req, res, next) => {
    const { name, brandIds, productIds } = req.body;
    const newCategory = await Categories.create({ name });
    if (brandIds)
        for (brandId of req.body.brandIds) {
            await Categoriesandbrands.create({
                brandId,
                categoryId: newCategory.id
            })
        }

    if (productIds)
        for (productId of req.body.productIds) {
            await ProductsandCategories.create({
                productId,
                categoryId: newCategory.id
            })
        }

    return res.status(201).send(newCategory);
});

exports.editCategory = catchAsync(async (req, res, next) => {
    const category = await Categories.findOne({ where: { uuid: req.params.uuid } });
    if (!category) return next(new AppError('Not found', 404));

    await category.update(req.body);;

    if (req.body.brandIds) {
        await Categoriesandbrands.destroy({ where: { categoryId: category.id } });
        for (brandId of req.body.brandIds) {
            await Categoriesandbrands.create({
                brandId,
                categoryId: category.id
            })
        }
    };

    if (req.body.productIds) {
        await ProductsandCategories.destroy({ where: { categoryId: category.id } });
        for (productId of req.body.productIds) {
            await ProductsandCategories.create({
                productId,
                categoryId: category.id
            });
        }
    }

    return res.status(200).send(category);
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
    const category = await Categories.findOne({ where: { uuid: req.params.uuid } });
    if (!category) return next(new AppError('Not found', 404));

    await category.destroy();

    return res.status(200).json({ msg: 'Successfully Deleted' });
});