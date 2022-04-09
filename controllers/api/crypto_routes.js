const router = require("express").Router();
var axios = require('axios');

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
      const config = {
        method: 'get',
          url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?sort=cmc_rank&limit=100https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?cryptocurrency_type=coins&aux=cmc_rank&limit=100',
        headers: { 
          'X-CMC_PRO_API_KEY': 'd3bcf3f1-342e-490a-86e2-484d000fc31b'
        }
      };
      const coinFeed = await axios(config)
      
        console.log(JSON.stringify(coinFeed.data));

      return res.status(200).json(
        coinFeed.data.data
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        err: err.toString(),
      });
    }
  });

  module.exports = router;