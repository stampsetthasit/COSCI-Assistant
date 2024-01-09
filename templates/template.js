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

const confirm = require("./confirm/confirm-template");

const QuickReply = {
  Problems: {
    IT: itProblem,
    MD: mdProblem,
    BD: bdProblem,
    OTHER: otherProblem,
    PRIORITY: priority,
    DETAIL: detail,
    GUIDE: guide,
  },

  Menu: {
    CATEGORY: menu,
  },
};

const Confirm = {
  TEMPLATE: confirm,
};

module.exports = { QuickReply, Confirm };
