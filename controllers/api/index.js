const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const coinsRoutes = require('./coin-routes.js');
const cryptoRoutes = require('./crypto_routes.js')

router.use('/users', userRoutes);
router.use('/coins', coinsRoutes);
router.use('/crypto', cryptoRoutes);

module.exports = router;