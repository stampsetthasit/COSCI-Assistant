const { QuickReply } = require("../../templates/template");
const { Problems, Menu, ADMIN } = QuickReply;
const {
  isBusinessHour,
  getTextAfterKeyword,
  convertStringToCategory,
} = require("../../utils/helpers");
const { isAdminExist } = require("../AdminController");

const RepairController = require("../data-access/RepairController");
const RequestController = require("../RequestController");
const UserController = require("../UserController");
const ProblemController = require("../ProblemController");
const SolutionController = require("../SolutionController");

let selectedOptions = [];
let problemTypes = [Problems.IT, Problems.MD, Problems.BD];
global.solutionInfo = ["title", "description", "related_problem", "image", "category"];

exports.getResponse = async (request, requesterCode) => {
  try {
    global.selectedOptions = selectedOptions;

    const matchedProblem = findProblemByName(request);
    const isCategoryRequest = request === Menu.CATEGORY.name;

    if (isCategoryRequest) return Menu.CATEGORY;

    const response = await handleQuickReply(
      request,
      requesterCode,
      matchedProblem
    );

    return response;
  } catch (error) {
    console.error("Error in QuickReply getResponse:", error);
  }
};

exports.getCategoryFromText = (request) => {
  if (request.includes(QuickReply.Problems.IT.categoryText)) {
    return QuickReply.Problems.IT.category;
  } else if (request.includes(QuickReply.Problems.MD.categoryText)) {
    return QuickReply.Problems.MD.category;
  } else if (request.includes(QuickReply.Problems.BD.categoryText)) {
    return QuickReply.Problems.BD.category;
  } else {
    // Default category if no match
    return 0;
  }
};

async function handleQuickReply(request, requesterCode, matchedProblem) {
  // แจ้งปัญหา
  if (matchedProblem) {
    /*
    USER: แจ้งปัญหา > ฝ่าย...
    BOT: ได้โปรดบอกผมหน่อยว่า ปัญหาที่ต้องการแจ้งคืออะไร
    */
    // แจ้งปัญหา > ฝ่าย...
    const reqId = await handleMatchedProblem(matchedProblem, requesterCode);
    console.log(matchedProblem);
    const quickReply = await generateQuickReplyItems(
      {
        ...matchedProblem,
        subMenuLabel: "อื่นๆ (ระบุ)",
      },
      selectedOptions
    );

    console.log("MATCHED PROBLEM LOG : : :", reqId);

    console.log(quickReply);

    return quickReply;
  } else if (request.includes(Problems.OTHER.name)) {
    // แจ้งปัญหา > ฝ่าย > อื่นๆ (ระบุ)
    selectedOptions.push(Problems.OTHER.categoryText);
    return Problems.OTHER;
  } else if (
    selectedOptions.includes(request) ||
    selectedOptions.includes(Problems.OTHER.categoryText)
  ) {
    /* 
    USER: ปัญหา...
    BOT: ระบุอุปกรณ์ที่ต้องการแจ้ง
    */
    selectedOptions = await handleSelectedOption(request);
    return Problems.PRIORITY;
  } else if (selectedOptions.length === 1) {
    selectedOptions = await handleSelectedOption(request);
    if (request === "ไม่เร่งด่วน") {
      return Problems.GUIDE;
    }
    if (request === "เร่งด่วน" && reqId) {
      const isWithinBusinessHour = isBusinessHour(
        process.env.BUSINESS_START_HOUR,
        process.env.BUSINESS_END_HOUR
      );

      if (!isWithinBusinessHour) {
        selectedOptions[1] = "ไม่เร่งด่วน";
        return [
          { type: "text", text: "ขออภัย😢 ไม่มีพนักงานออนไลน์ในขณะนี้🙏🏾" },
          Problems.GUIDE,
        ];
      }
    }
  } else if (
    request &&
    selectedOptions.length === 2 &&
    selectedOptions[1] === "ไม่เร่งด่วน"
  ) {
    /*
      BOT: ท่านต้องการแก้ไขปัญหาเบื้องต้นด้วยตัวเองก่อนไหมครับ 🧐
    */
    if (request === "ไม่") {
      selectedOptions.push(request);

      return Problems.DETAIL;
    } else if (request === "ใช่") {
      await RequestController.destroyRequestUncompleted(requesterCode);

      return { type: "text", text: "วิธีแก้ไขเบื้องต้น" }; // TODO: HANDLE THIS *******
    }
  } else if (
    request &&
    selectedOptions.length === 4 &&
    selectedOptions[3] === true
  ) {
    selectedOptions = [];
    return Problems.IMAGE;
  }

  // Admin menu: วิธีแก้ไขปัญหา
  if (request === ADMIN.SOLUTIONS.name) {
    if (await isAdminExist(requesterCode)) {
      return ADMIN.SOLUTIONS;
    }
  } else if (
    request === ADMIN.SOLUTIONS.name + " > เพิ่มปัญหา" ||
    request === ADMIN.SOLUTIONS.name + " > เพิ่มวิธีแก้ไข"
  ) {
    return ADMIN.MENU(request);
  } else if (
    request.includes("เพิ่มปัญหา > ฝ่าย") ||
    request.includes("เพิ่มวิธีแก้ไข > ฝ่าย")
  ) {
    await ProblemController.destroyProblemUncompleted(requesterCode);
    await SolutionController.destroySolutionUncompleted(requesterCode);

    const menu = getTextAfterKeyword(request, "เพิ่ม");
    const category = convertStringToCategory(
      getTextAfterKeyword(request, "ฝ่าย")
    );

    if (menu === "ปัญหา") {
      const problemCode = await ProblemController.generateProblemCode(category);
      await ProblemController.createProblem(
        problemCode,
        null,
        category,
        requesterCode
      );
    } else if (menu === "วิธีแก้ไข") {
      const solutionCode = await SolutionController.generateSolutionCode(
        category
      );
      global.solutionId = solutionCode 
      await SolutionController.createSolution(
        solutionCode,
        null,
        category,
        requesterCode
      );
    }

    solutionInfo[4] = `${category}`

    return ADMIN.ASK(`กรุณาระบุชื่อเรื่องของ${menu}ที่ต้องการเพิ่มด้วยครับ 😁`);
  } else if (
    !request.includes("ตั้งค่า > วิธีแก้ไขปัญหาเบื้องต้น > เพิ่มวิธีแก้ไข >") &&
    (await SolutionController.getSolutionTitleByAdminCode(requesterCode)) &&
    solutionInfo[0] == "title"
  ) {
    if (request !== "ยกเลิกการตั้งค่า") {
      solutionInfo[0] = `${request}`;
      console.log("LOG ARRAY 0 + + + + + >", solutionInfo);
    }

    global.solutionInfo = solutionInfo;

    return ADMIN.ASK(
      "กรุณาระบุรายละเอียดของวิธีแก้ไขปัญหาที่ต้องการเพิ่มด้วยครับ 😄"
    );
  } else if (solutionInfo[0] !== "title" && solutionInfo[1] == "description") {
    if (request !== "ยกเลิกการตั้งค่า") {
      solutionInfo[1] = `${request}`;
      console.log("LOG ARRAY 1 + + + + + >", solutionInfo);
    }

  } else if (solutionInfo[1] !== "description" && solutionInfo[2] == "related_problem") {
    if (request !== "ยกเลิกการตั้งค่า") {
      // จัดการรูป
      solutionInfo[2] = `${request}`;
      console.log("LOG ARRAY 2 + + + + + >", solutionInfo);
    }

    return ADMIN.ASK_IMAGE;
  }
}

function findProblemByName(userProblem) {
  const matchedProblem = problemTypes.find(
    (problem) => userProblem === problem.name
  );

  return matchedProblem;
}

async function handleMatchedProblem(matchedProblem, requesterCode) {
  const reqId = RequestController.generateRequestId(
    matchedProblem.categoryText
  );
  const requesterRole = await UserController.getRole(requesterCode);
  const requestCreationData = {
    req_id: reqId,
    req_by: requesterCode,
    req_ctg: matchedProblem.category,
    req_by_who: requesterRole,
    req_status: 0,
  };

  await RequestController.createRequest(requestCreationData);
  global.reqId = reqId;

  return reqId;
}

async function handleSelectedOption(request) {
  if (selectedOptions.length === 1) {
    selectedOptions.push(request);
  } else {
    selectedOptions = [request];
    await RequestController.updateRequestById(reqId, {
      req_title: request,
    });
  }

  return selectedOptions;
}

async function generateQuickReplyItems(config, selectedOptions) {
  const { name, category, text, subMenuLabel } = config;
  const quickReplyItems = [];

  const problems = await RepairController.getRepairProblemData(category);

  problems.map((problem) => {
    quickReplyItems.unshift({
      type: "button",
      action: {
        type: "message",
        label: problem.prob_name,
        text: problem.prob_name,
      },
      adjustMode: "shrink-to-fit",
    });
    selectedOptions.push(problem.prob_name);
  });

  if (subMenuLabel) {
    quickReplyItems.push({
      type: "button",
      action: {
        type: "message",
        label: subMenuLabel,
        text: `${name} > ${subMenuLabel}`,
      },
    });
  }
  const flex = Problems.TOPIC;
  flex.contents.body.contents = quickReplyItems;

  // console.log(flex.contents.body.contents);

  return flex;
}

module.exports.solutionInfo = solutionInfo;
