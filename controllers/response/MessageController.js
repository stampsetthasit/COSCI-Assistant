const template = require("../../templates/template");
const { ADMIN } = template;
const {
  extractCharactersAndNumbers,
  extractContentWithinParentheses,
} = require("../../utils/helpers");
const {
  linkAdminRichmenu,
  unlinkAdminRichmenu,
} = require("../../utils/httpRequest");

const ProblemController = require("../ProblemController");
const SolutionController = require("../SolutionController");
const RequestController = require("../RequestController");

exports.getResponse = async (request, requesterCode) => {
  try {
    if (request === "ติดตามปัญหา") {
      return { type: "text", text: "ไม่พบประวัติการแจ้งปัญหาของคุณ" };
    } else if (request.includes("ยกเลิก")) {
      const reqId = extractCharactersAndNumbers(request);

      if (request.includes("ยกเลิกแอดมิน")) {
        const userCode = extractContentWithinParentheses(request);

        if (userCode) {
          const response = await unlinkAdminRichmenu(userCode, requesterCode);

          if (response.data) {
            return {
              type: "text",
              text: `ยกเลิกสำเร็จ target: ${userCode}, by: ${requesterCode}`,
            };
          }
        }
      } else if (request === "ยกเลิกการตั้งค่า") {
        await ProblemController.destroyProblemUncompleted(requesterCode);
        await SolutionController.destroySolutionUncompleted(requesterCode);
      } else if (request.includes(reqId)) {
        const cancelRequest = await RequestController.cancelRequest(
          requesterCode,
          reqId
        );

        if (cancelRequest) {
          return {
            type: "text",
            text: `ยกเลิก ${reqId} เรียบร้อยแล้วครับ😆`,
          };
        } else {
          return {
            type: "text",
            text: `ขออภัยด้วยครับ🥲 ไม่สามารถยกเลิก ${reqId} ได้😞`,
          };
        }
      }

      return { type: "text", text: "ยกเลิกเรียบร้อยแล้วครับ " };
    } else if (request === "เร่งด่วน") {
      // return {
      //   type: "text",
      //   text: "แสดง QuickReply ให้ user เลือกแผนก หลังจากนั้น ทำการสุ่ม Admin สัก 1 คนในแผนกที่เกี่ยวข้อง และแสดงแอดมินที่รับผิดชอบแผนกเดียวก่อน แอดมินที่รับผิดชอบหลายแผนก",
      // };
    } else if (request.includes("ยืนยันadmin")) {
      const email = extractContentWithinParentheses(request);

      if (email) {
        const response = await linkAdminRichmenu(requesterCode, email);

        if (response.data) {
          return {
            type: "text",
            text: `ยืนยันตัวตนแอดมินสำเร็จ userCode: ${requesterCode}`,
          };
        }
      }
    }

    // วิธีแก้ไขปัญหาเบื้องต้น
    if (request.includes("วิธีแก้ไขปัญหา >")) {
      const solutionTitle = request.split("> ")[1];

      const solution = await SolutionController.getSolution(solutionTitle);
      if (solution) {
        const image = `${process.env.BASE_URL}/public/uploads/solutions/${solution.image}`;

        const replyMessage = [
          {
            type: "text",
            text: `วิธีการแก้ไขปัญหา ${solutionTitle} ทำได้ดังนี้ครับ \n\n${solution.description}`,
          },
          {
            type: "image",
            originalContentUrl: image,
            previewImageUrl: image, // Assuming the same URL is used for preview
          },
        ];

        return replyMessage;
      }
    }

    if (request === "COSCI FAQ") {
      return { type: "text", text: "Soon" };
    }
  } catch (error) {
    console.error("Error in Message getResponse:", error);
  }
};
