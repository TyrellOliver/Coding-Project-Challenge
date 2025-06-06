require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;
const API_Key = process.env.COINGECKO_API_KEY;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  // console.log(match);
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;
  // console.log("The match", match);
  // console.log("The msg", msg);
  bot.sendMessage(
    chatId,
    "👋 Welcome! Send /price BTC to get the current Bitcoin price."
  );
});

bot.onText(/\/price/, (msg, match) => {
  const chatId = msg.chat.id;
  // console.log("The msg", msg);
  bot
    .sendMessage(
      chatId,
      "What is the symbol or name of the crypto you would like to know the current price of?"
    )
    .then((sentMessage) => {
      // console.log("The sent message: ", sentMessage);
      const messageId = sentMessage.message_id;

      bot.onReplyToMessage(chatId, messageId, async (replyMsg) => {
        // console.log(replyMsg.text);
        const userInput = replyMsg.text;
        const result = await coinSearch(userInput);
        // console.log(result);
        if (result) {
          bot.sendMessage(
            chatId,
            `The current price of ${
              result.name[0]
            } (${result.symbol.toUpperCase()}) is $${
              result.market_data.current_price.usd
            }`
          );
        } else {
          bot.sendMessage(
            chatId,
            `Sorry, I couldn't fint the price for ${userInput}`
          );
        }
      });
    });
});

bot.onText(/\/sticker/, (msg, match) => {
  const chatId = msg.chat.id;
  // console.log("The match", match);
  // console.log("The msg", msg);
  const stickersArr = {
    1: "CAACAgIAAxkBAAIBlmg98yqEzDbkOhxprcGx6jssFfIXAALeDwAC-IwwSTIPp2fuYVKJNgQ",
    2: "CAACAgIAAxkBAAIBtWg99G3u-PmgnKYUw7KvGBSJ5NCjAAKjEAAC8XeoSH47GBLDl9VBNgQ",
    3: "CAACAgIAAxkBAAIBtmg99IlhNw-clsMENueYK4ynjS_YAAI_EQACQQipSKePgWazX2l2NgQ",
  };
  bot.sendSticker(chatId, stickersArr[`${Math.floor(Math.random() * 3 + 1)}`]);
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  // console.log("Received message:", msg);
  // bot.sendMessage(chatId, msg);
});

async function coinSearch(query) {
  const input = query.toLowerCase();
  try {
    const url = "https://api.coingecko.com/api/v3/coins/list";
    // const options = {
    //   method: "GET",
    //   headers: { accept: "application/json", "x-cg-demo-api-key": { API_Key } },
    // };

    const res = await fetch(url);
    const coins = await res.json();
    const match = coins.find(
      (coin) =>
        coin.id.toLowerCase() === input ||
        coin.symbol.toLowerCase() === input ||
        coin.name.toLowerCase() === input
    );

    if (!match) return `Coin "${query}" not found.`;

    const detailsRes = await fetch(
      `https://api.coingecko.com/api/v3/coins/${match.id}`
    );
    const details = await detailsRes.json();

    // console.log(Object.keys(details));
    // console.log(Object.keys(details.market_data));
    // console.log(details.market_data.current_price.usd);
    console.log(
      "Results from coingecko api:",
      `${details.name} (${details.symbol.toUpperCase()}): $${
        details.market_data.current_price.usd
      }`
    );
    return details;
  } catch (error) {
    console.log(error);
    return error;
  }
}
