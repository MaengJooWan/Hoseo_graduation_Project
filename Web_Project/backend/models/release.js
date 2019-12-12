module.exports = (sequelize, DataTypes) => {
    return sequelize.define('release', {
        Date : {
            type : DataTypes.DATE,
            allowNull : false,
        },
        Weekday : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        User_NO : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        Price : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        Count : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        All_Price : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        Stationery_NO : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
    }, {
        timestamps : false,
    });
};