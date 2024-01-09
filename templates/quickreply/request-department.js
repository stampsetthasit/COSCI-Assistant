exports.itProblem = {
  name: "แจ้งปัญหา > แจ้งซ่อมฝ่ายไอที",
  category: 1,
  categoryText: "IT",
  type: "text",
  text: "ได้โปรดบอกผมหน่อยว่า ปัญหาที่ต้องการแจ้งซ่อมคืออะไร",
};

exports.mdProblem = {
  name: "แจ้งปัญหา > แจ้งซ่อมฝ่ายสื่อ",
  category: 2,
  categoryText: "MD",
  type: "text",
  text: "ได้โปรดบอกผมหน่อยว่า ปัญหาที่ต้องการแจ้งซ่อมคืออะไร",
};

exports.bdProblem = {
  name: "แจ้งปัญหา > แจ้งซ่อมฝ่ายอาคาร",
  category: 3,
  categoryText: "BD",
  type: "text",
  text: "ได้โปรดบอกผมหน่อยว่า ปัญหาที่ต้องการแจ้งคืออะไร",
};

exports.otherProblem = {
  name: " > อื่นๆ (ระบุ)",
  type: "text",
  categoryText: "OH",
  text: "รบกวนอธิบายปัญหาที่ท่านต้องการจะแจ้งได้เลยครับ",
  quickReply: {
    items: [
      {
        type: "action",
        action: {
          type: "message",
          label: "ยกเลิกการแจ้ง ❌",
          text: "ยกเลิกการแจ้ง",
        },
      },
    ],
  },
};
