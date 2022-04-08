const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");


async function coinData() {
  try {
    const coinUrl = "https://coinmarketcap.com/";

    const coinGet = await axios({
      method: "GET",
      url: coinUrl,
    });
    // test for html string using node index.js in the terminal
    // console.log(coinGet.data)

    // cheerio uses "$"
    const $ = cheerio.load(coinGet.data);

    const dataSelector =
      "#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr";

    const coinKeys = [
      "rank",
      "name",
      "price",
    ];

    const coinArray= [];

    // pass in dataselector
    $(dataSelector).each((parentIdx, parentElem) => {
      let coinLimit = 0;
      const coinObject = {};

      if (parentIdx <= 9) {
        $(parentElem)
          .children()
          .each((textIdx = 0, textElem) => {
            
            let textValue = $(textElem).text();

            if (coinLimit === 1 || coinLimit === 1) {
              textValue = $("p:first-child", $(textElem).html()).text();
            }

            if (textValue) {
              coinObject[coinKeys[coinLimit]] = textValue;
              coinLimit++;
              
            }
            textIdx ++;
          });
        coinArray.push(coinObject);
        //console.log("--------------", coinLimit, "-------------------------");
        //console.log(coinObject);
        console.log(`----------`);
        console.log(coinArray[coinLimit]);
      }
    });
    return coinArray;
  } catch (error) {}
};
const app = express();
app.get('/api/coin-feed', async (req, res) => {
  try {
    const coinFeed = await coinData();

    return res.status(200).json({
      coinFeed,
    });
  } catch (err) {
    return res.status(500).json({
      err: err.toString(),
    });
  }
});

app.listen(3000, () => {
  console.log("UP and Running on port 3000");
});

module.exports = coinData;