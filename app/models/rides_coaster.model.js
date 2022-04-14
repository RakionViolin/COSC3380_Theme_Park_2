module.exports = (sequelize, Sequelize) => {
    return sequelize.define("rides_coasters", {
        Ride_coaster_ID: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Capacity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Area_ID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Date_opened: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        timestamps: false
    });
};
