const { setConfig } = require('./config');
const { tagsSeparator, numFormatter, phoneNumberFormatter, specialCharsModifier } = require('./functions/modifies');
const { URLValidator, passwordValidation, ValidateIPaddress, checkNumberPositivity } = require('./functions/auth');

module.exports = {
	URLValidator,
	passwordValidation,
	ValidateIPaddress,
	setConfig,
	tagsSeparator,
	numFormatter,
	phoneNumberFormatter,
	checkNumberPositivity,
	specialCharsModifier,
};
