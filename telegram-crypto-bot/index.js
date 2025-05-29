require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;
const API_Key = process.env.COINGECKO_API_KEY;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  console.log(match);
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;
  console.log("The match", match);
  console.log("The msg", msg);
  bot.sendMessage(
    chatId,
    "👋 Welcome! Send /price BTC to get the current Bitcoin price."
  );
});

bot.onText(/\/price/, (msg, match) => {
  const chatId = msg.chat.id;
  console.log("The match", match);
  console.log("The msg", msg);
  bot.sendMessage(
    chatId,
    "Which crypto would you like to know the current price of?"
  );
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
      "The console.log ",
      `${details.name} (${details.symbol.toUpperCase()}): $${
        details.market_data.current_price.usd
      }`
    );
    return `${details.name} (${details.symbol.toUpperCase()}): $${
      details.market_data.current_price.usd
    }`;
  } catch (error) {
    console.log(error);
    return error;
  }
}

coinSearch("Bitcoin").then((result) => {
  console.log(result);
});
