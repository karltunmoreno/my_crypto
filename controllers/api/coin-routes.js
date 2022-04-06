const router = require('express').Router();
const {User, Coins} = require("../../models");
//The `/api/coins` endpoint
 // find all coins
/**
 * @swagger
 * /api/coins:
 *  get:
 *      summary: request All Coins
 *      description: request all coins
 *      responses:
 *          '200':
 *              description: succesfull
 */
 router.get('/', (req, res) => {
   console.log(Coins,"ln16");
      Coins.findAll({
    })
    .then(dbCoinsData => {
        if (!dbCoinsData) {
            res.status(404).json({ message: 'No coins found' });
            return;}
        res.json(dbCoinsData);
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
  console.log(Coins,"ln67");
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
      .then(dbCoinsData => res.json(dbCoinsData)) 
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

/**
*@swagger
* /api/coins/{coinid}}:
*   put:
*      summary: change coins
*      consumes:
*       - application/json
*      parameters:
*       - in: path
*         name: coinid
*         type: integer
*         required: true
*       - in: body
*         name: user
*         description: change a coin for a user.
*         schema:
*          type: object
*          properties:
*            coin name:
*              type: string
*            amount:
*              type: string
*         
*responses:
*       201:
*        description: coin modified
*/
router.put("/:id", (req, res) => {

  // pass in req.body instead to only update what's passed through
  Coins.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbCoinsData) => {
      if (!dbCoinsData) {
        res.status(404).json({ message: "No coin found with this id" });
        return;
      }
      res.json(dbCoinsData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;  

