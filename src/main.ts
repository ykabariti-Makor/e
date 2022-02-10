import { setConfig } from './config.js';
import { tagsSeparator, numberFormatter, phoneNumberFormatter, specialCharsModifier, removeSpaces } from './functions/modifies';
import { URLValidator, passwordValidation, validateIPAddress, checkNumberPositivity, emailDomainValidator } from './functions/auth';

export {
	setConfig,
	URLValidator,
	passwordValidation,
	validateIPAddress,
	tagsSeparator,
	numberFormatter,
	phoneNumberFormatter,
	emailDomainValidator,
	checkNumberPositivity,
	removeSpaces,
	specialCharsModifier,
};
