module.exports = (sequelize, Sequelize) => {
    return sequelize.define("users", {
        user_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        full_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dob: {
            type: Sequelize.DATE,
            allowNull: false
        },
        contact: {
            type: Sequelize.STRING,
            required: false
        },
        email_address: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            required: false
        },
        user_type: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: ['Admin', 'Employee', 'Customer'],
            defaultValue: 'Employee'
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        timestamps: false
    });
};
