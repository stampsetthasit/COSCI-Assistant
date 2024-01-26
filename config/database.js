const { Sequelize } = require("sequelize");

function createSequelizeInstance(databaseName, username, password, host) {
  return new Sequelize(databaseName, username, password, {
    host: host,
    dialect: "mysql",
    logging: true,
  });
}

async function syncDatabase(sequelize, databaseName) {
  try {
    await sequelize.sync();
    console.log(
      `[DATABASE] ${databaseName} Database synchronized successfully`
    );
  } catch (error) {
    console.error(
      `[DATABASE] Error synchronizing ${databaseName} database:`,
      error
    );
  }
}

async function runQuery(query, replacements) {
  try {
    const [results, metadata] = await repair.query(query, {
      replacements,
      type: repair.QueryTypes.Raw,
    });

    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
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

const room = createSequelizeInstance(
  process.env.DB_ROOM_NAME,
  process.env.DB_ROOM_USER,
  process.env.DB_ROOM_PASS,
  process.env.DB_ROOM_HOST
);

(async () => {
  await syncDatabase(chatbotUtility, "Chatbot Utility");
  await syncDatabase(repair, "Repair");
  await syncDatabase(room, "Room");
})();

module.exports = { chatbotUtility, repair, room, runQuery };
