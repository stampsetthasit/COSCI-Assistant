const { client } = require("../../config/line.js");

const UserController = require("../../controllers/UserController");

exports.handleFollow = async (event) => {
  const userId = event.source.userId;
  const replyToken = event.replyToken;

  const userProfile = await client.getProfile(userId);
  const userCode = await UserController.generateUserCode();
  const isUserExist = await UserController.isUserExist(userId);

  if (!isUserExist) {
    await UserController.createUser(
      userCode, // Auto generate user code
      userProfile.userId,
      userProfile.displayName,
      userProfile.pictureUrl
    );
  } else {
    await UserController.updateUser(
      userProfile.userId,
      true, // isFollow = true(1)
      userProfile.displayName,
      userProfile.pictureUrl
    );
  }

  const message = {
    type: "text",
    text: `Thank you for following me: ${await UserController.getUserCode(
      userId
    )}`,
  };
  return client.replyMessage({
    replyToken: replyToken,
    messages: [message],
  });
};
