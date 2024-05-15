const User = require("./model/keyword");

exports.handleMessage = async (event) => {
  let msg;
  let x = 0;

  let suggest;
  let storeSuggest = [];
  let checkSuggest = 0;

  async function getUserData() {
    return User.findAll().then((users) => {
      const data = JSON.parse(JSON.stringify(users));
      // console.log(data)
      return users;
    });
  }

  var data = await getUserData();
  // console.log(data[1].id)
  let limit = data.length;
  let msgText = event.message.text.toLowerCase().trim();

  async function CheckKey() {
    while (x < limit) {
      if (msgText.includes(data[x].word)) {
        console.log("success");
        console.log(x);
        return x;
      } else {
        console.log(x);
        x++;
      }
    }
    x = 0;
    while (x < limit) {
      if (data[x].word.includes(msgText) && msgText.length > 2) {
        console.log("found" + x);
        suggest = data[x].word;
        storeSuggest.push(suggest);
        checkSuggest += 1;
        x++;
      } else {
        console.log("not found");
        x++;
      }
    }
    console.log(storeSuggest);
    console.log(checkSuggest);
    if (checkSuggest > 0) {
      x = 1;
      console.log("almost work");
      return x;
    } else {
      x = 0;
      console.log("did not found");
      return x;
    }
  }

  var validKey = await CheckKey();
  // console.log(data)
  // console.log(validKey)
  // console.log(data[validKey].type)
  // console.log(data[validKey].ans_text1)
  // console.log(data[validKey].ans_json1)

  switch (data[validKey].type) {
    case 1:
      msg = { type: "text", text: data[validKey].ans_text1 };
      break;
    case 2:
      msg = {
        type: "image",
        originalContentUrl: process.env.BASE_URL + data[validKey].ans_img1,
        previewImageUrl: process.env.BASE_URL + data[validKey].ans_img1,
      };
      break;
    case 3:
      // obj.age = eval("(" + obj.age + ")");
      msg = {
        type: "location",
        title: data[validKey].ans_text1,
        address: data[validKey].ans_text2,
        latitude: data[validKey].ans_num1,
        longitude: data[validKey].ans_num2,
      };
      break;
    case 4:
      msg = [
        { type: "text", text: data[validKey].ans_text1 },
        {
          type: "image",
          originalContentUrl: process.env.BASE_URL + data[validKey].ans_img1,
          previewImageUrl: process.env.BASE_URL + data[validKey].ans_img1,
        },
      ];
      break;
    case 5:
      countCase = 1;
      storeImage = [];
      let imageStore;
      while (countCase <= data[validKey].ans_num1) {
        let image;
        image = `process.env.BASE_URL + data[validKey].ans_img${countCase}`;
        tranImage = eval(image);
        imageStore = {
          type: "image",
          originalContentUrl: tranImage,
          previewImageUrl: tranImage,
        };
        console.log(imageStore);
        storeImage.push(imageStore);
        countCase += 1;
      }
      msg = storeImage;
      console.log(msg);
      break;
    case 6:
      countCase = 1;
      storeWord = [];
      let wordStore;
      while (countCase <= data[validKey].ans_num1) {
        let word;
        word = `data[validKey].ans_text${countCase}`;
        console.log(word);
        tranword = eval(word);
        wordStore = {
          type: "text",
          text: tranword,
        };
        console.log(wordStore);
        storeWord.push(wordStore);
        countCase += 1;
      }
      msg = storeWord;
      console.log(msg);
      break;
    case 7:
      countCase = 1;
      storeMsg = [];
      let wordStore1;
      while (countCase <= data[validKey].ans_num1) {
        let word;
        word = `data[validKey].ans_text${countCase}`;
        console.log(word);
        tranword = eval(word);
        wordStore1 = {
          type: "text",
          text: tranword,
        };
        storeMsg.push(wordStore1);
        countCase += 1;
      }
      countCase1 = 1;
      let imageStore1;
      while (countCase1 <= data[validKey].ans_num2) {
        let image;
        image = `process.env.BASE_URL + data[validKey].ans_img${countCase1}`;
        console.log(image);
        tranImage = eval(image);
        imageStore1 = {
          type: "image",
          originalContentUrl: tranImage,
          previewImageUrl: tranImage,
        };
        storeMsg.push(imageStore1);
        countCase1 += 1;
      }
      msg = storeMsg;
      console.log(msg);
      break;
    case 10:
      const obj = JSON.parse(data[validKey].ans_json1);
      console.log(obj);
      y = 0;
      bubbles = [];
      let bubble;
      while (y < obj.length) {
        bubble = {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "box",
                    layout: "vertical",
                    contents: [
                      {
                        type: "text",
                        contents: [],
                        size: "xl",
                        wrap: true,
                        text: obj[y].word,
                        color: "#FFFFFF",
                        weight: "bold",
                      },
                      {
                        type: "text",
                        text: data[validKey].ans_text1,
                        color: "#FFFFFF",
                        size: "sm",
                      },
                    ],
                    spacing: "sm",
                  },
                ],
              },
            ],
            paddingAll: "20px",
            backgroundColor: "#394886",
          },
          footer: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "button",
                action: {
                  type: "message",
                  label: "ดูเพิ่มเติม",
                  text: obj[y].answer,
                },
                color: "#FFFFFF",
                style: "secondary",
              },
            ],
            backgroundColor: "#394886",
          },
        };
        bubbles.push(bubble);
        console.log(bubbles);
        y += 1;
      }

      msg = {
        type: "flex",
        altText: "Info",
        contents: {
          type: "carousel",
          contents: bubbles,
        },
      };
      break;
    case 11:
      storeCaseSuggest = [];
      let caseSuggest = "";
      let countCaseSuggest = 0;
      suggestBubbles = [];
      let suggestBubble;
      while (countCaseSuggest < storeSuggest.length) {
        console.log(countCaseSuggest);
        suggestBubble = {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "box",
                    layout: "vertical",
                    contents: [
                      {
                        type: "text",
                        contents: [],
                        size: "xl",
                        wrap: true,
                        text: storeSuggest[countCaseSuggest],
                        color: "#FFFFFF",
                        weight: "bold",
                      },
                      {
                        type: "text",
                        text: " ",
                        color: "#FFFFFF",
                        size: "sm",
                      },
                    ],
                    spacing: "sm",
                  },
                ],
              },
            ],
            paddingAll: "20px",
            backgroundColor: "#394886",
          },
          footer: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "button",
                action: {
                  type: "message",
                  label: "ดูเพิ่มเติม",
                  text: storeSuggest[countCaseSuggest],
                },
                color: "#FFFFFF",
                style: "secondary",
              },
            ],
            backgroundColor: "#394886",
          },
        };
        suggestBubbles.push(suggestBubble);
        console.log(suggestBubble);
        // caseSuggest += `\n${countCaseSuggest+1}.${storeSuggest[countCaseSuggest]}`
        countCaseSuggest += 1;
      }
      msg = [
        {
          type: "text",
          text: `หรือว่าคุณหมายถึง`,
        },
        {
          type: "flex",
          altText: "Info",
          contents: {
            type: "carousel",
            contents: suggestBubbles,
          },
        },
      ];
      break;
    case 20:
      // FLEX image and text
      msg = {
        type: "flex",
        altText: "Cosci Information",
        contents: {
          type: "bubble",
          hero: {
            type: "image",
            url: process.env.BASE_URL + data[validKey].ans_img1,
            size: "full",
            aspectMode: "fit",
            action: {
              type: "uri",
              uri: process.env.BASE_URL + data[validKey].ans_img1,
            },
          },
          body: {
            type: "box",
            layout: "vertical",
            spacing: "md",
            contents: [
              {
                type: "text",
                text: data[validKey].ans_text1,
                size: "md",
                weight: "regular",
                wrap: true,
              },
            ],
          },
        },
      };
      break;
    // default :
    //     msg = sendText(event);
    //     break;
  }

  return msg;
};
