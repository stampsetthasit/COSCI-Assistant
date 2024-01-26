const RichMenuController = require("../../controllers/RichMenuController");

const RICH_MENU_USER = require("./user/user-rich-menu-v1.json");
const RICH_MENU_USER_IMAGE = "dev-v1-user-rich-menu";

const RICH_MENU_ADMIN = require("./admin/admin-rich-menu-v1.json");
const RICH_MENU_ADMIN_IMAGE = "dev-v1-admin-rich-menu";

const RICH_MENU_SWITCH1 = require("./admin/admin-switch1-rich-menu-v1.json");
const RICH_MENU_SWITCH2 = require("./admin/admin-switch2-rich-menu-v1.json");
const RICH_MENU_SWITCH_IMAGE1 = "dev-v2-admin-switch1-rich-menu";
const RICH_MENU_SWITCH_IMAGE2 = "dev-v2-admin-switch2-rich-menu";

exports.createDefaultRichMenu = async (req, res) => {
  try {
    const data = await RichMenuController.createRichMenuAllUser(
      RICH_MENU_USER,
      RICH_MENU_USER_IMAGE
    );
    return res.status(200).json({
      result: "OK",
      data: data,
    });
  } catch (error) {
    console.error("Error creating default rich menu:", error);
    return res.status(500).json({
      result: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.deleteDefaultRichMenu = async (req, res) => {
  try {
    const data = await RichMenuController.deleteRichMenu(RICH_MENU_USER_IMAGE);
    return res.status(200).json({
      result: "OK",
      message: "Delete rich menu user success",
      data: data,
    });
  } catch (error) {
    console.error("Error deleting default rich menu:", error);
    return res.status(500).json({
      result: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.createAdminRichMenu = async (req, res) => {
  try {
    const userCode = req.params.userCode;
    const data = await RichMenuController.createRichMenuAdmin(
      RICH_MENU_ADMIN,
      RICH_MENU_ADMIN_IMAGE,
      userCode
    );
    return res.status(200).json({
      result: "OK",
      data: data,
    });
  } catch (error) {
    console.error("Error creating admin rich menu:", error);
    return res.status(500).json({
      result: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.createAdminSwitchRichMenu = async (req, res) => {
  try {
    const userCode = req.params.userCode;
    const data = await RichMenuController.createSwitchRichMenuAdmin(
      [RICH_MENU_SWITCH1, RICH_MENU_SWITCH2],
      [RICH_MENU_SWITCH_IMAGE1, RICH_MENU_SWITCH_IMAGE2],
      userCode
    );
    return res.status(200).json({
      result: "OK",
      data: data,
    });
  } catch (error) {
    console.error("Error creating admin switch rich menu:", error);
    return res.status(500).json({
      result: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.unlinkAdminRichMenu = async (req, res) => {
  try {
    const userCode = req.params.userCode;
    const data = await RichMenuController.unlinkRichMenuAdmin(userCode);
    return res.status(200).json({
      result: "OK",
      data: data,
    });
  } catch (error) {
    console.error("Error unlinking admin rich menu:", error);
    return res.status(500).json({
      result: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.deleteAdminRichMenu = async (req, res) => {
  try {
    const data = await RichMenuController.deleteRichMenu(RICH_MENU_ADMIN_IMAGE);
    return res.status(200).json({
      result: "OK",
      data: data,
    });
  } catch (error) {
    console.error("Error deleting admin rich menu:", error);
    return res.status(500).json({
      result: "Error",
      message: "Internal Server Error",
    });
  }
};
