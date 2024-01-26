const { runQuery } = require("../../config/database");

exports.getRoomInfoLists = async () => {
  // const query = "SELECT * FROM cosci_room.room_building b, cosci_room.room_room r WHERE b.build_id = r.build_id"; // Repair System's Query
  const query = "SELECT * FROM cosci_room.room_building b, cosci_room.room_room r WHERE b.build_id = '01-37'"; // Only COSCI Building
  const results = await runQuery(query);

  return results;
};
