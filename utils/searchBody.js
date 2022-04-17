const { Op } = require("sequelize");

const capitalize = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

exports.search_body = (keyword) => {
    let keywords = [
        `%${keyword}%`,
        `%${keyword.toLowerCase()}%`,
        `%${capitalize(keyword.toLowerCase())}%`,
    ];

    return {
        [Op.or]: [
            {
                name: {
                    [Op.like]: {
                        [Op.any]: keywords,
                    },
                },
            },
            {
                description: {
                    [Op.like]: {
                        [Op.any]: keywords,
                    },
                },
            }
        ],
    };
};