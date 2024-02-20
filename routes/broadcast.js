const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();

const repair = require("../services/repair");
const broadcast = require("../services/broadcast/index");

// localhost:3000/broadcast

router.use(fileUpload({ limits: { files: 1 } }));

router.post("/post/:id", repair.isAdmin, broadcast.post);

module.exports = router;
