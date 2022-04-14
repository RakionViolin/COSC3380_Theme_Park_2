module.exports = (sequelize, Sequelize) => {
    return sequelize.define("maintenances", {
        Maintenance_ID: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        Worker_ID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Date_Started: {
            type: Sequelize.DATE,
            allowNull: false
        },
        Date_Completed: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        timestamps: false
    });
};
