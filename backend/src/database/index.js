/*------ Settings ------*/
const databaseErr = require("../error/database");

/*------ Imports ------*/
const mysql = require("mysql");
const {
	CREDENTIALS_PASSWORD,
	CREDENTIALS_USERNAME,
	CREDENTIALS_DATABASE,
	CREDENTIALS_LIMIT,
	CREDENTIALS_HOST,
	CREDENTIALS_PORT
} = process.env;

/*------ Constants ------*/
const pool = mysql.createPool({
	connectionLimit: CREDENTIALS_LIMIT,
	database: CREDENTIALS_DATABASE,
	password: CREDENTIALS_PASSWORD,
	user: CREDENTIALS_USERNAME,
	host: CREDENTIALS_HOST,
	port: CREDENTIALS_PORT,
});

/*--------- About Response --------- */
class databaseAbout {
	constructor(socket, connection) {
		this.OK = {
			threadId: connection.threadId,
			remoteAddress: socket.remoteAddress.substr(7),
			time: Date()
		};
		this.Bad_Request = {
			remoteAddress: socket.remoteAddress.substr(7),
			time: Date()
		};
		this.Unauthorized = {
			remoteAddress: socket.remoteAddress.substr(7),
			time: Date()
		};
		this.Not_Found = {
			remoteAddress: socket.remoteAddress.substr(7),
			time: Date()
		};
		this.Internal_Error_Server = {
			remoteAddress: socket.remoteAddress.substr(7),
			time: Date()
		};
	}
}

/*--------- Credentials Response --------- */
class databaseCredentials {
	constructor() {
		this.OK = {
			host: "***",
			port: "***",
			adtabase: "***",
			username: "***",
			password: "***",
			connectionLimit: "***"
		};
		this.Bad_Request = {
			host: "***",
			port: "***",
			adtabase: "***",
			username: "***",
			password: "***",
			connectionLimit: "***"
		};
		this.Unauthorized = {
			host: "***",
			port: "***",
			adtabase: "***",
			username: CREDENTIALS_USERNAME,
			password: CREDENTIALS_PASSWORD,
			connectionLimit: "***"
		};
		this.Not_found = {
			host: CREDENTIALS_HOST,
			port: CREDENTIALS_PORT,
			adtabase: CREDENTIALS_DATABASE,
			username: "***",
			password: "***",
			connectionLimit: "***"
		};
		this.Internal_Error_Server = {
			host: CREDENTIALS_HOST,
			port: CREDENTIALS_PORT,
			adtabase: CREDENTIALS_DATABASE,
			username: CREDENTIALS_USERNAME,
			password: CREDENTIALS_PASSWORD,
			connectionLimit: CREDENTIALS_LIMIT
		};
	}
}

module.exports = {

	pool,

	connectionFilter(req, error, connection) {
		const err = databaseErr(error);
		err.about = new databaseAbout(req.socket, connection)[err.status.message];
		err.credentials = new databaseCredentials()[err.status.message];
		return err;
	}
}