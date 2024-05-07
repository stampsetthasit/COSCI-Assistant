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
