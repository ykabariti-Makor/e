const { setConfig } = require('./config')
const { tagsSeparator } = require('./utils/modifies')
const { URLValidator, isURLValid, passwordValidation } = require('./utils/auth')

module.exports = { URLValidator, isURLValid, passwordValidation, tagsSeparator, setConfig }
