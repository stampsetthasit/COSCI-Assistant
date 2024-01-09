module.exports = (title) => ({
  type: "template",
  altText: "this is a confirm template",
  template: {
    type: "confirm",
    actions: [
      {
        type: "message",
        label: "ยืนยัน",
        text: "ยืนยัน",
      },
      {
        type: "message",
        label: "ยกเลิก",
        text: "ยกเลิกการแจ้ง",
      },
    ],
    text: `ท่านยืนยันแจ้งปัญหา ${title} หรือไม่ครับ?`,
  },
});
