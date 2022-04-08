const router = require("express").Router();
const { User, Coins, Crypto } = require("../../models");
//The `/api/users` endpoint
// get all users
/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: request All Users
 *      description: request all Users
 *      responses:
 *          '200':
 *              description: succesfull
 */
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *      summary: request Users by ID
 *      description: request Users by ID
 *      parameters:
 *          - in: path
 *            name: id
 *      responses:
 *          '200':
 *              description: single User
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
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
/**
 * @swagger
 * paths:
 *  /api/users/:
 *    post:
 *     summary: Creates a new user.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - email
 *             - password
 *           properties:
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
/**
 * @swagger
 * paths:
 *  /api/users/login:
 *    post:
 *     summary: tests user login.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: logged in
 */
router.post("/login", (req, res) => {
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  User.findOne({
    where: {
      _email: req.body.email,
      get email() {
        return this._email;
      },
      set email(value) {
        this._email = value;
      },
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(function () {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json({ user: dbUserData, message: "You are now logged in!" });
      });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
/**
*@swagger
* /api/users/{id}:
*   put:
*      summary: change user
*      consumes:
*       - application/json
*      parameters:
*       - in: path
*         name: id
*         content:
*          application/json:
*          schema:
*            type: object
*          properties:
*            id:
*              type: interger
*            name:
*              type: string
*       - in: body
*         name: user
*         description: write only the filed you want to modify of the user with id:.
*         schema:
*          type: object
*          properties:
*            username:
*              type: string
*            email:
*              type: string
*            password:
*              type: string
*responses:
*       201:
*        description: user modified
*/
router.put("/:id", (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *      summary: Delete Users by ID
 *      description: Delete Users by ID
 *      parameters:
 *          - in: path
 *            name: id
 *      responses:
 *          '200':
 *              description: single User Deleted
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
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
