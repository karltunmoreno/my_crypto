const axios = require('axios');

async function getApiData() {
    const config = {
        method: 'get',
        url: '/api/crypto',
        }
    const data = await axios(config)

    console.log(JSON.stringify(data.data));

    return res.status(200).json(
        console.log(data)
    );
    return data.data;
}
const coinsData = getApiData();


exports.coinsData = coinsData;
