const Request = require("../models/request_schema");

exports.createRequest = async (requestData) => {
  const data = await Request.create(requestData);

  return data;
};

exports.updateRequest = async (userCode, requestData) => {
  const data = await Request.update(requestData, {
    where: {
      req_by: userCode,
    },
  });
  return data;
};

exports.updateRequestById = async (reqId, requestData) => {
  const data = await Request.update(requestData, {
    where: {
      req_id: reqId,
    },
  });
  return data;
};

exports.destroyRequestUncompleted = async (userCode) => {
  const data = await Request.destroy({
    where: {
      req_by: userCode,
      req_status: 0,
    },
  });

  return data;
};

exports.generateRequestId = (category) => {
  const requestId = category.toUpperCase() + "" + Date.now();
  return requestId;
};
