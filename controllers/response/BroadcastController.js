const Broadcast = require("../../models/broadcast_schema");
const path = require("path");

const { client } = require("../../config/line");
const {
  generateUniqueKey,
  mapCategoryToDepartment,
} = require("../../utils/helpers");

const UserController = require("../../controllers/UserController");
const AdminController = require("../../controllers/AdminController");
const NotifyController = require("../../controllers/response/NotifyController");
const { default: axios } = require("axios");

exports.broadcast = async (
  userId,
  { department, message, image, emergency }
) => {
  const userCode = await UserController.getUserCode(userId);
  // const category = mapCategoryToDepartment(
  await AdminController.getAdminCategory(userCode);
  // );
  const xLineRetryKey = generateUniqueKey();

  const broadcastRequest = {
    messages: [
      {
        type: "text",
        text:
          `ประกาศ ${
            emergency == "true" ? "#ข่าวด่วน 🚨" : "#ข่าวสารทั่วไป"
          }\n\n` +
          message +
          `\n\n📣ประกาศโดย ${department}`,
      },
    ],
  };

  if (image) {
    const directoryPath = path.resolve("./");
    const imagePath = `${directoryPath}/public/uploads/broadcasts`;
    const newFilename = `${xLineRetryKey}.jpg`;
    const destinationPath = `${imagePath}/${newFilename}`;
    image.name = newFilename;

    // move the file to the specified path
    image.mv(destinationPath, (err) => {
      if (err) {
        console.error("Error uploading image:", err);
        throw err;
      }
    });

    const baseURL = process.env.BASE_URL;
    const imageUrl = `${baseURL}/public/uploads/broadcasts/${newFilename}`;

    broadcastRequest.messages.push({
      type: "image",
      originalContentUrl: imageUrl,
      previewImageUrl: imageUrl,
    });
  }

  try {
    const result = await client.broadcast(broadcastRequest, xLineRetryKey);
    const data = {
      id: result["x-line-request-id"],
      message: message,
      image: image.name,
      category: department,
      emergency: emergency,
      broadcaster: userCode,
    };

    await createBroadcastHistory(data);

    console.log("Broadcast successful:", result);
    return data;
  } catch (error) {
    console.error("Broadcast failed:", error);
    return error;
  }
};

exports.manualBroadcast = async (
  userId,
  { department, message, image, emergency }
) => {
  const userCode = await UserController.getUserCode(userId);
  const xLineRetryKey = generateUniqueKey();

  const broadcastMessage = [
    {
      type: "text",
      text:
        `ประกาศ ${
          emergency == "true" || emergency == 1 ? "#ข่าวด่วน🚨" : "#ข่าวสารทั่วไป"
        }\n\n` +
        message +
        `\n\n📣ประกาศโดย ${department}`,
    },
  ];

  if (image) {
    // Specify the directory path and destination path for the image
    const directoryPath = path.resolve("./");
    const imagePath = `${directoryPath}/public/uploads/broadcasts`;
    const newFilename = `${xLineRetryKey}.jpg`; // Use xLineRetryKey to generate unique filename
    const destinationPath = `${imagePath}/${newFilename}`;

    // Move the uploaded image file to the destination path
    await image.mv(destinationPath);

    // Construct the image URL for LINE
    const baseURL = process.env.BASE_URL;
    const imageUrl = `${baseURL}/public/uploads/broadcasts/${newFilename}`;

    // Add the image message to the broadcast message array
    broadcastMessage.push({
      type: "image",
      originalContentUrl: imageUrl,
      previewImageUrl: imageUrl,
    });
  }

  try {
    const targets = await NotifyController.getUsersAllowNotify(emergency);

    targets.forEach((userId) => {
      pushMessage(userId, broadcastMessage);
    });

    const data = {
      id: xLineRetryKey,
      message: message,
      image: image ? image.name : null,
      category: department,
      emergency: emergency,
      broadcaster: userCode,
    };

    await createBroadcastHistory(data);

    return data;
  } catch (error) {
    console.error("Broadcast failed:", error);
    return error;
  }
};

async function pushMessage(userId, message) {
  try {
    const url = `https://api.line.me/v2/bot/message/push`;
    const response = await axios.post(
      url,
      {
        to: userId,
        messages: message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`[Broadcast] Message sent to ${userId}:`, response.data);
  } catch (error) {
    console.error(`Failed to send message to ${userId}:`, error);
  }
}

async function createBroadcastHistory({
  id,
  message,
  image,
  category,
  emergency,
  broadcaster,
}) {
  try {
    const broadcast = await Broadcast.create({
      id: id,
      message: message,
      image: image,
      category: category,
      emergency: emergency,
      broadcaster: broadcaster,
    });

    return broadcast;
  } catch (error) {
    console.error("Error creating broadcast history:", error);
    throw error;
  }
}
