const config = {
  // PROGRAMERS NOTICE: intital your own Object/array according to your functions in the code above
  password: {
    strengthOptions: [
      {
        value: 'Weak',

        minDiversity: 1,

        minLength: 8,
      },

      {
        value: 'Strong',

        minDiversity: 2,

        minLength: 10,
      },

      {
        value: 'Very Strong',

        minDiversity: 4,

        minLength: 12,
      },
    ],

    characterLen: 8,
    upperCase: 1,
    lowerCase: 1,
    num: 1,
    symbol: '#?!@$%^&*-',
  },
  URL: {
    domainOnly: false,
    pathIncluded: true,
  },
  phones: {
    format: '3-2-3-4',
    isInternational: true,
  },
  tags: {
    specialChars: ['.', '*', '?', '$', '^', '(', ')', '|'],
  },
  numsFormater: {
    overallDigitLimit: 100,
    decimalDigitLimit: 100,
  },
}

// PROGRAMERS NOTICE: intital your own configuration according to your functions in the code above
const setConfig = (configName, parameters) => {
  switch (configName) {
    case 'password':
      config.password = {
        characterLen: parameters.charLen === null || parameters.charLen === undefined || parameters.charLen === 0 ? undefined : parameters.charLen,
        upperCase: parameters.upperCase === null || parameters.upperCase === undefined || parameters.upperCase === 0 ? undefined : parameters.upperCase,
        lowerCase: parameters.lowerCase === null || parameters.lowerCase === undefined || parameters.lowerCase === 0 ? undefined : parameters.lowerCase,
        num: parameters.num === null || parameters.num === undefined || parameters.num === 0 ? undefined : parameters.num,
        symbol: parameters.symbol === null || parameters.symbol === undefined || parameters.symbol === '' ? undefined : parameters.symbol,
        strengthOptions: parameters.strengthOptions,
      }
      break
    case 'formatter':
      if (parameters.overallDigitLimit !== undefined) config.numsFormater.overallDigitLimit = parameters.overallDigitLimit
      if (parameters.decimalDigitLimit !== undefined) config.numsFormater.decimalDigitLimit = parameters.decimalDigitLimit
      break
    case 'url' || 'URL':
      if (parameters.domainOnly !== undefined) config.URL.domainOnly = parameters.domainOnly
      if (parameters.pathIncluded !== undefined) config.URL.pathIncluded = parameters.pathIncluded
      break
    case 'phones':
      if (parameters.format !== undefined) config.phones.format = parameters.format
      if (parameters.isInternational !== undefined) config.format.isInternational = parameters.isInternational
      break
    case 'tags':
      config.tags.specialChars = parameters.specialChars
      break
  }
}

module.exports = { config, setConfig }
