exports.roomsTable = {
  type: "flex",
  altText: "รายชื่อและรหัสห้อง",
  contents: {
    type: "bubble",
    hero: {
      type: "image",
      url: `${process.env.BASE_URL}/public/images/cosci-building.png`,
      size: "full",
      aspectRatio: "20:14",
      aspectMode: "fit",
      backgroundColor: "#1368BE",
    },
    body: {
      type: "box",
      layout: "vertical",
      spacing: "md",
      contents: [
        {
          type: "text",
          text: "รายชื่อและรหัสห้องของวิทยาลัยฯ ในระบบ",
          size: "lg",
          weight: "bold",
          wrap: true,
        },
        {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "box",
              layout: "baseline",
              contents: [
                {
                  type: "text",
                  text: "รหัสห้อง",
                  weight: "bold",
                },
                {
                  type: "text",
                  text: "อาคาร",
                  weight: "bold",
                },
                {
                  type: "text",
                  text: "ห้อง",
                  action: {
                    type: "message",
                    label: "action",
                    text: "เลขห้อง",
                  },
                  weight: "bold",
                  offsetEnd: "xxl",
                },
              ],
            },
          ],
          margin: "xxl",
        },
      ],
    },
    footer: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "button",
          style: "primary",
          action: {
            type: "message",
            label: "ยกเลิกการแจ้ง",
            text: "ยกเลิกการแจ้ง",
          },
          color: "#1368BE",
        },
      ],
    },
    size: "giga",
  },
};

exports.rowSelecter = (roomId, buildingName, roomNumber) => ({
  type: "box",
  layout: "horizontal",
  contents: [
    {
      type: "text",
      text: roomId,
      size: "md",
      offsetTop: "xl",
    },
    {
      type: "text",
      text: buildingName,
      size: "md",
      offsetTop: "xl",
    },
    {
      type: "text",
      text: roomNumber,
      size: "md",
      flex: 0,
      offsetTop: "xl",
    },
    {
      type: "button",
      action: {
        type: "message",
        label: "เลือก",
        text: roomId,
      },
      style: "link",
    },
  ],
});
