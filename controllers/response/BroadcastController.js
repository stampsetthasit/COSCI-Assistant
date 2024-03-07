const Broadcast = require("../../models/broadcast_schema");
const path = require("path");

const { client } = require("../../config/line");
const {
  generateUniqueKey,
  mapCategoryToDepartment,
} = require("../../utils/helpers");

const UserController = require("../../controllers/UserController");
const AdminController = require("../../controllers/AdminController");

exports.broadcast = async (userId, { message, image, emergency }) => {
  const userCode = await UserController.getUserCode(userId);
  const category = mapCategoryToDepartment(
    await AdminController.getAdminCategory(userCode)
  );
  const xLineRetryKey = generateUniqueKey();

  const broadcastRequest = {
    messages: [
      {
        type: "text",
        text:
          `ประกาศ ${emergency == "true" ? "#ฉุกเฉิน 🚨" : "#ทั่วไป"}\n\n` +
          message +
          `\n\n📣ประกาศโดย ${category}`,
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
      category: category,
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
