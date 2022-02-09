const { setConfig } = require('./config');
const { tagsSeparator, numberFormatter, phoneNumberFormatter, specialCharsModifier } = require('./functions/modifies');
const { URLValidator, passwordValidation, ValidateIPaddress, checkNumberPositivity } = require('./functions/auth');

module.exports = {
	URLValidator,
	passwordValidation,
	ValidateIPaddress,
	setConfig,
	tagsSeparator,
	numberFormatter,
	phoneNumberFormatter,
	checkNumberPositivity,
	specialCharsModifier,
};
