const { passwordStrength } = require('./passwordStrength');
const { config } = require('./config');

const passwordValidation = (password) => {
  let validation = [
    config.password.characterLen !== undefined && config.password.characterLen !== 0
      ? {
          title: 'Char',
          valid: false,
          re: new RegExp('^.{' + config.password.characterLen + ',}$'),
        }
      : null,
    config.password.upperCase !== undefined && config.password.upperCase !== 0
      ? {
          title: 'UpperCase',
          valid: false,
          re: new RegExp('^(.*?[A-Z]){' + config.password.upperCase + ',}'),
        }
      : null,
    config.password.lowerCase != undefined && config.password.lowerCase != 0
      ? {
          title: 'LowerCase',
          valid: false,
          re: new RegExp('^(.*?[a-z]){' + config.password.lowerCase + ',}'),
        }
      : null,
    config.password.num != undefined && config.password.num != 0
      ? {
          title: 'Number',
          valid: false,
          re: new RegExp('^(.*?[0-9]){' + config.password.num + ',}'),
        }
      : null,
    config.password.symbol !== undefined && config.password.symbol !== ''
      ? {
          title: 'NonAlphaNumeric',
          valid: false,
          re: new RegExp('^(.*?[' + config.password.symbol + ',])'),
        }
      : null,
  ];

  validation = validation.filter((validator) => validator !== null && validator !== undefined);
  let actualValidation = validation.map((validator) => {
    return { ...validator, valid: Boolean(validator.re.test(password)) };
  });
  validation = actualValidation;
  return { validation, strength: passwordStrength(password) };
};
module.exports = { passwordValidation };
