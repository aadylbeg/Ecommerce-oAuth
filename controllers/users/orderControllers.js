const { Op } = require('sequelize')
const { Orders, Products, OrderedProducts } = require('./../../models');
const AppError = require('../../utils/appError');
const catchAsync = require('./../../utils/catchAsync');

exports.getMyOrders = catchAsync(async (req, res, next) => {
    const order = await Orders.findAll({
        where: {
            userId: req.user.id
        },
        include: {
            model: OrderedProducts,
            as: 'order_products'
        }
    });

    res.status(200).send(order);
});

exports.addMyOrder = catchAsync(async (req, res, next) => {
    let checked_products = [],
        total_price = 0;

    for (p of req.body.products) {
        var product = await Products.findOne({ where: { id: p.id, stock_quantity: { [Op.gte]: p.quantity } } });
        if (!product) return next(new AppError('Something not Found/Enough'));

        product.quantity = p.quantity
        checked_products.push(product);
        total_price += product.price * p.quantity;
    }

    const newOrder = await Orders.create({
        total_price,
        address: req.body.address,
        user_name: req.body.user_name,
        user_email: req.user.email,
        user_phone: '+993' + req.body.user_phone,
        userId: req.user.id,
    });

    for (cp of checked_products) {
        await OrderedProducts.create({
            price: cp.price,
            quantity: cp.quantity,
            total_price: cp.quantity * cp.price,
            productId: cp.id,
            orderId: newOrder.id
        });
    };

    res.status(200).json({ msg: 'Ordered', data: { newOrder } });
});

exports.deleteMyOrder = catchAsync(async (req, res, next) => {
    const order = await Orders.findOne({ where: { uuid: req.params.uuid } });

    if (!order || order.status != 'delivered') return next(new AppError('Not found or not delivered', 400));
    if (req.user.id != order.userId) return next(new AppError('Not Found', 404));

    const orderProducts = await OrderedProducts.findAll({ where: { orderId: order.id } });

    if (orderProducts.length > 1) for (i of orderProducts) { await i.destroy(); }
    if (orderProducts.length === 1) await orderProducts.destroy();
    await order.destroy();

    res.status(200).send({ msg: 'Succesfully deleted' });
});