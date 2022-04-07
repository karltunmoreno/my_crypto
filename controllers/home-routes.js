const router = require("express").Router();

const { User } = require("../models");
// coin JSON data
const { coinsScrap } = require("../models/coinsScrap");

router.get("/", (req, res) => {
  res.render("main", { layout: "index", coins: coinsScrap, user: User });
});

router.get("/login", (req, res) => {
  res.render("login", { layout: "index", user: User });
});

router.get("/myCrypto", (req, res) => {
  res.render("myCrypto", { layout: "index", coins: coinsScrap });
});

router.get("/coinConverter", (req, res) => {
  res.render("coinConverter", { layout: "index" });
});

module.exports = router;
