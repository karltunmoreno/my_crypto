const router = require("express").Router();
const axios = require("axios");
const { User } = require("../models");
// coin JSON data
const config = {
  method: 'get',
    url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?cryptocurrency_type=all&aux=cmc_rank&limit=100',
  headers: { 
    'X-CMC_PRO_API_KEY': 'd3bcf3f1-342e-490a-86e2-484d000fc31b'
  }
}
//coinFeed.data.data
//const { coinsData } = require("../public/javascript/coinsData");
//console.log(coinsData); 

router.get("/",async (req, res) => {
  const coinFeed = await axios(config)
  console.log(coinFeed.data);
    res.render("main", { layout: "index", coin: coinFeed.data.data, loggedIn: req.session.loggedIn });
});

router.get("/login", (req, res) => {
  res.render("login", { layout: "index" });
});

router.get("/myCrypto",async (req, res) => {
  const coinFeed = await axios(config)
  res.render("myCrypto", { layout: "index", coin: coinFeed.data.data });
});

router.get("/coinConverter", (req, res) => {
  res.render("coinConverter", { layout: "index" });
});

module.exports = router;
