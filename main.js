const { setConfig } = require('./config')
const { tagsSeparator, formatNumber } = require('./utils/modifies')
const { URLValidator, passwordValidation } = require('./utils/auth')

module.exports = { URLValidator, passwordValidation, setConfig, tagsSeparator, formatNumber }
