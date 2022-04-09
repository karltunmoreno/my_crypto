const router = require("express").Router();

const { User } = require("../models");
// coin JSON data
const { coinsData } = require("../models/coinsData");


router.get("/", (req, res) => {
  res.render("main", { layout: "index", coins: coinsData, loggedIn: req.session.loggedIn });
});

router.get("/login", (req, res) => {
  res.render("login", { layout: "index" });
});

router.get("/myCrypto", (req, res) => {
  res.render("myCrypto", { layout: "index", coins: coinsData });
});

router.get("/coinConverter", (req, res) => {
  res.render("coinConverter", { layout: "index" });
});

module.exports = router;
