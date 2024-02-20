const BroadcastController = require("../../controllers/response/BroadcastController");

exports.post = async (req, res) => {
  try {
    const userId = req.params.id;
    const message = req.body.message;
    const image = req.files.image ?? null;
    const emergency = req.body.emergency;

    const response = await BroadcastController.broadcast(userId, {
      message,
      image,
      emergency,
    });

    if (response) {
      res.status(200).json({ result: "OK", data: response });
    } else {
      res.status(200).json({ result: "BROADCAST_ERROR", data: response });
    }
  } catch (error) {
    console.error("Error in broadcast:", error);
    res.status(500).send("Internal Server Error");
  }
};
