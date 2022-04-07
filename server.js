const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const swaggerJsDoc =require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const controllers = require('./controllers');



const app = express();
const PORT = process.env.PORT || 3001;

//Extends: https://swagger.io/specification/#InfoObject
const swaggerOptions ={
  swaggerDefinition: {
    info: {
      title: 'My Crypto API',
      description: "My Crypto Portfolio API testing",
      contact: {
        name: "aaguirre7"
      },
      servers:["http://localhost:'${PORT}'"]
    }
  },
  apis: ["./controllers/index.js","./controllers/api/*.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(controllers);

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const helpers = require("./utils/helpers");

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./controllers/"));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
