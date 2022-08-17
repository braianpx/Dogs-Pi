const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('favorites',{
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey:true,
            allowNull: false
        },
        likes:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }
    })
 };