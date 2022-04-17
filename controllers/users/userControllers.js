const catchAsync = require('../../utils/catchAsync');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const sharp = require('sharp');
const { Users } = require('./../../models');
const { createSendToken } = require('./../../utils/createSendToken');
const AppError = require('./../../utils/appError');
const fs = require('fs')

exports.getMe = catchAsync(async (req, res, next) => {
    return res.status(200).send(req.user);
});

exports.updateMe = catchAsync(async (req, res, next) => {
    const { username, phone_number, address } = req.body;
    const user = await Users.findOne({ where: { uuid: [req.user.uuid] } });

    if (!username && !phone_number && !address) return next(new AppError('Invalid credentials', 400));

    if (username) await user.update({ username: username });
    if (phone_number) await user.update({ phone_number });
    if (address) await user.update({ address });

    createSendToken(user, 200, res);
});

exports.updateMyPassword = catchAsync(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || newPassword.length < 5) return next(new AppError('Invalid Credentials', 400));

    const user = await Users.findOne({ where: { uuid: req.user.uuid } });

    if (!(await bcrypt.compare(currentPassword, user.password)))
        return next(new AppError('Your current password is wrong', 401));

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    createSendToken(user, 200, res);
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

    const user = await Users.findOne({ where: { uuid: req.user.uuid } });
    if (!user) return next(new AppError('Not found', 404));

    await sharp(req.file.buffer)
        .toFormat('webp')
        .webp({ quality: 70 })
        .toFile(`./public/users/${req.user.uuid}.webp`);

    await user.update({ image_isAdded: true });

    return res.status(200).json({ msg: 'Photo Uploaded Successfully' });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    if (req.body.email != req.user.email) return next(new AppError('Email is not correct', 400));

    if (req.user.image_isAdded === true) {   
        fs.unlink(`./public/users/${req.user.uuid}.webp`, (err) => {
            // if (err) return next(new AppError('Not found photo', 404));
        });
    }

    await Users.destroy({ where: { email: req.user.email } });

    res.status(200).send('User Successfully Deleted');
});

exports.deleteMyPhoto = catchAsync(async (req, res, next) => {
    const user = await Users.findOne({ where: { uuid: req.user.uuid, image_isAdded: true }  });
    if (!user) return next(new AppError('Not found', 404));
    
    fs.unlink(`./public/users/${user.uuid}.webp`, (err) => { 
        if (err) return next(new AppError('Not found photo', 404));

        user.update({ image_isAdded: false })
        return res.status(200).json({ msg: 'Photo Deleted Successfully' })
    })
});