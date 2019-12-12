module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        Name : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        Email : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        PW : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        HP : {
            type : DataTypes.STRING(100),
            allowNull : true,
        },
        EmployeeNum : {
            type : DataTypes.STRING(50),
            allowNull : false,
        },
        Authority : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        Department : {
            type : DataTypes.STRING(50),
            allowNull : false,
        },
    }, {
        timestamps : false,
    });
};