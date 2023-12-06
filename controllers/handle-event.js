exports.handleEvent = (event) => {
  switch (event.type) {
    case "message":
      switch (event.message.type) {
        case "text":
          console.log(event.message.text);
          break;
        case "image":
          console.log(event.message.id);
          break;
        case "video":
          console.log(event.message.id);
          break;
        case "audio":
          console.log(event.message.id);
          break;
        case "location":
          console.log(event.message.address);
          break;
        case "sticker":
          console.log(event.message.packageId);
          break;
        default:
          throw new Error(`Unknown message: ${JSON.stringify(event.message)}`);
      }
      break;
    case "postback":
      break;
    case "follow":
      break;
    case "unfollow":
      break;
    case "join":
      break;
    case "leave":
      break;
    case "memberJoined":
      break;
    case "memberLeft":
      break;
    case "things":
      break;
    case "thingsLink":
      break;
    case "thingsUnlink":
      break;
    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
};
