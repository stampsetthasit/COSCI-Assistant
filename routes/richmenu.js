const express = require("express");
const router = express.Router();

const richmenu = require("../services/richmenu/index");
const repair = require("../services/repair/validate");

/* GET Rich menu listing. */
// localhost:3000/richmenu
router.get("/create/user", richmenu.createDefaultRichMenu);
router.get("/delete/user", richmenu.deleteDefaultRichMenu);

router.get("/create/admin/:userCode", richmenu.createAdminRichMenu);
router.get("/unlink/admin/:userCode", richmenu.unlinkAdminRichMenu);
router.get("/delete/admin", richmenu.deleteAdminRichMenu);

router.get(
  "/switch/create/admin/:userCode/:email",
  repair.memberVerify,
  richmenu.createAdminSwitchRichMenu
);

module.exports = router;
