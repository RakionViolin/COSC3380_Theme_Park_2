module.exports = (sequelize, Sequelize) => {
    return sequelize.define("areas", {
        Area_ID: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        Area_Name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        timestamps: false
    });
};
