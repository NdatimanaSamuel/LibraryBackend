'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({BooksTb,BrowerTb}) {
      // define association here
      this.hasMany(BooksTb,{foreignKey :'userId',as:'books'});
      this.hasMany(BrowerTb,{foreignKey :'userId'});

    }
  }
  Users.init({
    names: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};