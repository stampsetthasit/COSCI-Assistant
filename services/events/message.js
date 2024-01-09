const { client } = require("../../config/line.js");
const MessageController = require("../../controllers/MessageController.js");

exports.handleMessage = async (event) => {
  let message;
  let replyToken = event.replyToken;
  let incomingText = event.message.text.trim();
  let userId = event.source.userId

  // User Menu
  if (incomingText) {
    message = await MessageController.handleIncomingMessage(incomingText, userId);

    replyMessage(replyToken, message);
  }
};

function replyMessage(replyToken, message) {
  return client.replyMessage({
    replyToken: replyToken,
    messages: [message],
  });
}
