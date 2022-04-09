const fetch = require('node-fetch');

//const url = localhost;
const PORT = process.env.PORT || 3001;


async function getApiData() {

    const request = await fetch("http://localhost/"+PORT+"/api/crypto")
    const data = await request.json();

    return res.status(200).json(
        console.log(data)
    );
    return data;
}
const coinsData = getApiData;


exports.coinsData = coinsData;
