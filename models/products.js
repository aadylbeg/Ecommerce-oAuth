'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate({ Categories, Brands, OrderedProducts }) {
      this.belongsToMany(Categories, {
        through: 'ProductsandCategories',
        foreignKey: 'productId',
        as: 'category'
      });
      this.belongsTo(Brands, {
        foreignKey: 'brandId',
        as: 'brand'
      });
      this.hasMany(OrderedProducts, {
        foreignKey: 'productId',
        as: 'product'
      });
    }
  };
  Products.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING
    },
    image_isAdded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    price: {
      type: DataTypes.INTEGER
    },
    given_price: {
      type: DataTypes.INTEGER
    },
    discount: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    categoryId: {
      type: DataTypes.INTEGER
    },
    brandId: {
      type: DataTypes.INTEGER
    },
    stock_quantity: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    tableName: 'products',
    modelName: 'Products',
  });

  Products.beforeSave(async (products, options) => {

    products.price = products.given_price

    if (products.discount)
      products.price = products.given_price - products.given_price * (products.discount / 100)

    // if (!products.discount) await products.findAll({ attributes: { exclude: "given_price" } })
  });

  return Products;
};