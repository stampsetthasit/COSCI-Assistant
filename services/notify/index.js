const NotifyController = require("../../controllers/response/NotifyController");

exports.getUserSetting = async (req, res) => {
  try {
    const userId = req.params.id;

    const response = await NotifyController.getUserNotify(userId);

    if (response) {
      res.status(200).json({ result: "OK", data: response });
    } else {
      res.status(200).json({ result: "NOTIFY_ERROR", data: response });
    }
  } catch (error) {
    console.error("Error getting notify:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.setting = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { emergency, news } = req.body;

    const response = await NotifyController.update(userId, { emergency, news });

    if (response) {
      res.status(200).json({ result: "OK", data: response });
    } else {
      res.status(200).json({ result: "NOTIFY_ERROR", data: response });
    }
  } catch (error) {
    console.error("Error setting notify: ", error);
    res.status(500).send("Internal Server Error");
  }
};
