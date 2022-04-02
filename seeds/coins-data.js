const sequelize = require('../config/connection');
const { User } = require('../models');
const { Coins, Post } = require('./../models');
//const query = require(sequelize);
const coinArray = require ("./../index");
async function updateCoins (){
//console.log("waiting for data ..",await coinArray());

//var [Data] = JSON.parse(await coinArray());
//console.log("this is DATA", Data);
var coinValue= await coinArray();
//console.log(responseJson[0]);
//console.log("this is the result of stringyfi",responseJson);
//for (x = 0 ; x < coinValue.length ; x++){
    
//};
const newCoin = Coins.bulkCreate(coinValue,{individualHooks:true});
console.log("coins updated", await newCoin);
}
module.exports = updateCoins;

/*console.log(coinValue[x].name);
    sequelize.query(
        'INSERT INTO coins '(id,rank,name,price),(
            ("id:"+x),(coinValue[x].rank),(coinValue[x].name),(coinValue[x].price)),
       function(err, result){
            if(err) throw err;
            console.log('new coins', coinValue[x]);
       }
    );*/


