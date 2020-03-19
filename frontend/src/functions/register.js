/*--- Variables ---*/
var lastInputText = "";
var patternArray = [];
var timeCounter = 0;
var keyId = 0;
var lastOption = 0;
var option = 0;

export function getPatternArray() {
	return patternArray;
}

export function onKeyDown() {
	timeCounter = new Date().getTime();
}

export function onKeyUp(email, confirmEmail) {

	var currentEmail = "";

	if (email === null) {
		currentEmail = confirmEmail;
		option = 1;
	} else {
		currentEmail = email;
	}

	if (patternArray[option] === undefined) {
		patternArray[option] = [];
	}

	if (lastOption !== option){

		keyId = 0;
		lastInputText = "";
	}

	if (currentEmail.length === 0) {
		timeCounter = new Date().getTime();
	}

	patternArray[option][keyId] = {
		time: new Date().getTime() - timeCounter,
	};

	if (currentEmail.length === 0) {
		return;
	}

	keyId = currentEmail.length < lastInputText.length ? keyId - 1 : keyId + 1;

	console.log(patternArray);

	lastInputText = currentEmail;
	lastOption = option;
}