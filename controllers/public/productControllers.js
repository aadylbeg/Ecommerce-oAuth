const { Op } = require('sequelize');
const { Products, Brands, Categories } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const { search_body } = require('../../utils/searchBody');

exports.getAllProducts = catchAsync(async (req, res, next) => {
    const { price_from, price_to, sort_by, as, keyword, categoryIds, brandId, limit, offset } = req.query;
    var where = {}, order;
    if (keyword) where = search_body(keyword);
    if (categoryIds) where.categoryId = categoryIds;
    if (brandId) where.brandId = brandId;
    if (price_from) where.price = { [Op.gte]: price_from };
    if (price_to) where.price = { ...this.price, [Op.lte]: price_to };
    if (sort_by && as) order = [[sort_by, as]]

    const products = await Products.findAll({
        where,
        include: {
            model: Categories,
            as: 'category'
        },
        order,
        limit,
        offset,
        attributes: {
            exclude: ["is_active", "stock_quantity", "createdAt", "updatedAt"]
        }
    });
    return res.status(200).send(products);
});

exports.getProduct = catchAsync(async (req, res, next) => {
    const product = await Products.findOne({
        where: { uuid: req.params.uuid },
        include: [
            {
                model: Brands,
                as: 'brand'
            },
            {
                model: Categories,
                as: 'category'
            }
        ],
        attributes: {
            exclude: ["is_active", "stock_quantity", "createdAt", "updatedAt"]
        }
    });
    if (!product) return next(new AppError('Not found', 404));

    return res.status(200).send(product);
});