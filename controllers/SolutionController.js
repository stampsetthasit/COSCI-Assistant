const { Op } = require("sequelize");
const { convertCategoryToString } = require("../utils/helpers");

const Solution = require("../models/solution_schema");

async function getLatestSolutionCode(category) {
  try {
    const latestSolution = await Solution.findOne({
      order: [["id", "DESC"]],
      attributes: ["id"],
      limit: 1,
      where: {
        category: category,
      },
    });

    category = convertCategoryToString(category);

    if (latestSolution) {
      return latestSolution.id;
    }

    return "so_" + category + "000";
  } catch (error) {
    console.error("Error fetching latest solution id: ", error);
    throw error;
  }
}

exports.generateSolutionCode = async (category) => {
  const latestSolutionCode = await getLatestSolutionCode(category);

  const numericPart = parseInt(latestSolutionCode.slice(5), 7) + 1;

  category = convertCategoryToString(category);

  const newSolutionCode = `so_${category}${numericPart
    .toString()
    .padStart(3, "0")}`;

  return newSolutionCode;
};

exports.getAllSolutions = async () => {
  try {
    const solutions = await Solution.findAll({
      where: {
        title: {
          [Op.ne]: null, // != null
        },
      },
      order: [["category", "ASC"]],
    });
    return solutions;
  } catch (error) {
    console.error("Error getting all solutions:", error);
    throw error;
  }
};

exports.getSolution = async (title) => {
  try {
    const solution = await Solution.findOne({
      where: {
        title: title,
        related_problem: {
          [Op.ne]: null,
        },
      },
    });
    return solution;
  } catch (error) {
    console.error("Error getting solution:", error);
    throw error;
  }
};

exports.createSolution = async (solutionCode, title, category, adminCode) => {
  try {
    const solution = await Solution.create({
      id: solutionCode,
      title: title,
      category: category,
      add_by: adminCode,
    });

    return solution.id;
  } catch (error) {
    console.error("Error creating solution:", error);
    throw error;
  }
};

exports.updateSolution = async (
  title,
  relatedProblem,
  description,
  image,
  adminCode
) => {
  try {
    const result = await Solution.update(
      {
        title: title,
        related_problem: relatedProblem,
        description: description,
        image: image,
      },
      {
        where: {
          title: {
            [Op.eq]: null,
          },
          related_problem: {
            [Op.eq]: null,
          },
          description: {
            [Op.eq]: null,
          },
          image: {
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

exports.getSolutionTitleByAdminCode = async (adminCode) => {
  try {
    const solution = await Solution.findOne({
      where: {
        title: {
          [Op.eq]: null,
        },
        add_by: adminCode,
      },
    });

    return solution;
  } catch (error) {
    console.error("Error getting solution:", error);
    throw error;
  }
};

exports.getSolutionDescByAdminCode = async (adminCode) => {
  try {
    const solution = await Solution.findOne({
      where: {
        description: {
          [Op.eq]: null,
        },
        add_by: adminCode,
      },
    });

    return solution;
  } catch (error) {
    console.error("Error getting solution:", error);
    throw error;
  }
};

exports.getSolutionImgByAdminCode = async (adminCode) => {
  try {
    const solution = await Solution.findOne({
      where: {
        image: {
          [Op.eq]: null,
        },
        add_by: adminCode,
      },
    });

    return solution;
  } catch (error) {
    console.error("Error getting solution:", error);
    throw error;
  }
};

exports.getSolutionRelatedProblemByAdminCode = async (adminCode) => {
  try {
    const solution = await Solution.findOne({
      where: {
        related_problem: {
          [Op.eq]: null,
        },
        add_by: adminCode,
      },
    });

    return solution;
  } catch (error) {
    console.error("Error getting solution:", error);
    throw error;
  }
};

exports.destroySolutionUncompleted = async (adminCode) => {
  try {
    const cancelSolution = await Solution.destroy({
      where: {
        related_problem: {
          [Op.eq]: null,
        },
        add_by: adminCode,
      },
    });

    return cancelSolution;
  } catch (error) {
    console.error("Error cancel add solution:", error);
    throw error;
  }
};
