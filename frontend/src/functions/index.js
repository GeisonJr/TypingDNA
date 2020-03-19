/*--- Constants ---*/
const ERROR_RATE = 25; // Authentication Precision(default: 13 =>> 13%)

/*--- Variables ---*/
var patternArray = {};
var lastInputText = "";
var timeDifference = 0;
var lastKeyTime = 0;
var keyId = 0;

var timeCounter = 0;

export function onKeyDown() {
	timeCounter = new Date().getTime();
}

export function onKeyUp(currentEmail) {

	if (currentEmail.length == 0) {
		timeCounter = new Date().getTime();
	}

	patternArray[keyId] = {
		time: new Date().getTime() - timeCounter,
	};

	if (currentEmail.length === 0) {
		return;
	}

	keyId = currentEmail.length < lastInputText.length ? keyId - 1 : keyId + 1;

	lastInputText = currentEmail;
}

export function checkPattern(data) {
	var pattern1 = data.pattern1;
	var pattern2 = data.pattern2;
	var email = data.email;

	var matches = 0;

	var totalCurrentTime = 0;
	var totalStoragedTime = 0;

	for (var keyId = 1; keyId < Object.values(pattern1).length; keyId++) {
		var time = patternArray[keyId].time;

		var average = (pattern1[keyId].time + pattern2[keyId].time) / 2;

		var perc1 = average + (average / 100 * ERROR_RATE);
		var perc2 = average - (average / 100 * ERROR_RATE);

		if (time < perc1 && time > perc2) {
			matches++;
		}

		totalCurrentTime += time;
		totalStoragedTime += average;
	}

	console.log("total current time: " + totalCurrentTime);
	console.log("total storaged time: " + totalStoragedTime);
	console.log("dif: " + (totalStoragedTime - totalCurrentTime));

	return matches;
}

export function validateTyping(email, matches) {
	const regex = validateRegex(email);
	var compatibility = matches / Object.values(patternArray).length * 100;

	class Info {
		constructor(auth) {
			this.authenticated = auth;
			this.matches = matches;
			this.credentials = regex;
			this.compatibility = compatibility;
		}
	}

	console.log("comp ::: " + compatibility);

	if (regex === true && compatibility >= 100 - (ERROR_RATE * 2)) {
		const send = new Info(true);
		console.log(send);
		return send;
	} else {
		const send = new Info(false);
		if (Number.isNaN(send.compatibility)) {
			send.compatibility = 0;
		}
		console.log(send);
		return send;
	}
}

export function validateRegex(pattern, email) {
	return true;
}