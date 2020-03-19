class databaseErr {
	constructor() {
		this.ER_ACCESS_DENIED_ERROR = {
			status: {
				code: 401,
				message: "Unauthorized",
				description: "ER_ACCESS_DENIED_ERROR: Invalid Credentials (Password and/or Username)"
			}
		};
		this.ER_BAD_DB_ERROR = {
			status: {
				code: 404,
				message: "Not Found",
				description: "ER_BAD_DB_ERROR: Invalid Database Name"
			}
		};
		this.ECONNREFUSED = {
			status: {
				code: 404,
				message: "Not Found",
				description: "ECONNREFUSED: Invalid Port Number"
			}
		};
		this.ENOTFOUND = {
			status: {
				code: 404,
				message: "Not Found",
				description: "ENOTFOUND: Invalid IP Address or Caracter"
			}
		};
		this.ENOENT = {
			status: {
				code: 400,
				message: "Bad Request",
				description: "ENOENT: Invalid Port Caracter"
			}
		};
		this.unknown = {
			status: {
				code: 500,
				message: "Internal Error Server",
				description: "UNKNOWN"
			}
		};
		this.null = {
			status: {
				code: 200,
				message: "OK",
				description: "OK"
			}
		};
	}
}

module.exports = (err) => {
	var server = new Object;
	if (err) {
		server = new databaseErr()[err.code];
	} else if(err === null) {
		server = new databaseErr()[err];
	}
	if (server === undefined) {
		server = new databaseErr()["unknown"];
	}
	return server;
}