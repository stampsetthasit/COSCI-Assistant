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
