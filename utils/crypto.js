const axios = require('axios');
const liveCoins = [];
var config = {
  method: 'get',
  url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?sort=cmc_rank&limit=100',
  headers: { 
    'X-CMC_PRO_API_KEY': 'd3bcf3f1-342e-490a-86e2-484d000fc31b'
  }
};
async function getCrypto(){
  axios(config)
  .then(function (response) {
    liveCoins = response.data;
    console.log(liveCoins);
  })
  .catch(function (error) {
    console.log(error);
  });
  return liveCoins;
};

module.exports = getCrypto;
