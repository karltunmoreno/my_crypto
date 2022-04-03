const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const coinsRoutes = require('./coin-routes.js');

router.use('/users', userRoutes);
//router.use('/coins', coinsRoutes);

module.exports = router;