const express = require("express");
const axios = require("axios");
require("dotenv").config({ path: ".env.local" });

const app = express();

let roundRobin = 0;
const agentHook = [
  "https://dialogflow.cloud.google.com/v1/integrations/line/webhook/3f3e21e6-21d3-4f36-8f1d-70591a3b0874",
  "https://dialogflow.cloud.google.com/v1/integrations/line/webhook/e5b7fef9-1ac0-4edb-abfd-6d9f6e3c1ef8",
];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("*", (req, res) => {
  res.send("Hello World");
});

app.post("/webhook", async (req, res) => {
  // const body = req.body;
  // if (++roundRobin >= agentHook.length) roundRobin = 0;
  // const agent = agentHook[roundRobin];
  // console.log("webhook", agent);

  // try {
  //   const response = await axios.post(agent, body, {
  //     headers: { "Content-Type": "application/json" },
  //   });

  //   console.log(response.data);
  //   res.send(response.data);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send("Error in webhook request");
  // }
  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
