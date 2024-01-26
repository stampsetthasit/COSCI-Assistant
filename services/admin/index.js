const AdminController = require("../../controllers/AdminController");
const UserController = require("../../controllers/UserController");
const RepairController = require("../../controllers/data-access/RepairController");

exports.init = async (req, res, next) => {
  try {
    const userCode = req.params.userCode;
    const email = req.params.email;

    const isAdminExist = await AdminController.isAdminExist(userCode);

    const displayName = await UserController.getDisplayName(userCode);
    const memberPhone = await RepairController.getMemberPhone(email);
    const memberCategory = await RepairController.getMemberCategory(email);

    const adminInfo = {
      user_code: userCode,
      name: displayName,
      email: email,
      phone: memberPhone,
      category: memberCategory,
    };

    if (!isAdminExist) {
      await AdminController.createAdmin(adminInfo);
    } else {
      await AdminController.updateAdmin(adminInfo, userCode);
    }

    next();
  } catch (error) {
    console.error("Error in admin initialization:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.delete = async (req, res, next) => {
  const userCode = req.params.userCode;

  try {
    const admin = await AdminController.updateAdminCategory(userCode, null);
    if (admin) {
      next();
    } else {
      res.status(200).send({ result: "OK", data: "Fail to delete Admin" });
    }
  } catch (error) {
    console.error("Error in admin initialization:", error);
    res.status(500).send("Internal Server Error");
  }
};
