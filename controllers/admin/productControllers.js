const { Op } = require('sequelize');
const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('../../utils/catchAsync');
const { Products, Brands, Categories, ProductsandCategories } = require('../../models');
const { search_body } = require('../../utils/searchBody');
const AppError = require('../../utils/appError');

exports.getAllProducts = catchAsync(async (req, res, next) => {
    const { active, price_from, price_to, sort_by, as, keyword, brandIds, categoryIds, limit, offset } = req.query;
    var where = {}, cat_where = {}, required = false, order;
    if (keyword) where = search_body(keyword)
    if (active) where.is_active = active;
    if (brandIds) where.brandId = brandIds;
    if (categoryIds) { cat_where.id = categoryIds, required = true }
    if (price_from) where.price = { [Op.gte]: price_from };
    if (price_to) where.price = { ...this.price, [Op.lte]: price_to };
    if (sort_by && as) order = [[sort_by, as]];

    const products = await Products.findAll({
        where,
        include: {
            model: Categories,
            as: 'category',
            where: cat_where,
            attributes: [],
            required
        },
        order,
        limit,
        offset
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
        ]
    });
    if (!product) return next(new AppError('Not found', 404));

    return res.status(200).send(product);
});

exports.addProduct = catchAsync(async (req, res) => {
    const newProduct = await Products.create(req.body)

    if (req.body.categoryIds) {
        for (categoryId of req.body.categoryIds) {
            await ProductsandCategories.create({
                categoryId,
                productId: newProduct.id,
            });
        }
    }

    return res.status(201).send(newProduct);
});

exports.editProduct = catchAsync(async (req, res, next) => {
    const product = await Products.findOne({ where: { uuid: req.params.uuid } });
    if (!product) return next(new AppError('Not found', 404));

    await product.update(req.body);
    if (req.body.categoryIds) {
        await ProductsandCategories.destroy({ where: { productId: product.id } });
        for (categoryId of req.body.categoryIds) {
            await ProductsandCategories.create({
                categoryId,
                productId: product.id
            })
        }
    }
    return res.status(200).send(product);
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
    const product = await Products.findOne({ where: { uuid: req.params.uuid } });
    if (!product) return next(new AppError('Not found', 404));

    await product.destroy();
    return res.status(200).json({ msg: 'Successfully Deleted' });
});


// Multer Properties
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadPhoto = upload.single('photo');

exports.savePhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next(new AppError('Please provide Image', 404));

    const product = await Products.findOne({ where: { uuid: req.params.uuid } });
    if (!product) return next(new AppError('Not found', 404));

    await sharp(req.file.buffer)
        .toFormat('webp')
        .webp({ quality: 70 })
        .toFile(`./public/products/${product.uuid}.webp`);

    await product.update({ image_isAdded: true });

    return res.status(200).json({ msg: 'Photo Uploaded Successfully' });
});
