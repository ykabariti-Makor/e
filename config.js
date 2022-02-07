const config = {
  /**
   * ! PROGRAMERS NOTICE: intital your own Object/array according to your functions in the code above
   */
  password: {
    characterLen: 8,
    upperCase: 1,
    lowerCase: 1,
    num: 1,
    symbol: "#?!@$%^&*-",
  },
  URL: {},
  phones: {},
  tags: {},
  numsFormater: {
    overallDigitLimit: 100,
    decimalDigitLimit: 100,
  },
};

const setConfig = (configName, parameters) => {
  /**
   * ! PROGRAMERS NOTICE: intital your own configuration according to your functions in the code above
   */
  switch (configName) {
    case "password":
      config.password = {
        characterLen:
          parameters.charLen === null ||
          parameters.charLen === undefined ||
          parameters.charLen === 0
            ? undefined
            : parameters.charLen,
        upperCase:
          parameters.upperCase === null ||
          parameters.upperCase === undefined ||
          parameters.upperCase === 0
            ? undefined
            : parameters.upperCase,
        lowerCase:
          parameters.lowerCase === null ||
          parameters.lowerCase === undefined ||
          parameters.lowerCase === 0
            ? undefined
            : parameters.lowerCase,
        num:
          parameters.num === null ||
          parameters.num === undefined ||
          parameters.num === 0
            ? undefined
            : parameters.num,
        symbol:
          parameters.symbol === null ||
          parameters.symbol === undefined ||
          parameters.symbol === ""
            ? undefined
            : parameters.symbol,
      };
      break;

    case "formatter":
      config.numsFormater.overallDigitLimit = parameters.overallDigitLimit;
      config.numsFormater.decimalDigitLimit = parameters.decimalDigitLimit;
      break;
  }
};

module.exports = { config, setConfig };
