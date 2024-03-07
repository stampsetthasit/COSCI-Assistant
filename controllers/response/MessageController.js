const {
  extractCharactersAndNumbers,
  extractContentWithinParentheses,
} = require("../../utils/helpers");
const {
  linkAdminRichmenu,
  unlinkAdminRichmenu,
} = require("../../utils/httpRequest");

const RequestController = require("../RequestController");

exports.getResponse = async (request, requesterCode) => {
  try {
    if (request === "ติดตามปัญหา") {
      return { type: "text", text: "ไม่พบประวัติการแจ้งปัญหาของคุณ" };
    } else if (request === "วิธีแก้ไขปัญหา") {
      return {
        type: "text",
        text: "ฟังก์ชัน " + request + " ยังไม่พร้อมให้บริการ",
      };
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

      return { type: "text", text: "ยกเลิกการแจ้งซ่อมเรียบร้อยแล้วครับ " };
    } else if (request === "เร่งด่วน") {
      // return {
      //   type: "text",
      //   text: "แสดง QuickReply ให้ user เลือกแผนก หลังจากนั้น ทำการสุ่ม Admin สัก 1 คนในแผนกที่เกี่ยวข้อง และแสดงแอดมินที่รับผิดชอบแผนกเดียวก่อน แอดมินที่รับผิดชอบหลายแผนก",
      // };
    } else if (request.includes("ยืนยันแอดมิน")) {
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
  } catch (error) {
    console.error("Error in Message getResponse:", error);
  }
};
