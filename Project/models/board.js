module.exports = (sequelize, DataTypes) => {
    return sequelize.define('board', {
        User_NO : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        Title : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        Date : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        Content : {
            type : DataTypes.TEXT('long'),
            allowNull : false,
        },
        File_Link : {
            type : DataTypes.STRING(100),
            allowNull : true,
        },
        Approval : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
    }, {
        timestamps : false,
    });
};