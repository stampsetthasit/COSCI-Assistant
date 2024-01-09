const RichMenuController = require("../../controllers/RichMenuController");

const richMenuUser = require("./user/user-rich-menu-v1.json");
const richMenuUserImage = "dev-v1-user-rich-menu";

const richMenuAdmin = require("./admin/admin-rich-menu-v1.json");
const richMenuAdminImage = "dev-v1-admin-rich-menu";

const richMenuSwitch1 = require("./admin/admin-switch1-rich-menu-v1.json");
const richMenuSwitchImg1 = "dev-v2-admin-switch1-rich-menu";
const richMenuSwitch2 = require("./admin/admin-switch2-rich-menu-v1.json");
const richMenuSwitchImg2 = "dev-v2-admin-switch2-rich-menu";

exports.createDefaultRichMenu = async (req, res) => {
  const data = await RichMenuController.createRichMenuAllUser(
    richMenuUser,
    richMenuUserImage
  );
  return res.status(200).json({
    result: "OK",
    data: data,
  });
};

exports.deleteDefaultRichMenu = async (req, res) => {
  const data = await RichMenuController.deleteRichMenu(richMenuUserImage); // Check the parameter again before done
  return res.status(200).json({
    result: "OK",
    message: "Delete rich menu user succses",
    data: data,
  });
};

exports.createAdminRichMenu = async (req, res) => {
  const userCode = req.params.userCode;

  const data = await RichMenuController.createRichMenuAdmin(
    richMenuAdmin,
    richMenuAdminImage,
    userCode
  );

  return res.status(200).json({
    result: "OK",
    data: data,
  });
};

exports.createAdminSwitchRichMenu = async (req, res) => {
  const userCode = req.params.userCode;

  const data = await RichMenuController.createSwitchRichMenuAdmin(
    [richMenuSwitch1, richMenuSwitch2],
    [richMenuSwitchImg1, richMenuSwitchImg2],
    userCode
  );

  return res.status(200).json({
    result: "OK",
    data: data,
  });
};

exports.unlinkAdminRichMenu = async (req, res) => {
  const userCode = req.params.userCode;

  const data = await RichMenuController.unlinkRichMenuAdmin(userCode);

  return res.status(200).json({
    result: "OK",
    data: data,
  });
};

exports.deleteAdminRichMenu = async (req, res) => {
  const data = await RichMenuController.deleteRichMenu(richMenuAdminImage); // Check the parameter again before done
  return res.status(200).json({
    result: "OK",
    data: data,
  });
};
