const express = require("express");
const router = express.Router();

const richmenu = require("../services/richmenu/index");
const repair = require("../services/repair");
const admin = require("../services/admin");

/* GET Rich menu listing. */
// localhost:3000/richmenu
router.get("/create/user", richmenu.createDefaultRichMenu);
router.get("/delete/user", richmenu.deleteDefaultRichMenu);

router.get(
  "/unlink/admin/:userCode/:adminUserCode",
  repair.isAdmin,
  admin.delete,
  richmenu.unlinkAdminRichMenu
);
router.get("/delete/admin", richmenu.deleteAdminRichMenu);

router.get(
  "/switch/create/admin/:userCode/:email",
  repair.memberVerify,
  admin.init,
  richmenu.createAdminSwitchRichMenu
);

module.exports = router;
