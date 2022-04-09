<<<<<<< HEAD
// const fetch = require('node-fetch');

// async function getApiData() {
//   const request = await fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest")
//   const data = await request.json();
//   console.log(data)
//   return data;
// }
// const coinsData = getApiData();


// exports.coinsData = coinsData;
=======
//const fetch = require('node-fetch');
const axios = require('axios');
//const url = localhost;
const PORT = process.env.PORT || 3001;


async function getApiData() {
    
    const request = await axios("http://localhost:" + PORT + "/api/crypto")
    const data = await request.data;
    console.log(data)
    return data

    console.log(data)
     
}
const coinsData = getApiData;
>>>>>>> f23f24ebf5e7513047f0afa30b4ddc22161c0f81


