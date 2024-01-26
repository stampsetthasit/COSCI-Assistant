const { client } = require("../../config/line");
const ResponseController = require("../../controllers/response/ResponseController");

exports.handleMessage = async (event) => {
  try {
    const incomingText = event.message.text.trim();
    // User Menu
    if (incomingText) {
      const userId = event.source.userId;
      const replyToken = event.replyToken;

      const message = await ResponseController.handleIncomingMessage(
        incomingText,
        userId
      );

      this.replyMessage(replyToken, message);
    }
  } catch (error) {
    console.error("Error handling message:", error);
  }
};

exports.replyMessage = (replyToken, message) => {
  return client.replyMessage({
    replyToken: replyToken,
    messages: Array.isArray(message) ? message : [message],
  });
};
