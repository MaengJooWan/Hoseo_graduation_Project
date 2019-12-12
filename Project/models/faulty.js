module.exports = (sequelize, DataTypes) => {
    return sequelize.define('faulty', {
        Date : {
            type : DataTypes.STRING(100),
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
        Count : {
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