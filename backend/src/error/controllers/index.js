class controllerErr {
	constructor() {
		[
			this.ER_BAD_FIELD_ERROR = {
				status: {
					code: 500,
					message: "Internal Error Server",
					description: "ER_BAD_FIELD_ERROR"
				}
			},
			this.ER_PARSE_ERROR = {
				status: {
					code: 500,
					message: "Internal Error Server",
					description: "ER_PARSE_ERROR"
				}
			},
			this.unknown = {
				status: {
					code: 500,
					message: "Internal Error Server",
					description: "UNKNOWN"
				}
			},
			this.null = {
				status: {
					code: 200,
					message: "OK",
					description: "OK"
				}
			}
		]
	}
}

module.exports = (error) => {
	var server = new Object;

	if (error) {
		server = new controllerErr()[error.code];
	} else if (error === null) {
		server = new controllerErr()[error];
	}
	if (server === undefined) {
		server = new controllerErr()["unknown"];
	}
	return server;
}