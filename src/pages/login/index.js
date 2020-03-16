/*--- React ---*/
import React, { useState } from "react";

import { validateTyping } from "./functions";

import "./styles.css";

export default function Login() {

	/*------ Internal ------*/
	const [email, setEmail] = useState("");
	const [confirm, setConfirm] = useState("");

	function handleSubmit(event) {
		event.preventDefault();

		validateTyping(email);
	}

	return (
		<>
			<div className="limiter">
				<form
					method="POST"
					className="form"
					onSubmit={handleSubmit}
				>
					<div className="div_h2">
						<h2>DNA TYPING</h2>
					</div>

					<div className="div_input">
						<input
							type="text"
							name="email_1"
							className="input input1"
							placeholder="Digite o seu e-mail."
							value={email}
							onChange={
								event => setEmail(event.target.value)
							}
						/>
					</div>

					<div className="div_input">
						<input
							type="text"
							name="email_2"
							className="input input2"
							placeholder="Confirme o seu e-mail."
							value={confirm} onChange={
								event => setConfirm(event.target.value)
							}
						/>
					</div>

					<div className="div_button">
						<button className="button">Try Authenticate</button>
					</div>

				</form>
			</div>
		</>
	);
}