const { handleFollow } = require("./events/follow");
const { handleMessage } = require("./events/message");
const { handleUnFollow } = require("./events/unfollow");

exports.handleEvent = (event) => {
  switch (event.type) {
    case "message":
      switch (event.message.type) {
        case "text":
          handleMessage(event);
          break;
        case "image":
          console.log("event.message.id");
          break;
        case "video":
          console.log("event.message.id");
          break;
        case "audio":
          console.log("event.message.id");
          break;
        case "location":
          console.log("event.message.address");
          break;
        case "sticker":
          console.log("event.message.packageId");
          break;
        default:
          throw new Error(`Unknown message: ${JSON.stringify(event.message)}`);
      }
      break;
    case "postback":
      console.log(event.postback);
      break;
    case "follow":
      handleFollow(event);
      break;
    case "unfollow":
      handleUnFollow(event);
      break;
    case "join":
      console.log(event.type);
      break;
    case "leave":
      console.log(event.type);
      break;
    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
};
