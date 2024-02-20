const { Op } = require("sequelize");
const Admin = require("../models/admin_schema");

exports.createAdmin = async (adminInfo) => {
  const { userCode, name, email, phone, category } = adminInfo;

  try {
    if (adminInfo) {
      const admin = await Admin.create(adminInfo);
      return admin;
    }
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

exports.updateAdmin = async (adminInfo, userCode) => {
  const { name, email, phone, category } = adminInfo;

  try {
    if (adminInfo) {
      const admin = await Admin.update(adminInfo, {
        where: { user_code: userCode },
      });
      return admin;
    }
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

exports.isAdminExist = async (userCode) => {
  const userExist = await Admin.findOne({
    where: {
      user_code: userCode,
    },
  });

  return userExist;
};

exports.updateAdminCategory = async (userCode, category) => {
  try {
    const admin = await Admin.update(
      {
        category: category,
      },
      {
        where: {
          user_code: userCode,
        },
      }
    );

    return admin;
  } catch (error) {
    console.error("Error updating admin:", error);
  }
};

exports.getAdminInfo = async (category) => {
  try {
    const admin = await Admin.findAll({
      where: {
        category: {
          [Op.like]: `%${category}%`,
        },
      },
    });

    return admin;
  } catch (error) {
    console.error("Error fetching admin information:", error);
  }
};

exports.getAdminCategory = async (userCode) => {
  try {
    const admin = await Admin.findOne({
      where: {
        user_code: userCode,
      },
    });

    return admin.category;
  } catch (error) {
    console.error("Error fetching admin category:", error);
  }
};

exports.getAdminEmail = async (userCode) => {
  try {
    const admin = await Admin.findOne({
      attributes: ["email"],
      where: {
        user_code: userCode,
      },
    });

    return admin;
  } catch (error) {}
};
