const { destroyRequestUncompleted } = require("../RequestController");

const UserController = require("../UserController");
const QuickReplyController = require("./QuickReplyController");
const FlexMessageController = require("./FlexMessageController");
const MessageController = require("./MessageController");
const { destroyProblemUncompleted } = require("../ProblemController");
const { destroySolutionUncompleted } = require("../SolutionController");

exports.handleIncomingMessage = async (message, userId) => {
  try {
    const userCode = await UserController.getUserCode(userId);
    const quickReplyResponse = await QuickReplyController.getResponse(
      message,
      userCode
    );
    const flexMessageResponse = await FlexMessageController.getResponse(
      message,
      userCode
    );
    const messageResponse = await MessageController.getResponse(
      message,
      userCode
    );

    if (message.includes("ยกเลิก")) {
      await destroyRequestUncompleted(userCode);

      return messageResponse;
    } else if (quickReplyResponse) {
      return quickReplyResponse;
    } else if (flexMessageResponse) {
      return flexMessageResponse;
    } else if (messageResponse) {
      return messageResponse;
    } else {
      await destroyRequestUncompleted(userCode);
      await destroyProblemUncompleted(userCode);
      await destroySolutionUncompleted(userCode);

      return { type: "text", text: "กรุณาเลือกเมนูบน Rich menu" };
    }
  } catch (error) {
    console.error("Error handling incoming message:", error);
  }
};
