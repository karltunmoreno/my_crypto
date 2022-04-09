import fetch from 'node-fetch';

async function getApiData() {
    const config = {
        method: 'get',
        url: '/api/crypto',
        }
    const data = await rawait axios(config)

    console.log(JSON.stringify(data.data));

    return res.status(200).json(
        console.log(data)
    );
    return data.data;
}
const coinsData = getApiData();


exports.coinsData = coinsData;
