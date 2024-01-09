module.exports = {
  type: "text",
  text: "ปัญหาของท่านเร่งด่วนหรือไม่?",
  quickReply: {
    items: [
      {
        type: "action",
        action: {
          type: "message",
          label: "เร่งด่วน",
          text: "เร่งด่วน",
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "ไม่เร่งด่วน",
          text: "ไม่เร่งด่วน",
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
