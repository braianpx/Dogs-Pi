const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user',{
       id:{
        type: DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey:true,
        unique : true,
        allowNull : false,
       },
       username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
       },
       password:{
        type: DataTypes.STRING,
        allowNull:false,
       },
    })
};