const { Products } = require('./../../models');
const AppError = require('../../utils/appError');
const catchAsync = require('./../../utils/catchAsync');

const getMyCart = catchAsync(async (req, res, next) => {
    const { carts } = req.body;
    var updated_carts = [];

    for (var i = 0; i < carts.length; i++) {
        const product = await Products.findOne({ where: { id: carts[i].product_id } });

        if (!product) return next(new AppError('Product did not found', 400));
        if (product.stock_quantity > 0) {
            var quantity;
            if (product.stock_quantity > carts[i].quantity) quantity = carts[i].quantity;
            else quantity = product.stock_quantity;

            updated_carts.push({
                product_id: carts[i].product_id,
                quantity: quantity
            });
        }
    }

    return res.status(200).send(updated_carts);
});

module.exports = getMyCart  