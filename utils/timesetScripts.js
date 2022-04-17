const { Users } = require('../models');
const { Op } = require('sequelize');

exports.timeset = async () => {
    var now = new Date();
    now.setMinutes(now.getMinutes() - 5)
    await Users.update(
        { sms_code: null },
        {
            where:
            {
                isVerified: false,
                updatedAt: { [Op.lte]: now }
            }
        });
}