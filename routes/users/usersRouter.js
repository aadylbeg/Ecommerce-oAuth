const express = require('express');
const { signUp, login, sendMeCode, verifyMyCode, protect, sendMeCodeToRestore, verifyMyCodeToRestore } = require('../../controllers/users/authControllers');
const { getMe, updateMe, uploadPhoto, deleteMe, savePhoto, updateMyPassword, deleteMyPhoto } = require('../../controllers/users/userControllers');
const { addMyOrder, getMyOrders, deleteMyOrder } = require('../../controllers/users/orderControllers');
const passport = require('passport');
require('./../../oauth')

const router = express.Router();
router.post('/send-me-code', sendMeCode);
router.post('/send-me-code-to-restore', sendMeCodeToRestore);
router.post('/verify-my-code', verifyMyCode);
router.post('/login', login);
router.use(protect)
router.post('/verify-my-code-to-restore', verifyMyCodeToRestore);
router.post('/sign-up', signUp);
router.get('/get-me', getMe);
router.patch('/update-my-password', updateMyPassword);
router.patch('/update-me', updateMe);
router.post('/upload-photo', uploadPhoto, savePhoto);
router.delete('/delete-me', deleteMe);
router.delete('/delete-my-photo', deleteMyPhoto)
router.post('/orders/add', addMyOrder);
router.get('/orders/get-my-orders', getMyOrders);
router.delete('/orders/delete/:uuid', deleteMyOrder);
router.post('/get-my-cart', require('./../../controllers/users/cartController'));

module.exports = router;