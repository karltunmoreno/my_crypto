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
/**
 * @swagger
 * /api/coins/{user_id}:
 *  get:
 *      summary: request Coins by User
 *      description: request Coins by User
 *      parameters:
 *          - in: path
 *            name: user_id
 *      responses:
 *          '200':
 *              description: single User Coins
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              user_id:
 *                                  type:interger
 *                              name:
 *                                  type: string
 */
 router.get("/:user_id", (req, res) => {
  Coins.findAll({
    where: {
      user_id: req.params.user_id,
    },
  })
    .then((dbCoinsData) => {
      if (!dbCoinsData) {
        res.status(404).json({ message: "User has no Coins stored" });
        return;
      }
      res.json(dbCoinsData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
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
      .then(dbCoinsData => res.json(dbCoinsData)) 
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

/**
*@swagger
* /api/coins/{id}:
*   put:
*      summary: change coins
*      parameters:
*       - in: path
*         name: id
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
*              type: integer
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
/**
 * @swagger
 * /api/coins/{id}:
 *  delete:
 *      summary: Delete coins by ID
 *      description: Delete coins by ID
 *      parameters:
 *          - in: path
 *            name: id
 *      responses:
 *          '200':
 *              description: coin deleted Deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type:interger
 *                              name:
 *                                  type: string
 */
 router.delete("/:id", (req, res) => {
  Coins.destroy({
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

