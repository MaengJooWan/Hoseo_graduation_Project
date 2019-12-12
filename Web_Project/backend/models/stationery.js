module.exports = (sequelize, DataTypes) => {
    return sequelize.define('stationery', {
        Name : {
            type : DataTypes.DataTypes.STRING(100),
            allowNull : false,
        },
        Link : {
            type : DataTypes.DataTypes.STRING(100),
            allowNull : true,
        },
    }, {
        timestamps : false,
    });
};