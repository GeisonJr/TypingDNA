/*------ Libraries ------*/
const express = require("express");

/*------ Controllers ------*/
const users = require("./controllers/user");

const routes = express.Router();

routes.post("/user/register", users.store);
routes.post("/user/authenticate", users.show);
routes.delete("/user/truncate", users.truncate);

module.exports = routes;