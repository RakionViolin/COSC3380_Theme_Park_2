module.exports = (sequelize, Sequelize) => {
    return sequelize.define("rides", {
        Ride_ID: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        Date_: {
            type: Sequelize.DATE,
            allowNull: false
        },
        Number_of_Passenger: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Ride_coaster_ID: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        timestamps: false
    });
};
