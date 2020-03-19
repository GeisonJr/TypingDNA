/*--- Animations ---*/
import loading from '../../assets/animations/loading.json'
import dna from '../../assets/animations/dna.json'

/*--- Libraries ---*/
import { validateTyping } from "../../functions";
import React, { useState } from "react";
import Lottie from "react-lottie";

/*--- Styles ---*/
import "./styles.css";

export default function Login() {

	var chupa = 0;

	/*------ Internal ------*/
	const [email, setEmail] = useState("");
	const [results, setResults] = useState(0);
	const [confirm, setConfirm] = useState("");
	const [animationState1, setAnimationState1] = useState(true);
	const [animationState2, setAnimationState2] = useState(true);
	const [animationState3, setAnimationState3] = useState(false);
	const [showResultAnimation, setShowResultAnimation] = useState(false);

	function handleSubmit(event) {
		event.preventDefault();
		setResults(validateTyping(email).compatibility);
		chupa = validateTyping(email).compatibility;
		setTimeout(() => {
			console.log(chupa);
			setAnimationState3(true);
		}, ((750 / 100) * chupa));
	}

	function getResultColor() {
		if (results === undefined) {
			return "#FF0000";
		} else if (results < 15) {
			return "#FF0000";
		} else if (results >= 15 && results < 74) {
			return "#FFAA00";
		} else if (results >= 74) {
			return "#1DDB00";
		}

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
							<button
								className="button"
								onClick={() => {
									setShowResultAnimation(true);

								}}>Try Authenticate</button>
						</div>
						{showResultAnimation === true ? <>
							<div className="lottie2">
								<Lottie
									width={200}
									height={200}
									options={{
										animationData: loading,
										loop: false,
										autoplay: true
									}}
									isPaused={animationState3}
									speed={20}
								/>
								<div>
									<h3 style={{ color: getResultColor() }}>
										{Number.parseFloat(results).toFixed(2) + "%"}
									</h3>
								</div>
							</div>
						</>
							: undefined}
					</form>
				</div>
			</div>
		</>
	);
}