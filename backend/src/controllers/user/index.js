/*------ Settings ------*/
const { title, sql } = require("./.settings");

/*------ Imports ------*/
const Methods = require("../");

module.exports = {

  store(req, res) {
    const { array, name, email, password } = req.body;

    const patter_1 = JSON.stringify(array[0]);
    const patter_2 = JSON.stringify(array[1]);

    const sqlQuery = (
      sql.store[0] + name +
      sql.store[1] + password +
      sql.store[2] + email +
      sql.store[3] + patter_1 +
      sql.store[4] + patter_2 +
      sql.store[5]
    );
    Methods.store(req, res, sqlQuery, title);
  },

  show(req, res) {
    const { email } = req.body;
    const sqlQuery = (
      sql.show[0] + email + sql.show[1]
    );
    Methods.show(req, res, sqlQuery, title);
  },

  truncate(req, res) {
    const sqlQuery = sql.truncate;
    Methods.truncate(req, res, sqlQuery, title);
  }
}