const db = require('./models');

const connectDatabase = async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        await db.sequelize.sync();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDatabase;
