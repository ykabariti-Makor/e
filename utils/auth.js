const { config } = require('../config')

/**
 * Get URL, and 2 optional parameters
 * @returns Modified URL
 */
const URLValidator = (url, domainOnly = config.URL.domainOnly, pathIncluded = config.URL.pathIncluded) => {
  const isValid = isURLValid(url)
  const urlObject = new URL(url)

  // Check for URL validity
  if (!isValid) return 'URL is invalid'

  if (domainOnly && pathIncluded) {
    // URL domain & path
    url = urlObject.hostname + urlObject.pathname + urlObject.search
  } else if (domainOnly) {
    // URL domain
    url = urlObject.hostname
  } else if (!domainOnly && !pathIncluded) {
    // URL without path
    url = urlObject.origin
  }

  return url
}

const isURLValid = (url) => {
  // Checks for URL validity
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator
  return !!pattern.test(url)
}

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
  ]

  validation = validation.filter((validator) => validator !== null && validator !== undefined)
  let actualValidation = validation.map((validator) => {
    return { ...validator, valid: Boolean(validator.re.test(password)) }
  })
  validation = actualValidation
  return { validation, strength: passwordStrength(password, config.password.strengthOptions, config.password.symbol) }
}

const passwordStrength = (password, options, allowedSymbols) => {
  let passwordCopy = password || ''

  ;(options[0].minDiversity = 0), (options[0].minLength = 0)

  const rules = [
    {
      regex: '[a-z]',
      message: 'lowercase',
    },
    {
      regex: '[A-Z]',
      message: 'uppercase',
    },
    {
      regex: '[0-9]',
      message: 'number',
    },
  ]

  if (allowedSymbols) {
    rules.push({
      regex: `[${escapeRegExp(allowedSymbols)}]`,
      message: 'symbol',
    })
  }

  let strength = {}

  strength.contains = rules.filter((rule) => new RegExp(`${rule.regex}`).test(passwordCopy)).map((rule) => rule.message)

  strength.length = passwordCopy.length

  let fulfilledOptions = options
    .filter((option) => strength.contains.length >= option.minDiversity)
    .filter((option) => strength.length >= option.minLength)
    .sort((o1, o2) => o2.id - o1.id)
    .map((option) => ({ id: option.id, value: option.value }))

  Object.assign(strength, fulfilledOptions[0])

  return strength.value
}

const escapeRegExp = (string) => string.replace(/[-.*+?^${}()|[\]\\]/g, '\\$&')

module.exports = {
  URLValidator,
  passwordValidation,
}
