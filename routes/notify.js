const express = require("express");
const router = express.Router();

const notify = require("../services/notify/index");

router.post("/:id", notify.getUserSetting);

router.post("/setting/:id", notify.setting);

module.exports = router;
