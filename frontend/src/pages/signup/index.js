/*--- Animations ---*/
import dna from '../../assets/animations/dna.json'

import api from "../../services";

/*--- Libraries ---*/
import { getPatternArray, onKeyDown, onKeyUp } from "../../functions/register";
import React, { useState } from "react";
import Lottie from "react-lottie";

/*--- Styles ---*/
import "./styles.css";

export default function Signup() {

	/*------ Internal ------*/
	const [email, setEmail] = useState("");
	const [confirm, setConfirm] = useState("");
	const [animationState1, setAnimationState1] = useState(true);
	const [animationState2, setAnimationState2] = useState(true);

	async function handleSubmit(event) {
		event.preventDefault();

		const array = getPatternArray();
		await api.post("user/register", { array, name: "gustavo", email, password: "123" });
	}

	return (
		<>
			<div className="limiter">
				<div>
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
								onKeyDown={() => {
									onKeyDown();
								}}
								onKeyUp={() => {
									onKeyUp(email, null);
								}}
								onChange={
									(event) => {
										setEmail(event.target.value);
										setAnimationState1(false);
										setTimeout(() => {
											setAnimationState1(true)
										}, 500);
									}
								}
							/>
							<div className="lottie">
								<Lottie
									width={46}
									height={46}
									options={{
										animationData: dna,
										loop: true,
										autoplay: false
									}}
									isPaused={animationState1}
								/>
							</div>
						</div>

						<div className="div_input">
							<input
								type="text"
								name="email_2"
								className="input input2"
								placeholder="Confirme o seu e-mail."
								value={confirm}
								onKeyDown={() => {
									onKeyDown();
								}}
								onKeyUp={() => {
									onKeyUp(null, confirm);
								}}
								onChange={
									(event) => {
										setConfirm(event.target.value);
										setAnimationState2(false);
										setTimeout(() => {
											setAnimationState2(true)
										}, 500);
									}
								}
							/>
							<div className="lottie">
								<Lottie
									width={46}
									height={46}
									options={{
										animationData: dna,
										loop: true,
										autoplay: false
									}}
									isPaused={animationState2}
								/>
							</div>
						</div>

						<div className="div_button">
							<button className="button">Register</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}