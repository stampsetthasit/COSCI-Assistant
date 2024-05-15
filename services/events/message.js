const { client } = require("../../config/line");
const { handleMessage } = require("../../cosciFAQ/handleMessage");
const ResponseController = require("../../controllers/response/ResponseController");

const userStates = {};

exports.handleMessage = async (event) => {
  try {
    const incomingText = event.message.text.trim();
    const userId = event.source.userId;
    const replyToken = event.replyToken;

    if (incomingText) {
      // Check if the user is in FAQ mode
      if (userStates[userId] === "FAQ") {
        // Handle the FAQ message
        const faqMessage = await handleMessage(event);
        await this.replyMessage(replyToken, faqMessage);
        // Reset user state after handling FAQ
        delete userStates[userId];
      } else {
        // Default handling
        const message = await ResponseController.handleIncomingMessage(
          incomingText,
          userId
        );

        // Check if the message is "COSCI FAQ" to send a quick reply
        if (incomingText === "COSCI FAQ") {
          const quickReply = {
            type: "text",
            text: "พิมพ์คำถามที่ได้เลยครับ",
            quickReply: {
              items: [
                {
                  type: "action",
                  action: {
                    type: "message",
                    label: "ยกเลิก ❌",
                    text: "ยกเลิก",
                  },
                },
              ],
            },
          };

          // Send the quick reply message
          await this.replyMessage(replyToken, quickReply);
          // Set user state to FAQ mode
          userStates[userId] = "FAQ";
        } else {
          // Send the generated response message
          await this.replyMessage(replyToken, message);
        }
      }
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
