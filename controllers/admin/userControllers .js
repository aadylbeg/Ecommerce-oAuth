const { Users, Orders } = require('../../models');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const bcrypt = require('bcryptjs');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await Users.findAll();
    return res.status(200).send(users);
});

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await Users.findOne({
        where: { uuid: req.params.uuid },
        include: {
            model: Orders,
            as: 'orders'
        }
    });

    if (!user) return next(new AppError('Not Found', 404));
    res.status(200).send(user);
});

exports.editUser = catchAsync(async (req, res, next) => {
    var { username, password, phone_number, address } = req.body;
    
    const user = await Users.findOne({ where: { uuid: req.params.uuid } });
    if (!user) return next(new AppError('Not Found', 404));
    
    if (password)
        password = await bcrypt.hash(password, 12)
        await user.update({ password });
    if (username) await user.update({ username });
    if (phone_number) await user.update({ phone_number });
    if (address) await user.update({ address });
    
    res.status(200).send(user);
});