const {
  itProblem,
  mdProblem,
  bdProblem,
  otherProblem,
} = require("./quickreply/request-department");
const priority = require("./quickreply/request-priority");
const menu = require("./quickreply/request-menu");
const detail = require("./quickreply/request-detail");
const guide = require("./quickreply/request-fix-guide");
const image = require("./quickreply/request-image.js");

const confirm = require("./confirm/confirm-template");

const profile = require("./flex-message/admin-profile");
const {
  receiptDetails,
  cancelButton,
} = require("./flex-message/request-receipt-details");
const { roomsTable, rowSelecter } = require("./flex-message/rooms-selecter");

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
  },

  Menu: {
    CATEGORY: menu,
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
  },
};

const Confirm = {
  TEMPLATE: confirm,
};

module.exports = { QuickReply, FlexMessage, Confirm };
