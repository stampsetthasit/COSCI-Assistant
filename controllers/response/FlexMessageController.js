const {
  mapCategoryToDepartment,
  mapCategoryById,
  mapStatusById,
  removeNonDigits,
  getRandomElement,
  extractContentWithinParentheses,
  formatDateToString,
} = require("../../utils/helpers");
const { FlexMessage } = require("../../templates/template");
const { destroyRequestUncompleted } = require("../RequestController");

const QuickReplyController = require("./QuickReplyController");
const AdminController = require("../AdminController");
const RequestController = require("../RequestController");
const RoomController = require("../data-access/RoomController");
const RepairController = require("../data-access/RepairController");

exports.getResponse = async (request, requesterCode) => {
  try {
    // ติดตามปัญหา
    if (request === "ติดตามปัญหา") {
      const userRequests = await RequestController.getAllRequestByUser(
        requesterCode
      );

      if (userRequests.length == 0) return null;

      const bubbles = await createReceiptDetailsBubbles(userRequests, false);

      const replyMessage = {
        type: "flex",
        altText: "รายการปัญหา",
        contents: {
          type: "carousel",
          contents: bubbles,
        },
      };

      return replyMessage;
    }

    // รายการปัญหา
    if (request === "รายการปัญหา") {
      // ค้นหารายการปัญหาที่เกี่ยวข้องกับหมวดหมู่แอดมิน
      const admin = await AdminController.isAdminExist(requesterCode);
      if (admin) {
        const categoryArray = admin.category.split(",").map(Number);
        const requests = await RequestController.getAllRequestByCategory(
          categoryArray,
          AdminController.isSuperAdmin(categoryArray)
        );

        const bubbles = await createReceiptDetailsBubbles(requests, true);

        const replyMessage = {
          type: "flex",
          altText: "รายการปัญหา",
          contents: {
            type: "carousel",
            contents: bubbles,
          },
        };

        return replyMessage;
      }
    }

    // แจ้งปัญหา
    if (request === "เร่งด่วน" && reqId) {
      const category = QuickReplyController.getCategoryFromText(reqId);

      if (category !== 0) {
        const admins = await AdminController.getAdminInfo(category);
        const admin = getRandomElement(admins).dataValues;

        await destroyRequestUncompleted(requesterCode);

        return FlexMessage.ADMIN.PROFILE(
          admin.name,
          mapCategoryToDepartment(admin.category),
          removeNonDigits(admin.phone)
        );
      }
    } else if (
      request !== "ไม่" &&
      selectedOptions.length === 3 &&
      selectedOptions[2] === "ไม่"
    ) {
      await RequestController.updateRequestById(reqId, {
        req_des: request,
      });

      const rooms = await RoomController.getRoomInfoLists();
      const modifiedRooms = rooms.map((room) => ({
        ...room,
        build_name: extractContentWithinParentheses(room.build_name),
      }));

      const table = createRoomListTable(modifiedRooms);
      global.roomTableLists = table;
      global.canSelectRoom = true;
      selectedOptions.push(true);

      return [
        table,
        {
          type: "text",
          text: "รบกวนกดปุ่ม 'เลือก' ตามห้องที่ท่านพบเจอปัญหาด้วยครับ 😄",
        },
      ];
    } else if (
      request &&
      selectedOptions.length === 4 &&
      selectedOptions[3] === true
    ) {
      if (canSelectRoom) {
        const rooms = await RoomController.getRoomInfoLists();
        const isMatch = rooms.some((room) => room.room_id === request);
        if (isMatch) {
          await RequestController.updateRequestById(reqId, {
            req_pro_room: request,
          });
        }

        global.selectedOptions = [];
        global.canSelectRoom = false;
      } else {
        return { type: "text", text: "ขออภัยไม่สามารถแก้ไขข้อมูลได้" };
      }
    }
  } catch (error) {
    console.error("Error in FlexMessage getResponse:", error);
  }
};

exports.createReceiptDetails = async (request) => {
  const requestReceipt = FlexMessage.REQUEST.DETAILS;
  const cancelButton = FlexMessage.REQUEST.CANCEL_BUTTON;

  const rooms = await RoomController.getRoomInfoLists();
  const categories = await RepairController.getRepairCategory();
  const status = await RepairController.getRepairStatus();

  const requestInfo = createRequestInfo(request, rooms, categories, status);
  const receipts = requestReceipt(requestInfo);

  if (request.req_status == 1) {
    receipts.body.contents[0].contents.push(cancelButton(request.req_id));
    return receipts;
  } else {
    return receipts;
  }
};

function createRoomListTable(modifiedRooms) {
  const table = FlexMessage.ROOM.LISTS;

  modifiedRooms.forEach((room) => {
    const roomRow = createRoomTableRow(
      room.room_id,
      room.build_name,
      room.room_name
    );
    // add row
    table.contents.body.contents[1].contents.push(roomRow);
  });

  return table;
}

function createRoomTableRow(roomId, buildName, roomName) {
  return FlexMessage.ROOM.ROW(roomId, buildName, roomName);
}

function createRequestInfo(req, rooms, categories, status) {
  const {
    req_id,
    req_title,
    req_des,
    req_ctg,
    req_status,
    req_pro_room,
    req_finished,
  } = req;

  const isFinished = {
    title: req_finished == null ? "อัปเดตเมื่อ: " : "สำเร็จเมื่อ: ",
    date: formatDateToString(
      req_finished == null ? req.updated_at : req_finished
    ),
  };

  const room = rooms.find((room) => room.room_id === req_pro_room);
  const roomName = room
    ? `${room.build_name} ชั้น ${room.room_floor} ห้อง ${room.room_name}`
    : undefined;

  const categoryInfo = mapCategoryById(req_ctg, categories);
  const statusInfo = mapStatusById(req_status, status);

  const baseURL = process.env.BASE_URL;
  const reqImage = req_id
    ? `${baseURL}/public/uploads/${req_id}.jpg`
    : `${baseURL}/public/images/no-image-available.png`;

  return {
    reqId: req_id,
    reqCategory: categoryInfo,
    reqStatus: statusInfo,
    lastUpdate: isFinished,
    reqRoomNo: req_pro_room,
    reqRoomName: roomName,
    reqTitle: req_title,
    reqDes: req_des,
    reqImage: reqImage,
  };
}

async function createReceiptDetailsBubbles(requests, isAdmin) {
  let bubbles = [];
  const requestReceipt = FlexMessage.REQUEST.DETAILS;
  const cancelButton = FlexMessage.REQUEST.CANCEL_BUTTON;

  const rooms = await RoomController.getRoomInfoLists();
  const categories = await RepairController.getRepairCategory();
  const status = await RepairController.getRepairStatus();

  requests.forEach((req) => {
    const requestInfo = createRequestInfo(req, rooms, categories, status);
    const receipts = requestReceipt(requestInfo);

    if (req.req_status == 1 && !isAdmin) {
      receipts.body.contents[0].contents.push(cancelButton(req.req_id));
      bubbles.push(receipts);
    } else {
      bubbles.push(receipts);
    }
  });

  return bubbles;
}
