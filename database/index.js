const { Sequelize } = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: "localhost",
        dialect: "mysql",
    }
);

sequelize.sync();

(async () => {
    try {
        await sequelize.authenticate();
        console.log("connection has been established successfully.");
    } catch(error){
        console.error("Unable to connect to the database: ", error);
    }
})();

module.exports = sequelize;