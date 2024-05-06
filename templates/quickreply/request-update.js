module.exports = (reqId) => ({
  name: "อัปเดตสถานะ > ",
  type: "text",
  text: "ระบุสถานะที่ต้องการอัปเดตด้วยครับ",
  quickReply: {
    items: [
      {
        type: "action",
        action: {
          type: "message",
          label: "ปฏิเสธการซ่อม",
          text: `อัปเดตสถานะ > ${reqId} > 2`,
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "เจ้าหน้าที่รับเรื่อง",
          text: `อัปเดตสถานะ > ${reqId} > 3`,
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "ซ่อมไม่สำเร็จ",
          text: `อัปเดตสถานะ > ${reqId} > 4`,
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "ซ่อมสำเร็จ",
          text: `อัปเดตสถานะ > ${reqId} > 5`,
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "ส่งเรื่องพัสดุ",
          text: `อัปเดตสถานะ > ${reqId} > 6`,
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "พัสดุรับเรื่อง",
          text: `อัปเดตสถานะ > ${reqId} > 8`,
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "สำเร็จ",
          text: `อัปเดตสถานะ > ${reqId} > 11`,
        },
      },
    ],
  },
});
