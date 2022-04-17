const { Orders, OrderedProducts, Products } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.getAllOrders = catchAsync(async (req, res, next) => {
    const { status, user_phone } = req.query;
    var where = {}
    if (status) where.status = status;
    if (user_phone) where.user_phone = '+993' + user_phone;

    const orders = await Orders.findAll({ where });

    return res.status(200).send(orders);
});

exports.getOrder = catchAsync(async (req, res, next) => {
    const order = await Orders.findOne({
        where: { uuid: req.params.uuid },
        include:
        {
            model: OrderedProducts,
            as: 'order_products'
        }
    });
    if (!order) return next(new AppError('Not found', 404));

    return res.status(200).send(order);
});

exports.editOrder = catchAsync(async (req, res, next) => {
    const order = await Orders.findOne({ where: { uuid: req.params.uuid } });
    if (!order) return next(new AppError('Not found', 404));

    if (req.body.status == 'delivered') {
        let order_products = await OrderedProducts.findAll({ where: { orderId: order.id } });
        for (a of order_products) {
            const product = await Products.findOne({ where: { id: a.productId } });
            await product.update({ stock_quantity: product.stock_quantity - a.quantity });
        }
    }

    await order.update({ status: req.body.status });
    return res.status(200).send(order);
});