module.exports = (adminName, adminDepartment, adminPhone) => ({
  type: "flex",
  altText: "หากเร่งด่วน ! ติดต่อผู้ดูแลตอนนี้เลย !",
  contents: {
    type: "bubble",
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: adminName,
          weight: "bold",
          size: "xl",
        },
        {
          type: "box",
          layout: "vertical",
          margin: "lg",
          spacing: "sm",
          contents: [
            {
              type: "box",
              layout: "baseline",
              spacing: "xxl",
              contents: [
                {
                  type: "text",
                  text: adminDepartment,
                  wrap: true,
                  color: "#666666",
                  size: "sm",
                  flex: 5,
                  maxLines: 5,
                },
              ],
            },
          ],
        },
      ],
    },
    footer: {
      type: "box",
      layout: "vertical",
      spacing: "sm",
      contents: [
        {
          type: "button",
          style: "link",
          height: "sm",
          action: {
            type: "uri",
            label: "CALL",
            uri: `tel:${adminPhone}`,
          },
        },
      ],
      flex: 0,
    },
  },
});
