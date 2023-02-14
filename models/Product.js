const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
  
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoINcrement: true
    },
    // define columns
   product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      isNumeric: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      isFloat: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category' ,
        key: 'id'
      }
    }
    // take a look at the mini project in the Trip.js model has a location_id which is a foreign key. This is how you will add your category_id 
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
