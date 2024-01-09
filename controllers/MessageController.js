const { getResponse } = require("./QuickReplyController");
const { destroyRequestUncompleted } = require("./RequestController.js");
const { getUserCode } = require("./UserController.js");

exports.handleIncomingMessage = async (message, userId) => {
  const userCode = await getUserCode(userId);
  const quickReplyResponse = await getResponse(message, userCode);

  if (quickReplyResponse) {
    return quickReplyResponse;
  } else if (message.includes("ยกเลิก")) {
    await destroyRequestUncompleted(userCode); // Finish this

    return { type: "text", text: "ยกเลิกการแจ้งซ่อมเรียบร้อยแล้วครับ " };
  } else {
    await destroyRequestUncompleted(userCode);

    return { type: "text", text: "ไม่เข้าใจอิหยังเล่ยสู" };
  }
};
