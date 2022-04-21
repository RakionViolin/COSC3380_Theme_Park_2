module.exports = {
    HOST: 'us-cdbr-east-05.cleardb.net',
    USER: 'b052c9e9d7c49d',
    PASSWORD: '64931555',
    DB: 'heroku_0fab399232beb7b',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 50000000000
    }
};
