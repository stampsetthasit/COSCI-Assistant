const User = require("../models/user_schema");

async function getLatestUserCode() {
  try {
    const latestUser = await User.findOne({
      order: [["user_code", "DESC"]],
      attributes: ["user_code"],
      limit: 1,
    });

    if (latestUser) {
      return latestUser.user_code;
    }

    return "cb0000";
  } catch (error) {
    throw new Error("Error fetching latest user code: ", error.message);
  }
}

exports.createUser = async (userCode, userId, displayName, pictureUrl) => {
  const user = await User.create({
    user_code: userCode,
    user_id: userId,
    display_name: displayName,
    picture_url: pictureUrl,
  });

  return user;
};

exports.isUserExist = async (userId) => {
  const userExist = await User.findOne({
    where: {
      user_id: userId,
    },
  });

  return userExist;
};

exports.updateUser = async (userId, isFollow, displayName, pictureUrl) => {
  const user = await User.update(
    {
      is_follow: isFollow,
      display_name: displayName,
      picture_url: pictureUrl,
    },
    {
      where: {
        user_id: userId,
      },
    }
  );

  return user;
};

exports.generateUserCode = async () => {
  const latestUserCode = await getLatestUserCode();

  const numericPart = parseInt(latestUserCode.slice(2), 10) + 1;

  const newUserCode = `cb${numericPart.toString().padStart(4, "0")}`;

  return newUserCode;
};

exports.getUserCode = async (userId) => {
  try {
    const user = await User.findOne({
      where: {
        user_id: userId,
      },
    });

    if (user) {
      return user.user_code;
    }

    return null;
  } catch (error) {
    throw new Error("Error retrieving user code: ", error.message);
  }
};

exports.getDisplayName = async (userCode) => {
  try {
    const user = await User.findOne({
      where: {
        user_code: userCode,
      },
    });

    if (user) {
      return user.display_name;
    }

    return null;
  } catch (error) {
    throw new Error("Error retrieving user code: ", error.message);
  }
};

exports.getUserId = async (userCode) => {
  try {
    const user = await User.findOne({
      where: {
        user_code: userCode,
      },
    });
    if (user) {
      return user.user_id;
    }

    return null;
  } catch (error) {
    throw new Error("Error retrieving user id: ", error.message);
  }
};

exports.updateFollowStatus = async (userId, isFollow) => {
  return await User.update(
    {
      is_follow: isFollow,
    },
    {
      where: { user_id: userId },
    }
  );
};

exports.updateUserRole = async (userCode, role) => {
  const allowedRoles = ["user", "admin"];

  try {
    // Validate the role parameter
    if (!allowedRoles.includes(role)) {
      throw new Error(
        `Invalid role: ${role}. Allowed roles are: ${allowedRoles.join(", ")}`
      );
    }

    const user = await User.findOne({
      where: {
        user_code: userCode,
      },
    });

    if (user) {
      await user.update({
        role: role,
      });

      console.log(`User with user_code ${userCode} updated to role ${role}`);
    } else {
      console.error("Error updating user role:", error);
      throw error;
    }

    return user.role;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

exports.getRole = async (userCode) => {
  try {
    const user = await User.findOne({
      where: {
        user_code: userCode,
      },
    });
    if (user) {
      return (user.role = "admin" ? "ผู้ดูแลระบบ" : "บุคคลทั่วไป");
    }

    return "Unknown";
  } catch (error) {
    console.error("Error retrieving user id: ", error.message);
  }
};
