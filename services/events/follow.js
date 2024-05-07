const { replyMessage } = require("./message");
const { client } = require("../../config/line");

const UserController = require("../../controllers/UserController");
const NotifyController = require("../../controllers/response/NotifyController");

exports.handleFollow = async (event) => {
  try {
    const replyToken = event.replyToken;
    const userId = event.source.userId;

    const userProfile = await client.getProfile(userId);
    const isUserExist = await UserController.isUserExist(userId);

    if (!isUserExist) {
      const userCode = await UserController.generateUserCode();

      await UserController.createUser(
        userCode, // Auto generate user code
        userProfile.userId,
        userProfile.displayName,
        userProfile.pictureUrl
      );

      await NotifyController.createUserNotify(userCode)
    } else {
      await UserController.updateUser(
        userProfile.userId,
        true, // isFollow = true(1)
        userProfile.displayName,
        userProfile.pictureUrl
      );
    }

    // TODO: EDIT MESSAGE OR SEND 
    const message = {
      type: "text",
      text: `ขอบคุณที่เป็นเพื่อนกับเรา รหัสผู้ใช้ของคุณคือ: ${await UserController.getUserCode(userId)}`,
    };

    return replyMessage(replyToken, message);
  } catch (error) {
    console.error("Error handling follow:", error);
  }
};
