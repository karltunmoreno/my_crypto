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


exports.coinsData = coinsData;
