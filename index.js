require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const cors = require('cors');
const mapRoutes = require('express-routes-mapper');

const {
    PORT='2024',
    NODE_ENV,
    BODY_PARSER_JSON_LIMIT = "35mb",
  } = process.env;

//import modules
const routeConfig = require('./helper/routeConfig');

//express application 
const app = express();
const server = http.Server(app);

//routes
const mappedOpenRoutes = mapRoutes(routeConfig.publicRoutes, 'controllers/')

//use middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: true, limit: BODY_PARSER_JSON_LIMIT || '35mb'}));

//routing
app.use('/api', mappedOpenRoutes);

//server 
server.listen( PORT , () => {
    if (environment !== 'production' &&
      environment !== 'development' &&
      environment !== 'testing'
    ) {
      // eslint-disable-next-line no-console
      console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
      process.exit(1);
    }
    // eslint-disable-next-line no-console
    console.log(`auth server is running on ${PORT}`);
    return DB;
  });

