const router = require("express").Router();
const axios = require('axios');
var liveCoins = [];
async function getCrypto () {
    var config = {
    method: 'get',
    url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?sort=cmc_rank&limit=100',
    headers: { 
        'X-CMC_PRO_API_KEY': 'd3bcf3f1-342e-490a-86e2-484d000fc31b'
    }
    };
    liveCoins = await CircularJSON.stringyfi(axios(config));
    liveCoins = JSON.parse(liveCoins)

    return liveCoins;
    
}
// Get crypto form extern api 
/**
 * @swagger
 * /api/crypto:
 *  get:
 *      summary: request All Coins
 *      description: request all coins
 *      responses:
 *          '200':
 *              description: succesfull
 */
router.get('/', async (req, res) => {
    try {
      const coinFeed = await getCrypto();
  
      return res.status(200).json({
        coinFeed,
      });
    } catch (err) {
      return res.status(500).json({
        err: err.toString(),
      });
    }
  });

  module.exports = router;