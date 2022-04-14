module.exports = (sequelize, Sequelize) => {
    return sequelize.define("rainouts", {
        Rainout_ID: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        Date_: {
            type: Sequelize.DATE,
            allowNull: false
        },
        Area_ID: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        timestamps: false
    });
};
