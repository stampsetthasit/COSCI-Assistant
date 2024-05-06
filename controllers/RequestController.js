const { Op } = require("sequelize");
const fs = require("fs");
const Request = require("../models/request_schema");
const RequestImage = require("../models/request_image_schema");
const path = require("path");

/* 
STATUS
0 = ยกเลิกการแจ้ง
1 = รอตรวจสอบ
2 = ปฏิเสธการซ่อม
3 = เจ้าหน้าที่รับเรื่อง
4 = ซ่อมไม่สำเร็จ
5 = ซ่อมสำเร็จ
6 = ส่งเรื่องพัสดุ
7 = ปฏิเสธการซ่อม
8 = พัสดุรับเรื่อง
9 = ซ่อมไม่สำเร็จ
10 = ซ่อมสำเร็จ
11 = สำเร็จ
*/

// Request
exports.createRequest = async (data) => {
  try {
    const createdData = await Request.create(data);
    return createdData;
  } catch (error) {
    console.error("Error creating request:", error);
    throw error;
  }
};

exports.updateRequest = async (userCode, data) => {
  try {
    const updatedData = await Request.update(data, {
      where: {
        req_by: userCode,
      },
    });
    return updatedData;
  } catch (error) {
    console.error("Error updating request:", error);
    throw error;
  }
};

exports.updateRequestById = async (reqId, data) => {
  try {
    const updatedData = await Request.update(data, {
      where: {
        req_id: reqId,
      },
    });
    return updatedData;
  } catch (error) {
    console.error("Error updating request by ID:", error);
    throw error;
  }
};

exports.destroyRequestUncompleted = async (userCode) => {
  try {
    const deletedData = await Request.destroy({
      where: {
        req_by: userCode,
        req_status: 0,
      },
    });
    return deletedData;
  } catch (error) {
    console.error("Error destroying uncompleted request:", error);
    throw error;
  }
};

exports.generateRequestId = (category) => {
  const requestId = category.toUpperCase() + Date.now();
  return requestId;
};

exports.getAllRequestByUser = async (userCode) => {
  try {
    const requestsData = await Request.findAll({
      where: {
        req_by: userCode,
        req_status: {
          [Op.ne]: 0, // req_status != 0
        },
      },
      order: [["req_id", "DESC"]],
      limit: 10,
    });

    return requestsData;
  } catch (error) {
    console.error("Error get request:", error);
    throw error;
  }
};

exports.getRequestById = async (userCode, reqId) => {
  try {
    const requestsData = await Request.findOne({
      where: {
        req_id: reqId,
        req_by: userCode,
      },
    });

    return requestsData;
  } catch (error) {
    console.error("Error get request:", error);
    throw error;
  }
};

exports.isReqIdValid = async (reqId) => {
  try {
    const validId = await Request.findOne({
      where: {
        req_id: reqId,
      },
    });

    return validId;
  } catch (error) {
    console.error("Error verify reqId:", error);
    throw error;
  }
};

exports.cancelRequest = async (userCode, reqId) => {
  try {
    const canceledRequest = await Request.destroy({
      where: {
        req_id: reqId,
        req_by: userCode,
        req_status: {
          [Op.eq]: 1, // req_status = 1
        },
      },
    });

    if (canceledRequest) {
      deleteImageOnServer(reqId);
    }

    return canceledRequest;
  } catch (error) {
    console.error("Error get request:", error);
    throw error;
  }
};

exports.getAllRequestNotCompleted = async () => {
  try {
    const requestData = await Request.findAll({
      where: {
        req_finished: {
          [Op.eq]: null,
        },
      },
    });

    return requestData;
  } catch (error) {
    console.error("Error get request:", error);
    throw error;
  }
};

exports.getAllRequestByCategory = async (categories, isSuperAdmin) => {
  try {
    let whereCondition = {
      req_finished: { [Op.eq]: null },
    };

    if (!isSuperAdmin) {
      // Normal user: Only retrieve requests for their specific category
      whereCondition.req_ctg = {
        [Op.in]: Array.isArray(categories)
          ? categories.map(Number)
          : [Number(categories)],
      };
    }
    // Super admin: Retrieve all requests
    // No need to add req_ctg condition for super admins

    const requestsData = await Request.findAll({
      where: whereCondition,
    });

    return requestsData;
  } catch (error) {
    console.error("Error get all request:", error);
    throw error;
  }
};

// Image
exports.createRequestImage = async (data) => {
  try {
    const createImage = await RequestImage.create(data);
    return createImage;
  } catch (error) {
    console.error("Error get request image:", error);
    throw error;
  }
};

exports.getRequestImage = async (reqId) => {
  try {
    const imageData = await RequestImage.findOne({
      where: {
        req_id: reqId,
      },
    });

    return imageData;
  } catch (error) {
    console.error("Error get request image:", error);
    throw error;
  }
};

function deleteImageOnServer(reqId) {
  const directoryPath = path.resolve("./");
  const imagePath = `${directoryPath}/public/uploads/${reqId}.jpg`;

  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log(`File ${reqId}.jpg has been deleted successfully`);
    }
  });
}
