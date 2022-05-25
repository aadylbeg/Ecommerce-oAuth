const { promisify } = require('util');
const { Users } = require('./../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createSendToken } = require('./../../utils/createSendToken');
const { sendMail } = require('./../../utils/sendMail');
const AppError = require('../../utils/appError');
const catchAsync = require('./../../utils/catchAsync');

// const { contained } = require('sequelize/lib/operators');

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) return next(new AppError('You are not logged in', 401));

    const decoded = await promisify(jwt.verify)(token, 'adil');

    const freshUser = await Users.findOne({ where: { uuid: [decoded.id] } });

    if (!freshUser) return next(new AppError('The user belonging to this token is no longer exists', 401));

    req.user = freshUser;
    next();
});

exports.sendMeCode = catchAsync(async (req, res, next) => {
    var { email } = req.body;
    if (email.length<5) return next(new AppError('Invalid Email', 400));

    const user = await Users.findOne({ where: { email } });
    if (user) return next(new AppError('User already signed up', 400));

    var sms_code = Math.floor(Math.random() * 10000);
    await sendMail({to: email, code: sms_code })
    
    await Users.create({ email, sms_code, isVerified: false });

    res.status(200).send({ msg: 'Succesfully sended' });
});

exports.verifyMyCode = catchAsync(async (req, res, next) => {
    var { email, sms_code } = req.body;
    if (!email || !sms_code) return next(new AppError('Invalid Credentials', 400));

    const user = await Users.findOne({ where: { email, sms_code } });
    if (!user) return next(new AppError('Not found', 400));

    createSendToken(user, 201, res);
});

exports.signUp = catchAsync(async (req, res, next) => {
    var { username, email, password, address, phone_number } = req.body;
    if (!username || !email || !password || password.length < 5 || !address || !phone_number)
        return next(new AppError('Invalid Credentials', 400));
    password = await bcrypt.hash(password, 12);

    const user = await Users.findOne({ where: { email } });
    if (!user) return next(new AppError('Not found', 400));
    await user.update({ username, email, password, address, phone_number, isVerified: true });
    res.status(200).send(user);
    // createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return next(new AppError('Please provide email and password', 400));

    const user = await Users.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password)))
        return next(new AppError('Incorrect username or password', 401));

    createSendToken(user, 200, res);
});

exports.sendMeCodeToRestore = catchAsync(async (req, res, next) => {
    var { phone_number } = req.body;
    if (!phone_number || phone_number.length < 8) return next(new AppError('Invalid Credentials', 400));

    const user = await Users.findOne({ where: { phone_number, isVerified: true } });
    if (!user) return next(new AppError('Not found', 400));

    // var sms_code = Math.floor(Math.random() * 10000);
    var sms_code = '2222'
    await user.update({ sms_code });

    // send sms_code

    createSendToken(user, 201, res);
    // res.status(200).send({ msg: 'Succesfully sended' });
});

exports.verifyMyCodeToRestore = catchAsync(async (req, res, next) => {
    var { phone_number, sms_code, newPassword } = req.body;
    if (!phone_number || !sms_code || newPassword.length < 5) return next(new AppError('Invalid Credentials', 400));

    const user = await Users.findOne({ where: { phone_number, sms_code, isVerified: true } });
    if (!user) return next(new AppError('Not found', 400));
    newPassword = await bcrypt.hash(newPassword, 12);

    await user.update({ where: { password: newPassword } });

    // Token gerekdal
    createSendToken(user, 201, res);
});