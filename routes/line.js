const express = require("express");
const router = express.Router();
const line = require("../config/line");
const handleHook = require("../hooks/line").handleHook;

router.post("/callback", line.middleware, handleHook);

module.exports = router;
