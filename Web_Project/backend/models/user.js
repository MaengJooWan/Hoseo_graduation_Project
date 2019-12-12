module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        Name : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        Email : {
            type : DataTypes.STRING(15),
            allowNull : true,
        },
        PW : {
            type : DataTypes.STRING(20),
            allowNull : false,
        },
        HP : {
            type : DataTypes.STRING(10),
            allowNull : true,
        },
        Position : {
            type : DataTypes.STRING(50),
            allowNull : false,
        },
    }, {
        timestamps : false,
    });
};