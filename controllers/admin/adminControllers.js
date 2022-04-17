const AppError = require('../../utils/appError');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Admin } = require('./../../models');
const catchAsync = require('./../../utils/catchAsync');

const signToken = (id) => {
    return jwt.sign({ id }, 'adil', {
        expiresIn: '24h',
    });
};

const createSendToken = (admin, statusCode, res) => {
    const token = signToken(admin.uuid);
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    });

    res.status(statusCode).json({ token });
};

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return next(new AppError('You are not logged as an Admin!', 401));

    const decoded = await promisify(jwt.verify)(token, 'adil');

    const freshAdmin = await Admin.findOne({ where: { uuid: decoded.id } });
    if (!freshAdmin) return next(new AppError('The user belonging to this token is no longer exists', 401));

    req.admin = freshAdmin;
    next();
});

exports.login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) return next(new AppError('Please provide username and password', 400));

    const admin = await Admin.findOne({ where: { username } });
    if (!admin || !(await bcrypt.compare(password, admin.password)))
        return next(new AppError('Incorrect username or password', 400));

    createSendToken(admin, 200, res);
});

exports.updateAdmin = catchAsync(async (req, res, next) => {
    const { username, currentPassword, newPassword } = req.body;
    if (!username && !currentPassword) return next(new AppError('Please provide username or passwords', 400));

    const admin = await Admin.findOne({ where: { uuid: req.admin.uuid } })
    if (currentPassword && newPassword) {
        if (!await bcrypt.compare(currentPassword, admin.password)) return next(new AppError('Current password is not correct', 400));
        admin.update({ password: await bcrypt.hash(newPassword, 12) });
    };

    admin.update({ adminName: newName })
});