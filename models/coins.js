const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Coins extends Model {};

Coins.init(
  {
    id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
    },
    coin_name:{
      type:DataTypes.STRING,
      allowNull: false  
    },
    amount:{
      type:DataTypes.INTEGER,
      allowNull: false
    },
    user_id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key:'id'
      }
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'coins'
  }
);


module.exports = Coins;

