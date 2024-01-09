const repair = require("../config/database").repair;

exports.validateEmail = async (email) => {
  try {
    const [results, metadata] = await repair.query(
      "SELECT mem_status FROM member WHERE mem_mail = ?",
      {
        replacements: [email],
        type: repair.QueryTypes.Raw,
      }
    );

    if (results.length > 0) {
      return results[0];
    }
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getRepairProblemData = async (category) => {
  try {
    const [results, metadata] = await repair.query(
      "SELECT * FROM repair_problem WHERE ctg_no = :category",
      {
        replacements: { category },
        type: repair.QueryTypes.Raw,
      }
    );
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getRepairMenuData = async (category) => {
  try {
    const [results, metadata] = await repair.query(
      "SELECT * FROM repair_menu WHERE ctg_no = :category",
      {
        replacements: { category },
        type: repair.QueryTypes.Raw,
      }
    );
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
