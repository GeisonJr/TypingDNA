/*--- React ---*/
import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";

/*--- Routes ---*/
import Login from "./pages/login";
import Signup from "./pages/signup";

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/signup" component={Signup} />
				<Route path="/login" component={Login} />
			</Switch>
		</BrowserRouter>
	);
}