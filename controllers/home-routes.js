const router = require("express").Router();

// coin JSON data
const { coinsScrap } = require("../models/coinsScrap");

router.get("/", (req, res) => {
  res.render("main", { layout: "index", coins: coinsScrap });
});

router.get("/login", (req, res) => {
  res.render("login", { layout: "index" });
});

router.get("/myCrypto", (req, res) => {
  res.render("myCrypto", { layout: "index", coins: coinsScrap });
});

router.get("/coinConverter", (req, res) => {
  res.render("coinConverter", { layout: "index" });
});

module.exports = router;
