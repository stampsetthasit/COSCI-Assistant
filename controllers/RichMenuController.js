const { readFileSync } = require("fs");
const path = require("path");

const client = require("../config/line").richMenuClient;
const { getUserId, updateUserRole } = require("./UserController");

async function createAndSetRichMenuWithImage(richMenu, imageName) {
  try {
    const richMenuId = await client.createRichMenu(richMenu);
    const richMenuAlias = `${imageName}_${richMenuId.slice(-4)}`; // be careful admin richmenu maybe need to create another function for purpose?

    // Upload rich menu image
    const imagePath = path.resolve("./") + `/public/assets/${imageName}.png`;
    const bufferImage = readFileSync(imagePath);
    await client.setRichMenuImage(richMenuId, bufferImage);

    await client.createRichMenuAlias(richMenuId, richMenuAlias);

    return { richMenuId: richMenuId, richMenuAlias: richMenuAlias };
  } catch (error) {
    console.error("Error create and set rich menu success", error);
    throw error;
  }
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 1000);
}

exports.createRichMenuAllUser = async (richMenuJSON, imageName) => {
  try {
    const richMenu = await createAndSetRichMenuWithImage(
      richMenuJSON,
      imageName
    );

    await client.setDefaultRichMenu(richMenu.richMenuId); // set default rich menu for all users

    return richMenu;
  } catch (error) {
    console.log("Error creating rich menu: " + error);
    throw error;
  }
};

exports.createRichMenuAdmin = async (richMenuJSON, imageName, userCode) => {
  try {
    const userId = await getUserId(userCode);

    if (userId) {
      const richMenu = await createAndSetRichMenuWithImage(
        richMenuJSON,
        imageName
      );

      await client.linkRichMenuToUser(userId, richMenu.richMenuId);

      const userRole = await updateUserRole(userCode, "admin");

      richMenu["userCode"] = userCode;
      richMenu["role"] = userRole;

      return richMenu;
    } else {
      return `User ID not found for userCode: ${userCode};`;
    }
  } catch (error) {
    console.error("Error creating rich menu: " + error);
    throw error;
  }
};

exports.createSwitchRichMenuAdmin = async (
  richMenuJSONs,
  imageNames,
  userCode
) => {
  try {
    const richMenuDetails = [];
    const id = generateRandomNumber();

    const userId = await getUserId(userCode);

    if (userId) {
      for (let i = 0; i < richMenuJSONs.length; i++) {
        const richMenu = richMenuJSONs[i];
        const richMenuAlias = `${userCode}-switch-v2-${id}${i}`; // Ensure it's unique

        richMenu.areas[richMenu.areas.length - 1].action.richMenuAliasId =
          richMenuAlias;

        const richMenuId = await client.createRichMenu(richMenu);
        richMenuDetails.push({
          richMenuAliasId: richMenuAlias,
          richMenuId: richMenuId,
        });

        // Upload rich menu image
        const imagePath = path.resolve("./" + `/public/assets/${imageNames[i]}.png`);
        const bufferImage = readFileSync(imagePath);
        await client.setRichMenuImage(richMenuId, bufferImage);

        // Create Rich Menu Alias
        const newRichMenuAlias =
          i === 0
            ? `${userCode}-switch-v2-${id}${i + 1}`
            : `${userCode}-switch-v2-${id}${i - 1}`;
        await client.createRichMenuAlias(richMenuId, newRichMenuAlias);
      }

      const userRole = await updateUserRole(userCode, "admin");

      // Link Rich Menus to User
      await client.linkRichMenuToUser(userId, richMenuDetails[0].richMenuId);
      return {
        user_code: userCode,
        user_role: userRole,
        richMenuDetails: richMenuDetails,
      };
    } else {
      return `User ID not found for userCode: ${userCode};`;
    }
  } catch (error) {
    console.error("Error creating switch rich menu: ", error);
    throw error;
  }
};

exports.unlinkRichMenuAdmin = async (userCode) => {
  try {
    const userId = await getUserId(userCode);

    if (userId) {
      const userRole = await updateUserRole(userCode, "user");
      await client.unlinkRichMenuFromUser(userId);

      return { user_code: userCode, role: userRole };
    } else {
      return `User ID not found for userCode: ${userCode};`;
    }
  } catch (error) {
    console.error("Error creating rich menu: " + error);
    throw error;
  }
};

exports.deleteRichMenu = async (imageName) => {
  try {
    await client.deleteRichMenuAlias(imageName);

    return `Delete rich menu ${imageName} success`;
  } catch (error) {
    console.error("Error deleting rich menu: " + error.message);
    throw error;
  }
};
