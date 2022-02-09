const { setConfig } = require('./config');
const { tagsSeparator, numFormatter, phoneNumberFormatter } = require('./utils/modifies');
const { URLValidator, passwordValidation, ValidateIPaddress } = require('./utils/auth');

module.exports = {
	URLValidator,
	passwordValidation,
	ValidateIPaddress,
	setConfig,
	tagsSeparator,
	numFormatter,
	phoneNumberFormatter,
};
