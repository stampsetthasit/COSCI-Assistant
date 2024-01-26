const { extractCharactersAndNumbers } = require("../../utils/helpers");

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

      if (request.includes(reqId)) {
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
    }
  } catch (error) {
    console.error("Error in Message getResponse:", error);
  }
};
