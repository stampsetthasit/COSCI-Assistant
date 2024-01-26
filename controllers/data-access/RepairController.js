const { runQuery } = require("../../config/database");

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

exports.validateEmail = async (email) => {
  const query = "SELECT mem_status FROM member WHERE mem_mail = ?";
  const results = await runQuery(query, [email]);

  return results.length > 0 ? results[0] : null;
};

exports.getMemberPhone = async (email) => {
  const query = "SELECT mem_phone FROM member WHERE mem_mail = ?";
  const results = await runQuery(query, [email]);

  return results.length > 0 ? results[0].mem_phone : null;
};

exports.getMemberCategory = async (email) => {
  const query = "SELECT mem_repair FROM member WHERE mem_mail = ?";
  const results = await runQuery(query, [email]);

  return results.length > 0
    ? extractNumbersAsString(results[0].mem_repair)
    : null;
};

exports.getRepairProblemData = async (category) => {
  return runQuery("SELECT * FROM repair_problem WHERE ctg_no = :category", {
    category,
  });
};

exports.getRepairMenuData = async (category) => {
  return runQuery("SELECT * FROM repair_menu WHERE ctg_no = :category", {
    category,
  });
};

exports.getRepairStatus = async () => {
  return runQuery("SELECT * FROM repair_status");
};

exports.getRepairCategory = async () => {
  return runQuery("SELECT * FROM repair_category");
};

function extractNumbersAsString(inputString) {
  const regex = /\d+/g;
  const matches = inputString.match(regex);

  if (matches) {
    return matches.join(",");
  } else {
    return "";
  }
}
