const {
  setConfig
} = require('./config');

const {
  tagsSeparator,
  numberFormatter,
  phoneNumberFormatter,
  specialCharsModifier,
  removeSpaces
} = require('./functions/modifies');

const {
  URLValidator,
  passwordValidation,
  validateIPAddress,
  checkNumberPositivity,
  emailDomainValidator
} = require('./functions/auth');

module.exports = {
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
  specialCharsModifier
};