const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users            = require("./user.model")(sequelize, Sequelize);
db.area             = require("./area.model")(sequelize, Sequelize);
db.rainouts         = require("./rainout.model")(sequelize, Sequelize);
db.rides_coaster    = require("./rides_coaster.model")(sequelize, Sequelize);
db.tickets          = require("./ticket.model")(sequelize, Sequelize);
db.rides            = require("./rides.model")(sequelize, Sequelize);
db.maintenance      = require("./maintenance.model")(sequelize, Sequelize);

db.rides_coaster.belongsTo(db.area, {foreignKey: 'Area_ID', targetKey: 'Area_ID', as: 'area', onDelete: 'CASCADE'})
db.area.hasMany(db.rides_coaster, { as: 'AreaInCoaster', onDelete: 'CASCADE' });

db.rides.belongsTo(db.rides_coaster, {foreignKey: 'Ride_coaster_ID', targetKey: 'Ride_coaster_ID', as: 'ride_coaster', onDelete: 'CASCADE'})
db.rides_coaster.hasMany(db.rides, { as: 'rides_coaster', onDelete: 'CASCADE' });

db.tickets.belongsTo(db.rides_coaster, {foreignKey: 'Rides_coaster_ID', targetKey: 'Ride_coaster_ID', as: 'tickets', onDelete: 'CASCADE'})
db.rides_coaster.hasMany(db.tickets, { as: 'CoasterInTickets', onDelete: 'CASCADE' });

db.tickets.belongsTo(db.users, {foreignKey: 'customer_ID', targetKey: 'user_id', as: 'Customer', onDelete: 'CASCADE'})
db.users.hasMany(db.tickets, { as: 'UserInTickets', onDelete: 'CASCADE' });

db.maintenance.belongsTo(db.rides_coaster, {foreignKey: 'Rides_coaster_ID', targetKey: 'Ride_coaster_ID', as: 'coaster', onDelete: 'CASCADE'})
db.rides_coaster.hasMany(db.maintenance, { as: 'CoasterInMaintenance', onDelete: 'CASCADE' });


module.exports = db;
