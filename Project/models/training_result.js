module.exports = (sequelize, DataTypes) => {
    return sequelize.define('training_result', {
        Stationery_NO : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        Count : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        Today :{
            type : DataTypes.STRING(50),
            allowNull : false,
        },
    }, {
        timestamps : false,
    });
};