module.exports = {
  type: "text",
  text: "ท่านต้องการแก้ไขปัญหาเบื้องต้นด้วยตัวเองก่อนไหมครับ 🧐",
  quickReply: {
    items: [
      {
        type: "action",
        action: {
          type: "message",
          label: "ใช่",
          text: "วิธีแก้ไขปัญหา",
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "ไม่",
          text: "ไม่",
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "ยกเลิกการแจ้ง ❌",
          text: "ยกเลิกการแจ้ง",
        },
      },
    ],
  },
};
