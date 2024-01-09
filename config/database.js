const { Sequelize } = require("sequelize");

function createSequelizeInstance(databaseName, username, password, host) {
  return new Sequelize(databaseName, username, password, {
    host: host,
    dialect: "mysql",
    logging: true,
  });
}

const chatbotUtility = createSequelizeInstance(
  process.env.DB_CHATBOT_NAME,
  process.env.DB_CHATBOT_USER,
  process.env.DB_CHATBOT_PASS,
  process.env.DB_CHATBOT_HOST
);

const repair = createSequelizeInstance(
  process.env.DB_REPAIR_NAME,
  process.env.DB_REPAIR_USER,
  process.env.DB_REPAIR_PASS,
  process.env.DB_REPAIR_HOST
);

chatbotUtility
  .sync()
  .then(() => {
    console.log("Chatbot Utility Database synchronized successfully");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

repair
  .sync()
  .then(() => {
    console.log("Repair Database synchronized successfully");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

module.exports = { chatbotUtility, repair };
