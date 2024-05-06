const { Op } = require("sequelize");
const { convertCategoryToString } = require("../utils/helpers");

const Problem = require("../models/problem_schema");

async function getLatestProblemCode(category) {
  try {
    const latestProblem = await Problem.findOne({
      order: [["id", "DESC"]],
      attributes: ["id"],
      limit: 1,
      where: {
        category: category,
      },
    });

    category = convertCategoryToString(category);

    if (latestProblem) {
      return latestProblem.id;
    }

    return "pb_" + category + "000";
  } catch (error) {
    console.error("Error fetching latest problem id: ", error);
    throw error;
  }
}

exports.getAllProblems = async () => {
  try {
    const problems = await Problem.findAll({
      where: {
        title: {
          [Op.ne]: null,
        },
      },
      order: [["category", "ASC"]],
    });
    return problems;
  } catch (error) {
    console.error("Error getting all problems:", error);
    throw error;
  }
};

exports.getProblemByCategory = async (category) => {
  try {
    const problem = await Problem.findAll({
      where: {
        category: category,
      },
    });

    return problem;
  } catch (error) {
    console.error("Error getting problem:", error);
    throw error;
  }
};

exports.getProblemStatusByAdminCode = async (adminCode) => {
  try {
    const problem = await Problem.findOne({
      where: {
        title: {
          [Op.eq]: null,
        },
        add_by: adminCode,
      },
    });

    return problem;
  } catch (error) {
    console.error("Error getting problem:", error);
    throw error;
  }
};

exports.createProblem = async (problemCode, title, category, adminCode) => {
  try {
    const problem = await Problem.create({
      id: problemCode,
      title: title,
      category: category,
      add_by: adminCode,
    });

    return problem.id;
  } catch (error) {
    console.error("Error creating problem:", error);
    throw error;
  }
};

exports.updateProblem = async (title, adminCode) => {
  try {
    const result = await Problem.update(
      {
        title: title,
      },
      {
        where: {
          title: {
            [Op.eq]: null,
          },
          add_by: adminCode,
        },
      }
    );

    return result;
  } catch (error) {
    console.error("Error updating problem:", error);
    throw error;
  }
};

exports.destroyProblemUncompleted = async (adminCode) => {
  try {
    const cancelProblem = await Problem.destroy({
      where: {
        title: {
          [Op.eq]: null,
        },
        add_by: adminCode,
      },
    });

    return cancelProblem;
  } catch (error) {
    console.error("Error cancel add problem:", error);
    throw error;
  }
};

exports.generateProblemCode = async (category) => {
  const latestProblemCode = await getLatestProblemCode(category);

  const numericPart = parseInt(latestProblemCode.slice(5), 7) + 1;

  category = convertCategoryToString(category);

  const newProblemCode = `pb_${category}${numericPart
    .toString()
    .padStart(3, "0")}`;

  return newProblemCode;
};
