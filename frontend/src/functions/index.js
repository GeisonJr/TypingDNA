/*--- Impots ---*/
import Registers from "../../../database";

/*--- Constants ---*/
const defaultPattern1 = Registers["gustavo.javadev@gmail.com"]["pattern1"];
const defaultPattern2 = Registers["gustavo.javadev@gmail.com"]["pattern2"];
const ERROR_RATE = 13; // Authentication Precision(default: 13 =>> 13%)

/*--- Variables ---*/
var patternArray = new Array([]);
var currentInputText = "";
var timeDifference = 0;
var lastKeyTime = 0;
var matches = 0;
var keyId = 0;

setTimeout(() => {
	load(".input1", 0);
	load(".input2", 1);
}, 100);

function load(className, inputType) {
	var input = document.querySelector(className);

	input.addEventListener('input', () => {
		if (input.value.length === 1) {
			currentInputText = "";
			timeDifference = 0;
			lastKeyTime = 0;
			matches = 0;
			keyId = 0;
		}

		onType(input.value, currentInputText.length >= input.value.length, inputType); // Key, backspace, inputType
		currentInputText = input.value; // não entendi para que serve sa merda!
	});
}

function onType(key, backspace, inputType) {
	var matched = false;
	matches = 0;

	if (keyId === 0) {
		patternArray[inputType] = [];
		lastKeyTime = new Date().getTime();
	} else if (keyId > 0) {
		timeDifference = new Date().getTime() - lastKeyTime;
		lastKeyTime = new Date().getTime();
	}

	keyId = backspace ? keyId - 1 : keyId + 1;

	if (defaultPattern1[keyId] === undefined || defaultPattern2[keyId] === undefined) {
		return undefined;
	}

	var average = (defaultPattern1[keyId].time + defaultPattern2[keyId].time) / 2;
	var averageErrorRate = average / 100 * ERROR_RATE;

	if (timeDifference <= average + averageErrorRate || timeDifference <= average - averageErrorRate) {
		matched = true;
	}

	patternArray[inputType][keyId] = {
		time: timeDifference,
		key: key.substring(key.length - 1),
		hasMatch: matched
	};

	patternArray[inputType].forEach(element => {
		if (element.hasMatch) {
			matches++;
		}
	});
	return undefined;
}

export function validateTyping(email) {
	const regex = validateRegex(email);
	var compatibility = matches / patternArray[0].length * 100;

	class Info {
		constructor(auth) {
			this.authenticated = auth;
			this.matches = matches;
			this.credentials = regex;
			this.compatibility = compatibility;
		}
	}

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

export function validateRegex(email) {
	var send = "";

	Object.values(defaultPattern1).forEach(element => {
		send += element.key;
	});

	return (email === send);
}