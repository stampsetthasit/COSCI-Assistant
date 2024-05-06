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
const ProblemController = require("../ProblemController");
const SolutionController = require("../SolutionController");

const { solutionInfo } = require("./QuickReplyController");

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

    if (request === "วิธีแก้ไขปัญหา") {
      const solutions = await SolutionController.getAllSolutions();

      const bubbles = await createProblemDetailBubbles(
        "วิธีแก้ไขปัญหา",
        solutions
      );

      const replyMessage = {
        type: "flex",
        altText: "วิธีแก้ไขปัญหาเบื้องต้น รายการวิธีแก้ไข",
        contents: {
          type: "carousel",
          contents: bubbles,
        },
      };

      return replyMessage;
    }

    // Admin menu: วิธีแก้ไขปัญหา
    if (request === "ตั้งค่า > วิธีแก้ไขปัญหาเบื้องต้น > รายการปัญหา") {
      const problems = await ProblemController.getAllProblems();

      const bubbles = await createProblemDetailBubbles("ปัญหา", problems);
      // console.log("LOG > > > >", problems);

      const replyMessage = {
        type: "flex",
        altText: "วิธีแก้ไขปัญหาเบื้องต้น รายการปัญหา",
        contents: {
          type: "carousel",
          contents: bubbles,
        },
      };

      return replyMessage;
    } else if (
      !request.includes("ตั้งค่า > วิธีแก้ไขปัญหาเบื้องต้น > เพิ่มปัญหา >") &&
      (await ProblemController.getProblemStatusByAdminCode(requesterCode))
    ) {
      if (request !== "ยกเลิกการตั้งค่า") {
        const addedTitle = await ProblemController.updateProblem(
          request,
          requesterCode
        );

        // แสดงรายการทั้งหมด
        if (addedTitle) {
          const problems = await ProblemController.getAllProblems();

          const bubbles = await createProblemDetailBubbles("ปัญหา", problems);

          const replyMessage = {
            type: "flex",
            altText: "วิธีแก้ไขปัญหาเบื้องต้น รายการปัญหา",
            contents: {
              type: "carousel",
              contents: bubbles,
            },
          };

          return replyMessage;
        }
      }
    } else if (
      solutionInfo[0] !== "title" &&
      solutionInfo[1] !== "description"
    ) {
      console.log("LOG SOLUTION INFO > > > > >", solutionInfo);
      const problems = await ProblemController.getProblemByCategory(
        solutionInfo[4]
      );

      const bubbles = await createProblemDetailBubbles(
        "ปัญหาที่เกี่ยวข้อง",
        problems
      );

      const replyMessage = {
        type: "flex",
        altText: "วิธีแก้ไขปัญหาเบื้องต้น รายการปัญหาที่เกี่ยวข้อง",
        contents: {
          type: "carousel",
          contents: bubbles,
        },
      };

      return replyMessage;
    } else if (
      request === "ตั้งค่า > วิธีแก้ไขปัญหาเบื้องต้น > รายการวิธีแก้ไข"
    ) {
      const solutions = await SolutionController.getAllSolutions();

      const bubbles = await createProblemDetailBubbles(
        "วิธีแก้ไขปัญหา",
        solutions
      );

      const replyMessage = {
        type: "flex",
        altText: "วิธีแก้ไขปัญหาเบื้องต้น รายการวิธีแก้ไข",
        contents: {
          type: "carousel",
          contents: bubbles,
        },
      };

      return replyMessage;
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
  const updateButton = FlexMessage.REQUEST.UPDATE_BUTTON;

  const rooms = await RoomController.getRoomInfoLists();
  const categories = await RepairController.getRepairCategory();
  const status = await RepairController.getRepairStatus();

  requests.forEach((req) => {
    const requestInfo = createRequestInfo(req, rooms, categories, status);
    const receipts = requestReceipt(requestInfo);

    if (req.req_status == 1 && !isAdmin) {
      receipts.body.contents[0].contents.push(cancelButton(req.req_id));
      bubbles.push(receipts);
    } else if (isAdmin) {
      if (req.req_status != 11) {
        receipts.body.contents[0].contents.push(updateButton(req.req_id));
      }
      bubbles.push(receipts);
    }
  });

  return bubbles;
}

async function createProblemDetailBubbles(ticketCategory, problems) {
  let categoryTickets = {}; // Object to hold tickets for each category

  const problemDetail = FlexMessage.PROBLEM.DETAIL;
  const solutionDetail = FlexMessage.PROBLEM.SOLUTION;
  const relatedProblem = FlexMessage.PROBLEM.REALATED;

  for (const prob of problems) {
    const category = prob.dataValues.category;

    // Create a new ticket if it doesn't exist for this category
    if (!categoryTickets[category]) {
      categoryTickets[category] = {
        count: 0,
        details: [], // Array to hold problem details
      };
    }

    // Increment the count for this category
    categoryTickets[category].count++;

    // Add problem detail to the array for this category
    const adminName = await AdminController.getAdminName(
      prob.dataValues.add_by
    );
    if (ticketCategory === "ปัญหา") {
      categoryTickets[category].details.push(
        problemDetail(
          prob.dataValues.title,
          adminName.name ?? prob.dataValues.add_by
        ) // วิธีแก้ไขปัญหา
      );
    } else if (ticketCategory === "วิธีแก้ไขปัญหา") {
      categoryTickets[category].details.push(
        solutionDetail(prob.dataValues.title, prob.dataValues.title)
      );
    } else if (ticketCategory === "ปัญหาที่เกี่ยวข้อง") {
      categoryTickets[category].details.push(
        relatedProblem(prob.dataValues.title, prob.dataValues.id)
      );
    }

    // Update the last updated time if necessary
    const updatedAt = new Date(prob.dataValues.updated_at)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    if (
      !categoryTickets[category].updatedAt ||
      updatedAt > categoryTickets[category].updatedAt
    ) {
      categoryTickets[category].updatedAt = updatedAt;
    }
  }

  // Convert categoryTickets object to bubbles array
  let bubbles = [];
  for (const [category, ticket] of Object.entries(categoryTickets)) {
    let categoryLabel;
    switch (category) {
      case "1":
        categoryLabel = "ไอที";
        break;
      case "2":
        categoryLabel = "สื่อ";
        break;
      case "3":
        categoryLabel = "อาคาร";
        break;
      default:
        categoryLabel = "Unknown";
    }
    bubbles.push(
      FlexMessage.PROBLEM.TICKET(
        ticketCategory,
        categoryLabel,
        ticket.count,
        ticket.updatedAt,
        ticket.details
      )
    );
  }

  return bubbles;
}
