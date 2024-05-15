const { default: axios } = require("axios");

async function getImageFromLine(messageId) {
  try {
    const response = await axios.get(
      `https://api-data.line.me/v2/bot/message/${messageId}/content`,
      {
        headers: {
          Authorization: "Bearer " + process.env.LINE_CHANNEL_ACCESS_TOKEN,
        },
        responseType: "stream",
      }
    );

    return response;
  } catch (error) {
    console.error("Error getting image from LINE:", error);
    throw error; // Re-throw the error to propagate it up the call stack
  }
}

async function linkAdminRichmenu(userCode, email) {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/richmenu/switch/create/admin/${userCode}/${email}`,
      {
        responseType: "stream",
      }
    );

    return response;
  } catch (error) {
    console.error("Error link admin richmenu:", error);
    throw error; // Re-throw the error to propagate it up the call stack
  }
}

async function unlinkAdminRichmenu(userCode, adminUserCode) {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/richmenu/unlink/admin/${userCode}/${adminUserCode}`
    );

    return response;
  } catch (error) {
    console.error("Error unlink admin richmenu:", error);
    throw error; // Re-throw the error to propagate it up the call stack
  }
}

module.exports = { getImageFromLine, linkAdminRichmenu, unlinkAdminRichmenu };
