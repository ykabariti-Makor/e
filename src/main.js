const { setConfig } = require('./config');
const { tagsSeparator, numFormatter, phoneNumberFormatter, specialCharsModifier, removeSpaces } = require('./functions/modifies');
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
