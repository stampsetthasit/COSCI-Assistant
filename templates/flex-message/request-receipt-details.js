exports.receiptDetails = ({
  reqId,
  reqCategory,
  reqStatus,
  lastUpdate,
  reqRoomNo,
  reqRoomName,
  reqTitle,
  reqDes,
  reqImage,
}) => ({
  type: "bubble",
  body: {
    type: "box",
    layout: "vertical",
    contents: [
      {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                size: "xl",
                wrap: true,
                text: `${reqId}`,
                color: "#ffffff",
                weight: "bold",
              },
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    color: "#ffffffcc",
                    size: "sm",
                    contents: [
                      {
                        type: "span",
                        text: "หมวดหมู่: ",
                      },
                      {
                        type: "span",
                        text: `${reqCategory}`,
                      },
                    ],
                    margin: "none",
                  },
                  {
                    type: "text",
                    color: "#ffffffcc",
                    size: "sm",
                    contents: [
                      {
                        type: "span",
                        text: "สถานะ: ",
                      },
                      {
                        type: "span",
                        text: `${reqStatus.name}`,
                      },
                    ],
                    margin: "none",
                  },
                ],
              },
            ],
            spacing: "sm",
          },
          {
            type: "separator",
            margin: "lg",
          },
          {
            type: "text",
            text: "รายละเอียด",
            color: "#ffffffde",
            size: "lg",
            weight: "bold",
            margin: "lg",
          },
          {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                color: "#ffffffcc",
                size: "sm",
                contents: [
                  {
                    type: "span",
                    text: "สถานที่: ",
                  },
                  {
                    type: "span",
                    text: `${reqRoomNo}`,
                  },
                ],
                margin: "none",
              },
              {
                type: "text",
                color: reqRoomName ? "#ffffffcc" : "#1368BE",
                size: "sm",
                contents: [
                  {
                    type: "span",
                    text: `(${reqRoomName ?? ""})`,
                    size: "xxs",
                  },
                ],
                margin: "none",
                wrap: true,
              },
            ],
            margin: "sm",
          },
          {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: `${reqTitle}`,
                color: "#ffffffde",
                maxLines: 2,
                wrap: true,
              },
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    contents: [],
                    size: "sm",
                    wrap: true,
                    margin: "lg",
                    color: "#ffffffde",
                    text: `${reqDes}`,
                    maxLines: 6,
                  },
                ],
              },
            ],
            paddingAll: "13px",
            backgroundColor: "#ffffff1A",
            cornerRadius: "2px",
            margin: "sm",
          },
        ],
      },
      {
        type: "text",
        color: "#ffffffde",
        margin: "xxl",
        contents: [
          {
            type: "span",
            text: `${lastUpdate.title}`,
          },
          {
            type: "span",
            text: `${lastUpdate.date}`,
          },
        ],
        size: "sm",
        wrap: true,
      },
    ],
    paddingAll: "20px",
    backgroundColor: "#1368BE",
  },
  footer: {
    type: "box",
    layout: "vertical",
    contents: [
      {
        type: "box",
        layout: "horizontal",
        contents: [
          {
            type: "image",
            url: `${reqImage}`,
            size: "full",
            aspectMode: "fit",
            aspectRatio: "4:3",
            gravity: "center",
            flex: 1,
          },
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                text: `${reqStatus.name}`,
                size: "xs",
                color: "#ffffff",
                align: "center",
                gravity: "center",
              },
            ],
            backgroundColor: `${reqStatus.color}`,
            paddingAll: "2px",
            paddingStart: "6px",
            paddingEnd: "6px",
            flex: 0,
            position: "absolute",
            offsetStart: "14px",
            offsetTop: "14px",
            cornerRadius: "150px",
            height: "25px",
          },
        ],
      },
    ],
    paddingAll: "0px",
  },
});

exports.cancelButton = (reqId) => ({
  type: "box",
  layout: "horizontal",
  contents: [
    {
      type: "text",
      text: "ยกเลิก",
      size: "xs",
      color: "#ffffff",
      align: "center",
      gravity: "center",
    },
  ],
  backgroundColor: "#D11A2A",
  paddingAll: "2px",
  paddingStart: "6px",
  paddingEnd: "6px",
  position: "absolute",
  cornerRadius: "150px",
  height: "24px",
  action: {
    type: "message",
    label: "action",
    text: `ยกเลิก ${reqId}`,
  },
  offsetTop: "2px",
  offsetEnd: "0px",
  width: "48px",
});
