const fs = require("fs");
const path = require("path");

const UserController = require("../../controllers/UserController");
const RequestController = require("../../controllers/RequestController");
const FlexMessageContoller = require("../../controllers/response/FlexMessageController");
const SolutionController = require("../../controllers/SolutionController");

const { replyMessage } = require("./message");
const { QuickReply } = require("../../templates/template");
const { getImageFromLine } = require("../../utils/httpRequest");

exports.handleImage = async (event) => {
  try {
    let message = [];
    const userId = event.source.userId;
    const replyToken = event.replyToken;
    const isImageSet = event.message.imageSet
      ? event.message.imageSet.index
      : false;

    const userCode = await UserController.getUserCode(userId);

    if (typeof solutionId !== "undefined") {
      if (!isImageSet) {
        const imageResponse = await getImageFromLine(event.message.id);

        const directoryPath = path.resolve("./");
        const imagePath = `${directoryPath}/public/uploads/solutions/`;
        const newFilename = `${solutionId}_${solutionInfo[2]}.jpg`;

        imageResponse.data.pipe(fs.createWriteStream(imagePath + newFilename));

        console.log("UPDATE DATABASE", solutionInfo, newFilename, userCode);

        // update to database
        await SolutionController.updateSolution(
          solutionInfo[0],
          solutionInfo[2],
          solutionInfo[1],
          newFilename,
          userCode
        );

        message.push({
          type: "text",
          text: "เพิ่มวิธีแก้ไขเข้าระบบรียบร้อยแล้วครับ ขอบคุณครับ😁",
        });

        global.solutionId = undefined;
        global.solutionInfo = ["title", "description", "related_problem", "image", "category"]

        replyMessage(replyToken, message);
      } else {
        // if user send multiple image
        if (isImageSet === 1) {
          message.push({
            type: "text",
            text: "ขออภัยในความไม่สะดวก🙏🏾 ผมสามารถรับได้เพียง 1 รูปเท่านั้น กรุณาลองใหม่😙",
          });
          message.push(QuickReply.Problems.IMAGE);

          replyMessage(replyToken, message);
        }
      }
    } else if (typeof reqId !== "undefined") {
      // Variable is defined
      if (!isImageSet) {
        const imageResponse = await getImageFromLine(event.message.id);

        const directoryPath = path.resolve("./");
        const imagePath = `${directoryPath}/public/uploads/`;
        const newFilename = `${reqId}.jpg`;

        imageResponse.data.pipe(fs.createWriteStream(imagePath + newFilename));

        // update to database
        const data = {
          image: {
            req_id: reqId,
            req_img_name: newFilename,
          },
          request: {
            req_status: 1,
          },
        };
        await RequestController.createRequestImage(data.image);
        await RequestController.updateRequestById(reqId, data.request);

        const request = await RequestController.getRequestById(userCode, reqId);
        const requestReceipt = await FlexMessageContoller.createReceiptDetails(
          request
        );

        const msg = {
          type: "flex",
          altText: "ใบแจ้งหมายเลข " + reqId,
          contents: requestReceipt,
        };

        message.push(msg);
        message.push({
          type: "text",
          text: "แจ้งเข้าระบบเรียบร้อยแล้วครับ ขอบคุณครับ😁",
        });

        global.reqId = undefined;

        replyMessage(replyToken, message);
      } else {
        // if user send multiple image
        if (isImageSet === 1) {
          message.push({
            type: "text",
            text: "ขออภัยในความไม่สะดวก🙏🏾 ผมสามารถรับได้เพียง 1 รูปเท่านั้น กรุณาลองใหม่😙",
          });
          message.push(QuickReply.Problems.IMAGE);

          replyMessage(replyToken, message);
        }
      }
    } 
  } catch (error) {
    console.error("Error handling image: ", error);
  }
};
