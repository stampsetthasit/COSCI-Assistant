const RepairController = require("../../controllers/RepairController");

exports.memberVerify = async (req, res, next) => {
  const email = req.params.email;

  const member = await RepairController.validateEmail(email);

  if (member) {
    next();
  } else if (member === null) {
    res.status(200).json({ result: "OK", data: "Email not found!" });
  }
};
