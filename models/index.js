// import all models
const User = require('./user');
const Coins = require('./coins');
const { post } = require('../controllers');

// create association
Coins.belongsTo(User, {
    foreignKey: 'user_id'
})


module.exports = {User, Coins };