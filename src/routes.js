/*--- React ---*/
import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";

/*--- Routes ---*/
import Login from "./pages/login";

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="*" component={Login} />
			</Switch>
		</BrowserRouter>
	);
}