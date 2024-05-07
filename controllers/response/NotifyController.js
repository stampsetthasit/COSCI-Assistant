const Notify = require("../../models/notify_schema");

const UserController = require("../../controllers/UserController");

exports.getUserNotify = async (userId) => {
  try {
    const userCode = await UserController.getUserCode(userId);

    const userNotify = await Notify.findOne({
      where: {
        user_code: userCode,
      },
    });

    if (!userNotify) {
      const newUser = await this.createUserNotify(userCode);
      return newUser;
    } else {
      return userNotify;
    }
  } catch (error) {
    console.error("Error getting UserNotify: ", error);
    throw Error;
  }
};

exports.getUsersAllowNotify = async (emergency) => {
  const queryOptions = {};

  // Set query options based on the emergency parameter
  if (emergency == 1 || emergency == true) {
    queryOptions.emergency = 1;
  } else {
    queryOptions.news = 1;
  }

  try {
    const userCodes = await Notify.findAll({
      where: queryOptions,
      attributes: ["user_code"],
    });

    // Map user codes to a list of user IDs
    const userIds = await Promise.all(
      userCodes.map(async (user) => {
        // Use UserController to get user ID from user code
        const userId = await UserController.getUserId(user.user_code);
        return userId;
      })
    );

    // Return the list of user IDs
    return userIds || [];
  } catch (error) {
    console.error("Error getting users that allow notifications:", error);
    throw Error;
  }
};

exports.update = async (userId, status) => {
  try {
    const userCode = await UserController.getUserCode(userId);
    if (!userCode) return "User code not found for the provided userId.";

    const userSetting = await Notify.update(status, {
      where: {
        user_code: userCode,
      },
    });

    if (userSetting) {
      if (status.emergency != 0 || status.news != 0) {
        await UserController.updateNotify(userCode, 1);
      } else {
        await UserController.updateNotify(userCode, 0);
      }

      return status;
    } else {
      return "Can't update user's setting: ", userSetting;
    }
  } catch (error) {
    console.error("Error update UserNotify setting: ", error);
    throw Error;
  }
};

exports.createUserNotify = async (userCode) => {
  try {
    const init = await Notify.create({
      user_code: userCode,
    });

    return init;
  } catch (error) {
    console.error("Error creating notify:", error);
    throw Error;
  }
};
