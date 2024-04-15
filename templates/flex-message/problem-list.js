exports.problemSolutionTicket = (
  ticketCategory,
  category,
  listLength,
  lastUpdate,
  problemDetails
) => ({
  type: "bubble",
  body: {
    type: "box",
    layout: "vertical",
    contents: [
      {
        type: "text",
        text: "รายการ" + ticketCategory,
        weight: "bold",
        color: "#1368BE",
        size: "sm",
      },
      {
        type: "text",
        text: `หมวดหมู่ฝ่าย${category}`,
        weight: "bold",
        size: "xxl",
        margin: "md",
        scaling: true,
      },
      {
        type: "text",
        text: `${listLength} รายการ`,
        size: "xs",
        color: "#aaaaaa",
        wrap: true,
      },
      {
        type: "separator",
        margin: "xxl",
      },
      {
        type: "box",
        layout: "vertical",
        margin: "xxl",
        spacing: "sm",
        contents: [
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                text: ticketCategory,
                size: "sm",
                color: "#aaaaaa",
                flex: 3,
              },
              ...(ticketCategory === "ปัญหา"
                ? [
                    {
                      type: "text",
                      text: "เพิ่มโดย",
                      size: "sm",
                      color: "#aaaaaa",
                      flex: 3,
                      align: "end",
                    },
                  ]
                : []),
            ],
          },
        ],
      },
      {
        type: "box",
        layout: "vertical",
        margin: "xxl",
        spacing: "sm",
        contents: problemDetails,
      },
      {
        type: "separator",
        margin: "xxl",
      },
      {
        type: "box",
        layout: "horizontal",
        margin: "md",
        contents: [
          {
            type: "text",
            text: "อัปเดตล่าสุด",
            size: "xs",
            color: "#aaaaaa",
            flex: 0,
          },
          {
            type: "text",
            text: `${lastUpdate}`,
            color: "#aaaaaa",
            size: "xs",
            align: "end",
          },
        ],
      },
    ],
  },
  styles: {
    footer: {
      separator: true,
    },
  },
});

exports.problemDetail = (title, adminName) => ({
  type: "box",
  layout: "horizontal",
  contents: [
    {
      type: "text",
      text: `${title}`,
      size: "sm",
      color: "#555555",
      flex: 2,
    },
    {
      type: "text",
      text: `${adminName}`,
      size: "sm",
      color: "#111111",
      align: "end",
    },
  ],
});

exports.solutionDetail = (title, problem) => ({
  type: "box",
  layout: "horizontal",
  contents: [
    {
      type: "text",
      text: `${title}`,
      size: "sm",
      color: "#555555",
      flex: 3,
    },
    {
      type: "text",
      text: "วิธีแก้ไข",
      size: "sm",
      color: "#1368BE",
      align: "end",
      action: {
        type: "message",
        label: "action",
        text: `วิธีแก้ไขปัญหา > ${problem}`,
      },
      weight: "bold",
      decoration: "underline",
    },
  ],
});

exports.selectProblemRelated = (title, id) => ({
  type: "box",
  layout: "horizontal",
  contents: [
    {
      type: "text",
      text: `${title}`,
      size: "sm",
      color: "#555555",
      flex: 3,
    },
    {
      type: "text",
      text: "เลือก",
      size: "sm",
      color: "#1368BE",
      align: "end",
      action: {
        type: "message",
        label: "action",
        text: `${id}`,
      },
      weight: "bold",
      decoration: "underline",
    },
  ],
});
