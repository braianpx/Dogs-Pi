const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    sequelize.define('breed', {
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        height:{
            type:DataTypes.JSON,
            allowNull: false
        },
        weight:{
            type:DataTypes.JSON,
            allowNull:false
        },
        life_span:{
            type:DataTypes.STRING,
            allowNull:false
        },
        image:{
            type: DataTypes.JSON,
        }
    })
}