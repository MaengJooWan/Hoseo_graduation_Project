module.exports = (sequelize, DataTypes) => {
    return sequelize.define('stock', {
        Date : {
            type : DataTypes.DATE,
            allowNull : false,
        },
        Stationery_NO : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        Stock_Value : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
    }, {
        timestamps : false,
    });
};