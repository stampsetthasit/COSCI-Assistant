const {
  itProblem,
  mdProblem,
  bdProblem,
  otherProblem,
} = require("./quickreply/request-department");
const priority = require("./quickreply/request-priority");
const detail = require("./quickreply/request-detail");
const guide = require("./quickreply/request-fix-guide");
const image = require("./quickreply/request-image.js");
const problemSolution = require("./quickreply/problems-solutions");
const adminMenu = require("./quickreply/problems-solutions-menu");
const updateStatus = require("./quickreply/request-update.js");

const confirm = require("./confirm/confirm-template");

const menu = require("./flex-message/request-menu.js");
const profile = require("./flex-message/admin-profile");
const {
  receiptDetails,
  cancelButton,
  updateButton,
} = require("./flex-message/request-receipt-details");
const { roomsTable, rowSelecter } = require("./flex-message/rooms-selecter");
const topic = require("./flex-message/request-topic.js");
const {
  problemSolutionTicket,
  problemDetail,
  solutionDetail,
  selectProblemRelated,
} = require("./flex-message/problem-list.js");

const QuickReply = {
  Problems: {
    IT: itProblem,
    MD: mdProblem,
    BD: bdProblem,
    OTHER: otherProblem,
    PRIORITY: priority,
    DETAIL: detail,
    GUIDE: guide,
    IMAGE: image,
    TOPIC: topic,
    UPDATE_STATUS: updateStatus,
  },

  Menu: {
    CATEGORY: menu,
  },

  ADMIN: {
    MENU: adminMenu,
    SOLUTIONS: problemSolution.category,
    ASK: problemSolution.ask,
    ASK_IMAGE: problemSolution.askImage,
  },
};

const FlexMessage = {
  ADMIN: {
    PROFILE: profile,
  },

  ROOM: {
    LISTS: roomsTable,
    ROW: rowSelecter,
  },

  REQUEST: {
    DETAILS: receiptDetails,
    CANCEL_BUTTON: cancelButton,
    UPDATE_BUTTON: updateButton,
  },

  PROBLEM: {
    TICKET: problemSolutionTicket,
    DETAIL: problemDetail,
    SOLUTION: solutionDetail,
    REALATED: selectProblemRelated,
  },
};

const Confirm = {
  TEMPLATE: confirm,
};

module.exports = { QuickReply, FlexMessage, Confirm };
