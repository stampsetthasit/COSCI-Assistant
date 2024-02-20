const AdminController = require("../../controllers/AdminController");
const UserController = require("../../controllers/UserController");
const RepairController = require("../../controllers/data-access/RepairController");

exports.memberVerify = async (req, res, next) => {
  try {
    const email = req.params.email;

    const member = await RepairController.validateEmail(email);

    if (member) {
      next();
    } else {
      res.status(200).json({ result: "OK", data: "Email not found!" });
    }
  } catch (error) {
    console.error("Error in member verification:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const adminUserCode =
      req.params.adminUserCode ??
      (await UserController.getUserCode(req.params.id));
    const email = await AdminController.getAdminEmail(adminUserCode);

    if (!email)
      return res.status(200).json({ result: "OK", data: "Admin not found!" });

    const admin = await RepairController.getMemberType(email.email);

    if (admin.mem_type == "admin") {
      next();
    } else {
      res
        .status(200)
        .json({ result: "OK", data: "Only admin can access this." });
    }
  } catch (error) {
    console.error("Error in isAdmin: ", error);
    res.status(500).send("Internal Server Error");
  }
};
