exports.category = {
  name: "ตั้งค่า > วิธีแก้ไขปัญหาเบื้องต้น",
  type: "text",
  text: "กรุณาเลือกเมนูครับ",
  role: "admin",
  quickReply: {
    items: [
      {
        type: "action",
        action: {
          type: "message",
          label: "เพิ่มปัญหา ➕",
          text: "ตั้งค่า > วิธีแก้ไขปัญหาเบื้องต้น > เพิ่มปัญหา",
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "รายการปัญหา 📋",
          text: "ตั้งค่า > วิธีแก้ไขปัญหาเบื้องต้น > รายการปัญหา",
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "เพิ่มวิธีแก้ไข ➕",
          text: "ตั้งค่า > วิธีแก้ไขปัญหาเบื้องต้น > เพิ่มวิธีแก้ไข",
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "รายการวิธีแก้ไข 📝",
          text: "ตั้งค่า > วิธีแก้ไขปัญหาเบื้องต้น > รายการวิธีแก้ไข",
        },
      },
    ],
  },
};

exports.ask = (text) => ({
  type: "text",
  text: `${text}`,
  quickReply: {
    items: [
      {
        type: "action",
        action: {
          type: "message",
          label: "ยกเลิกการตั้งค่า ❌",
          text: "ยกเลิกการตั้งค่า",
        },
      },
    ],
  },
});

exports.askImage = {
  type: "text",
  text: "รบกวนแนบรูปภาพประกอบวิธีแก้ไขปัญหาด้วยครับ",
  quickReply: {
    items: [
      {
        type: "action",
        imageUrl: `${process.env.BASE_URL}/public/images/camera.png`,
        action: {
          type: "camera",
          label: "เปิดกล้อง",
        },
      },
      {
        type: "action",
        imageUrl: `${process.env.BASE_URL}/public/images/gellery.png`,
        action: {
          type: "cameraRoll",
          label: "เลือกรูปภาพ",
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "ยกเลิกการตั้งค่า ❌",
          text: "ยกเลิกการตั้งค่า",
        },
      },
    ],
  },
};
