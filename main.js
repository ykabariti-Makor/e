const { setConfig } = require('./config')
const { tagsSeparator, numFormatter } = require('./utils/modifies')
const { URLValidator, passwordValidation } = require('./utils/auth')

module.exports = { URLValidator, passwordValidation, setConfig, tagsSeparator, numFormatter }
