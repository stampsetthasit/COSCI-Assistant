module.exports = {
  type: "flex",
  altText: "ลักษณะปัญหาที่ต้องการแจ้ง",
  contents: {
    type: "bubble",
    header: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: "ระบุปัญหาที่ต้องการแจ้ง",
          size: "lg",
          weight: "bold",
        },
      ],
    },
    body: {
      type: "box",
      layout: "vertical",
      contents: [],
    },
    footer: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "button",
          action: {
            type: "message",
            label: "ยกเลิกการแจ้ง ❌",
            text: "ยกเลิกการแจ้ง",
          },
          style: "link",
          color: "#D11A2A",
        },
      ],
    },
  },
};
