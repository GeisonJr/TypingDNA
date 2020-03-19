/*------ Settings ------*/
const { title, sql } = require("./.settings");

/*------ Imports ------*/
const Methods = require("../");

module.exports = {

  store(req, res) {
    const { array, name, email, password } = req.body;

    const temp = []
    const teste = []

    const pattern_1 = JSON.stringify(array[0]);
    const pattern_2 = JSON.stringify(array[1]);

    Object.values(array[0]).map((event) => {
      temp.push(event.betweenTimeDifference);
    });

    Object.values(array[1]).map((event) => {
      teste.push(event.betweenTimeDifference);
    });
    console.log(teste);
    const sqlQuery = (
      sql.store[0] + name +
      sql.store[1] + password +
      sql.store[2] + email +
      sql.store[3] + pattern_1 +
      sql.store[4] + pattern_2 +
      sql.store[5] + JSON.stringify(temp) +
      sql.store[6] + JSON.stringify(teste) +
      sql.store[7]
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