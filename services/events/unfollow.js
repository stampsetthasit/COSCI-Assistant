const UserController = require("../../controllers/UserController");
const AdminContoller = require("../../controllers/AdminController");

exports.handleUnFollow = async (event) => {
  try {
    const userId = event.source.userId;
    const userCode = await UserController.getUserCode(userId);

    const isUserExist = await UserController.isUserExist(userId);
    const isAdminExist = await AdminContoller.isAdminExist(userCode);

    if (isUserExist) {
      UserController.updateFollowStatus(userId, false); // isFollow = false(0)
      UserController.updateUserRole(userCode, "user");

      if (isAdminExist) {
        AdminContoller.updateAdminCategory(userCode, 0);
      }
    }
  } catch (error) {
    console.error("Error handling unfollow:", error);
  }
};
