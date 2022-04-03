// import all models
const User = require('./user');
const Coins = require('./coins');


// create association
Coins.belongsTo(User, {
    foreignKey: 'user_id'
})


module.exports = {User, Coins };