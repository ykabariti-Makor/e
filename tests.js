const { passwordValidation } = require('./passwordValidation');
const { setConfig } = require('./config');

setConfig.characterLen = 12;
setConfig.upperCase = 4;

setConfig('password', { charLen: 12, upperCase: 0, lowerCase: 2, num: 1, symbol: '' });
console.log(passwordValidation('123456a78b90c-@'));
