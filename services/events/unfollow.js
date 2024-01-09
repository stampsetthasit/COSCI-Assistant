const UserController = require("../../controllers/UserController");

exports.handleUnFollow = async (event) => {
  const userId = event.source.userId;

  const isUserExist = await UserController.isUserExist(userId);
  if (isUserExist) {
    UserController.updateFollowStatus(userId, false); // isFollow = false(0)
  }
};
