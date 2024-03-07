module.exports = {
  name: "แจ้งปัญหา",
  type: "flex",
  altText: "แจ้งปัญหา",
  contents: {
    type: "carousel",
    contents: [
      {
        type: "bubble",
        hero: {
          type: "image",
          size: "full",
          aspectRatio: "20:13",
          aspectMode: "cover",
          url: `${process.env.BASE_URL}/public/images/menuReq1.jpg`,
        },
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "button",
              action: {
                type: "message",
                label: "แจ้งซ่อมฝ่ายไอที 🖥️",
                text: "แจ้งปัญหา > แจ้งซ่อมฝ่ายไอที",
              },
            },
          ],
        },
      },
      {
        type: "bubble",
        hero: {
          type: "image",
          size: "full",
          aspectRatio: "20:13",
          aspectMode: "cover",
          url: `${process.env.BASE_URL}/public/images/menuReq2.jpg`,
        },
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "button",
              action: {
                type: "message",
                label: "แจ้งซ่อมฝ่ายสื่อ 🎤",
                text: "แจ้งปัญหา > แจ้งซ่อมฝ่ายสื่อ",
              },
            },
          ],
        },
      },
      {
        type: "bubble",
        hero: {
          type: "image",
          size: "full",
          aspectRatio: "20:13",
          aspectMode: "cover",
          url: `${process.env.BASE_URL}/public/images/menuReq3.jpg`,
        },
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "button",
              action: {
                type: "message",
                label: "แจ้งซ่อมฝ่ายอาคาร 🏢",
                text: "แจ้งปัญหา > แจ้งซ่อมฝ่ายอาคาร",
              },
            },
          ],
        },
      },
    ],
  },
};
