/*------ Imports ------*/
const controllerFilter = require("../error/controllers");
const { pool, connectionFilter } = require("../database");

/*------ Settings ------*/
const { status } = require("./.settings");

/*--- Status ---*/
const { code, message, description } = status;

/*--------- Success Messages --------- */
function success(title) {
  return send = new successMethods(title, description)
}
class successMethods {
  constructor(title, description) {
    this.list = description.list.success[0] + title + description.list.success[1];
    this.show = description.show.success[0] + title + description.show.success[1];
    this.index = description.index.success[0] + title + description.index.success[1];
    this.store = description.store.success[0] + title + description.store.success[1];
    this.update = description.update.success[0] + title + description.update.success[1];
    this.truncate = description.truncate.success[0] + title + description.truncate.success[1];
    this.validate = description.validate.success[0] + title + description.validate.success[1];
    this.authenticate = description.authenticate.success[0] + title + description.authenticate.success[1];
  }
}

/*--------- Server Response --------- */
function serverResponse(description) {
  return send = new serverMethods(description);
}
class serverMethods {
  constructor(description) {
    this.status(description);
    this.about();
  }
  status(description) {
    this.status = {
      "code": code.ok,
      "message": message.ok,
      "description": description
    };
  }
  about() {
    this.about = {
      "time": Date()
    };
  }
}/*--------- List Objects --------- */
class listMethods {
  constructor(rows, position) {
    [
      this.users = {
        _id: position + 1,
        id: rows[position].id,
        name: rows[position].name,
        email: rows[position].email,
        pattern1: JSON.parse(rows[position].pattern_1),
        pattern2: JSON.parse(rows[position].pattern_2),
        pattern3: JSON.parse(rows[position].pattern_3),
        pattern4: JSON.parse(rows[position].pattern_4)
      }
    ];
  }
}

module.exports = {
  store(req, res, sqlQuery, title) {
    var server = new Object;
    pool.getConnection((err, conn) => {
      pool.query(sqlQuery, (error) => {
        const filterDatabase = connectionFilter(req, err, conn);
        if (filterDatabase.status.code === 200) {
          const filterController = controllerFilter(error);
          if (filterController.status.code === 200) {
            conn.release();
            server = serverResponse(success(title).store);
            console.log(server);
            return res.status(server.status.code).json(server);
          }
        }
      });
    });
  },

  show(req, res, sqlQuery, title) {
    var position = 0;
    var client = new Object;
    var server = new Object;
    pool.getConnection((err, conn) => {
      pool.query(sqlQuery, (error, rows) => {
        const filterDatabase = connectionFilter(req, err, conn);
        if (filterDatabase.status.code === 200) {
          const filterController = controllerFilter(error);
          if (filterController.status.code === 200) {
            try {
              client = new listMethods(rows, position)[title];
            } catch (erro) {
              console.log(erro)
            } finally {
              conn.release();
              server = serverResponse(success(title).show);
              console.log(client);
              return res.status(server.status.code).json(client);
            }
          }
        }
      });
    });
  },

  truncate(req, res, sqlQuery, title) {
    var server = new Object;
    pool.getConnection((err, conn) => {
      pool.query(sqlQuery, (error) => {
        const filterDatabase = connectionFilter(req, err, conn);
        if (filterDatabase.status.code === 200) {
          const filterController = controllerFilter(error);
          if (filterController.status.code === 200) {
            conn.release();
            server = serverResponse(success(title).truncate);
            console.log(server);
            return res.status(server.status.code).json(server);
          }
        }
      });
    });
  },
}