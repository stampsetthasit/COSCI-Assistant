const { handleEvent } = require("../services/handleEvent");

exports.handleHook = (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((error) => {
      console.error("[hooks]", error.message);
      res.status(500).end;
    });
};
