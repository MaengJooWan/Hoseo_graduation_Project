const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Faulty = require('./faulty')(sequelize,Sequelize);
db.Release = require('./release')(sequelize,Sequelize);
db.Sales = require('./sales')(sequelize,Sequelize);
db.Stationery = require('./stationery')(sequelize,Sequelize);
db.Stock = require('./stock')(sequelize,Sequelize);
db.Training_result = require('./training_result')(sequelize,Sequelize);
db.User = require('./user')(sequelize,Sequelize);
db.Board = require('./board')(sequelize,Sequelize);

//사용자 테이블과 각 테이블 조인
db.User.hasMany(db.Sales, {foreignKey : 'User_NO', sourceKey : 'id'});
db.Sales.belongsTo(db.User, {foreignKey : 'User_NO', targetKey : 'id'});

db.User.hasMany(db.Faulty, {foreignKey : 'User_NO', sourceKey : 'id'});
db.Faulty.belongsTo(db.User, {foreignKey : 'User_NO', targetKey : 'id'});

db.User.hasMany(db.Release, {foreignKey : 'User_NO', sourceKey : 'id'});
db.Release.belongsTo(db.User, {foreignKey : 'User_NO', targetKey : 'id'});

db.User.hasMany(db.Board, {foreignKey : 'User_NO', sourceKey : 'id'});
db.Board.belongsTo(db.User, {foreignKey : 'User_NO', targetKey : 'id'});


//제품 테이블과 각 테이블 조인
db.Stationery.hasMany(db.Training_result, {foreignKey : 'Stationery_NO', sourceKey : 'id'});
db.Training_result.belongsTo(db.Stationery, {foreignKey : 'Stationery_NO', targetKey : 'id'});

db.Stationery.hasMany(db.Faulty, {foreignKey : 'Stationery_NO', sourceKey : 'id'});
db.Faulty.belongsTo(db.Stationery, {foreignKey : 'Stationery_NO', targetKey : 'id'});

db.Stationery.hasMany(db.Sales, {foreignKey : 'Stationery_NO', sourceKey : 'id'});
db.Sales.belongsTo(db.Stationery, {foreignKey : 'Stationery_NO', targetKey : 'id'})

db.Stationery.hasMany(db.Stock, {foreignKey : 'Stationery_NO', sourceKey : 'id'});
db.Stock.belongsTo(db.Stationery, {foreignKey : 'Stationery_NO', targetKey : 'id'});

db.Stationery.hasMany(db.Release, {foreignKey : 'Stationery_NO', sourceKey : 'id'});
db.Release.belongsTo(db.Stationery, {foreignKey : 'Stationery_NO', targetKey : 'id'});

module.exports = db;
