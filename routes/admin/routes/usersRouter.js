const express = require('express');
const { getAllUsers, getUser, editUser } = require('../../../controllers/admin/userControllers ');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:uuid', getUser);
router.patch('/edit/:uuid', editUser);
// router.post('/add', );
// router.delete('/delete/:uuid', );

module.exports = router;