'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BooksTb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users}) {
      // define association here
      this.belongsTo(Users,{foreignKey:'userId'})
    }
  }
  BooksTb.init({
    bookisbn: DataTypes.STRING,
    bookauthor: DataTypes.STRING,
    booktitle: DataTypes.STRING,
    bookgnre: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BooksTbs',
  });
  return BooksTb;
};