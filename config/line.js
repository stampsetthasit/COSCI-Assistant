const line = require("@line/bot-sdk");
const MessagingApiClient = line.messagingApi.MessagingApiClient;

const { Client } = line;

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const richMenuClient = new Client(lineConfig);
const client = new MessagingApiClient(lineConfig);

const middleware = new line.middleware(lineConfig);

module.exports = { client, middleware, richMenuClient };
