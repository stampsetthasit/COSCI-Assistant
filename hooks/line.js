const { handleEvent } = require("../controllers/handle-event");

function handleHook(req, res, next) {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(`[hooks] ${err.message}`);
      res.status(500).end();
    });
}

module.exports = { handleHook };
