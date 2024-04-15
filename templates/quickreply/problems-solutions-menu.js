module.exports = (menu) => ({
  type: "text",
  text: "กรุณาเลือกหมวดหมู่ที่คุณต้องการจัดการด้วยครับ 😄",
  quickReply: {
    items: [
      {
        type: "action",
        imageUrl: `${process.env.BASE_URL}/public/images/menuReq1.jpg`,
        action: {
          type: "message",
          label: "ฝ่ายไอที 🖥️",
          text: `${menu} > ฝ่ายไอที`,
        },
      },
      {
        type: "action",
        imageUrl: `${process.env.BASE_URL}/public/images/menuReq2.jpg`,
        action: {
          type: "message",
          label: "ฝ่ายสื่อ 🎤",
          text: `${menu} > ฝ่ายสื่อ`,
        },
      },
      {
        type: "action",
        imageUrl: `${process.env.BASE_URL}/public/images/menuReq3.jpg`,
        action: {
          type: "message",
          label: "ฝ่ายอาคาร 🏢",
          text: `${menu} > ฝ่ายอาคาร`,
        },
      },
    ],
  },
});
