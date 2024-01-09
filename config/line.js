const line = require("@line/bot-sdk");
const MessagingApiClient =
  require("@line/bot-sdk").messagingApi.MessagingApiClient;

const { Client } = require("@line/bot-sdk");

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const richMenuClient = new Client(config);
const client = new MessagingApiClient({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
});

const middleware = new line.middleware(config);

module.exports = { config, client, middleware, richMenuClient };
