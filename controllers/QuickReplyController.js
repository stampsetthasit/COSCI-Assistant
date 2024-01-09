const { QuickReply } = require("../templates/template");
const { Problems, Menu } = QuickReply;

const { getRepairProblemData } = require("./RepairController");
const {
  createRequest,
  generateRequestId,
  updateRequestById,
} = require("./RequestController");
const { getRole } = require("./UserController");

let userChoices = [];
const problemArray = [Problems.IT, Problems.MD, Problems.BD];

exports.getResponse = async (request, userCode) => {
  const matchedProblem = matchProblem(request);

  if (request === Menu.CATEGORY.name) {
    /* 
    USER: แจ้งปัญหา
    BOT: สวัสดีครับ🙏🏾 ไม่ทราบว่าต้องการแจ้งปัญหาในด้านใดครับ🤔
    */
    return Menu.CATEGORY;
  } else if (matchedProblem) {
    /*
    USER: แจ้งปัญหา > ฝ่าย...
    BOT: ได้โปรดบอกผมหน่อยว่า ปัญหาที่ต้องการแจ้งคืออะไร
    */
    // แจ้งปัญหา > ฝ่าย..
    const reqId = generateRequestId(matchedProblem.categoryText);
    const role =
      (await getRole(userCode)) == "admin" ? "ผู้ดูแลระบบ" : "บุคคลทั่วไป";

    await createRequest({
      req_id: reqId,
      req_by: userCode,
      req_ctg: matchedProblem.category,
      req_by_who: role,
      req_status: 0,
    });

    global.reqId = reqId;
    global.reqStatus = 0;

    console.log("1", reqId, reqStatus);

    return await generateQuickReplyItems(
      {
        name: matchedProblem.name,
        category: matchedProblem.category,
        text: matchedProblem.text,
        subMenuLabel: "อื่นๆ (ระบุ)",
      },
      true // isMenu
    );
  } else if (request.includes(Problems.OTHER.name)) {
    // แจ้งปัญหา > ฝ่าย > อื่นๆ (ระบุ)
    // TODO: รอจัดการเรื่องรับข้อความอื่นๆ********
    return Problems.OTHER;
  } else if (userChoices.includes(request)) {
    /* 
    USER: ปัญหา...
    BOT: ระบุอุปกรณ์ที่ต้องการแจ้ง
    */
    userChoices = [request];
    console.log("2", reqId, reqStatus);
    await updateRequestById(reqId, {
      req_title: request,
    });

    return Problems.PRIORITY;
  } else if (request && userChoices.length === 1) {
    userChoices.push(request);
    console.log("3", reqId, userChoices);
    //จัดการความเร่งด่วน
    if (request === "ไม่เร่งด่วน") {
      return Problems.GUIDE;
    }
  } else if (
    request &&
    userChoices.length === 2 &&
    userChoices[1] === "ไม่เร่งด่วน"
  ) {
    /*
      BOT: ท่านต้องการแก้ไขปัญหาเบื้องต้นด้วยตัวเองก่อนไหมครับ 🧐
    */

    if (request === "ไม่") {
      userChoices.push(request);
      return Problems.DETAIL;
    } else if (request === "ใช่") {
      return { type: "text", text: "วิธีแก้ไขเบื้องต้น" }; // TODO: HANDLE THIS *******
    }
  } else if (request && userChoices.length === 3 && userChoices[2] === "ไม่") {
    await updateRequestById(reqId, {
      req_des: request,
    });

    userChoices.push(true);

    return;
  } else if (request) {
  }
};

function matchProblem(userProblem) {
  const matchedProblem = problemArray.find(
    (problem) => userProblem === problem.name
  );

  return matchedProblem;
}

async function generateQuickReplyItems(config, isMenu) {
  const { name, category, text, subMenuLabel } = config;
  const quickReplyItems = [];

  const problems = await getRepairProblemData(category);

  problems.map((problem) => {
    const truncatedLabel = truncateLabel(problem.prob_name, 20);
    quickReplyItems.unshift({
      type: "action",
      action: {
        type: "message",
        label: truncatedLabel,
        text: problem.prob_name,
      },
    });
    userChoices.push(problem.prob_name);
  });

  if (subMenuLabel && isMenu) {
    quickReplyItems.push({
      type: "action",
      action: {
        type: "message",
        label: subMenuLabel,
        text: `${name} > ${subMenuLabel}`,
      },
    });
  } else if (subMenuLabel && !isMenu) {
    quickReplyItems.push({
      type: "action",
      action: {
        type: "message",
        label: subMenuLabel,
        text: subMenuLabel,
      },
    });
  }
  return {
    name,
    type: "text",
    text,
    quickReply: { items: quickReplyItems },
  };
}

function truncateLabel(label, maxLength) {
  if (label.length > maxLength) {
    return label.slice(0, maxLength - 3) + "...";
  }
  return label;
}

exports.QuickReply = QuickReply;
