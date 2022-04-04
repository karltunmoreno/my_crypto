const router = require('express').Router();
const  Coins = require("../../models");

/**
 * @swagger
 * /api/coin:
 *  get:
 *      summary: request All Coins
 *      description: request all coins
 *      responses:
 *          '200':
 *              description: succesfull
 */
 router.get('/', (req, res) => {
    // find all coins
      Coins.findAll({
        include: {
            model: Coins,
            attributes: ['id', 'coin_name', 'amount', 'user_id']
        }
    })
    .then(dbCoinData => {
        if (!dbCoinData) {
            res.status(404).json({ message: 'No coins found' });
            return;
        }
        res.json(dbCoinData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
  });

  // create new coin
/**
 * @swagger
 * paths:
 *  /api/coins/:
 *    post:
 *     summary: Creates a new coin.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: coin
 *         description: The coin to add to user portfolio.
 *         schema:
 *           type: object
 *           required:
 *             - Coin Name
 *             - Amount
 *             - User ID
 *           properties:
 *             coin_name:
 *               type: string
 *             amount:
 *               type: integer
 *             user_id:
 *               type: integer
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.post('/', (req, res) => {
    /* req.body should look like this...
      {
        coin_name: "BTC",
        amount: 1,
        user_id: 1
      }
    */
    Coins.create({
      coin_name: req.body.coin_name,
      amount: req.body.amount,
      user_id: req.body.user_id,    
    })
      .then(dbCoinData => res.json(dbCoinData)) 
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;  

