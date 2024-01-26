module.exports = {
  type: "text",
  text: "รบกวนรอบสุดท้ายแล้วครับ ผมขอภาพถ่ายอุปกรณ์ที่ท่านต้องการแจ้งปัญหาด้วยครับ🙏🏾😄",
  quickReply: {
    items: [
      {
        type: "action",
        imageUrl: `${process.env.BASE_URL}/public/images/camera.png`,
        action: {
          type: "camera",
          label: "เปิดกล้อง",
        },
      },
      {
        type: "action",
        imageUrl: `${process.env.BASE_URL}/public/images/gellery.png`,
        action: {
          type: "cameraRoll",
          label: "เลือกรูปภาพ",
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
