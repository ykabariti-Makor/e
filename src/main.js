const { setConfig } = require('./config');
const { tagsSeparator, numberFormatter, phoneNumberFormatter, specialCharsModifier, removeSpaces } = require('./functions/modifies');
const { URLValidator, passwordValidation, ValidateIPaddress, checkNumberPositivity } = require('./functions/auth');

module.exports = {
	setConfig,
	URLValidator,
	passwordValidation,
	ValidateIPaddress,
	tagsSeparator,
	numberFormatter,
	phoneNumberFormatter,
	checkNumberPositivity,
	removeSpaces,
	specialCharsModifier,
};
