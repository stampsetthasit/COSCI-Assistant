module.exports = {
  name: "แจ้งปัญหา",
  type: "text",
  text: "สวัสดีครับ🙏🏾 ไม่ทราบว่าต้องการแจ้งปัญหาในด้านใดครับ🤔",
  quickReply: {
    items: [
      {
        type: "action",
        imageUrl: `${process.env.BASE_URL}/public/images/menuReq1.jpg`,
        action: {
          type: "message",
          label: "แจ้งซ่อมฝ่ายไอที 🖥️",
          text: "แจ้งปัญหา > แจ้งซ่อมฝ่ายไอที",
        },
      },
      {
        type: "action",
        imageUrl: `${process.env.BASE_URL}/public/images/menuReq2.jpg`,
        action: {
          type: "message",
          label: "แจ้งซ่อมฝ่ายสื่อ 🎤",
          text: "แจ้งปัญหา > แจ้งซ่อมฝ่ายสื่อ",
        },
      },
      {
        type: "action",
        imageUrl: `${process.env.BASE_URL}/public/images/menuReq3.jpg`,
        action: {
          type: "message",
          label: "แจ้งซ่อมฝ่ายอาคาร 🏢",
          text: "แจ้งปัญหา > แจ้งซ่อมฝ่ายอาคาร",
        },
      },
    ],
  },
};
