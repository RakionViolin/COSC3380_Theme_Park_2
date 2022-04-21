module.exports = (sequelize, Sequelize) => {
    return sequelize.define("ticket", {
        Ticket_ID: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        admission_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        Number_of_Passenger: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        customer_ID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Rides_coaster_ID: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        timestamps: false
    });
};
