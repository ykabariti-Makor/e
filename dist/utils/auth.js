"use strict";

const {
  config
} = require('../config'); // Check URL validity


const isURLValid = url => {
  // Checks for URL validity
  const pattern = new RegExp('^(https?:\\/\\/)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + '(\\?[;&a-z\\d%_.~+=-]*)?' + '(\\#[-a-z\\d_]*)?$', 'i');

  if (!pattern.test(url)) {
    return {
      success: false,
      message: 'URL is invalid'
    };
  }

  return {
    success: true,
    message: 'URL is valid',
    data: pattern.test(url)
  };
}; // Check password strength


const passwordStrength = password => {
  const options = config.password.strengthOptions;
  const allowedSymbols = config.password.symbol;
  const passwordCopy = password || '';
  const isValid = {
    success: true,
    message: []
  };
  const objTypeof = {
    value: 'string',
    minDiversity: 'number',
    minLength: 'number'
  };
  options.map(opt => {
    Object.entries(opt).map(([key, value]) => {
      if (key !== 'id') {
        if (typeof value !== objTypeof[key]) {
          isValid.success = false;
          isValid.message.push(`${key} must be type of ${objTypeof[key]}`);
        }
      }
    });
  });

  if (isValid.success) {
    options[0].minDiversity = 0, options[0].minLength = 0;
    const rules = [{
      regex: '[a-z]',
      message: 'lowercase'
    }, {
      regex: '[A-Z]',
      message: 'uppercase'
    }, {
      regex: '[0-9]',
      message: 'number'
    }];

    if (allowedSymbols) {
      rules.push({
        regex: `[${allowedSymbols.replace(/[-.*+?^${}()|[\]\\]/g, '\\$&')}]`,
        message: 'symbol'
      });
    }

    const strength = {};
    strength.contains = rules.filter(rule => new RegExp(`${rule.regex}`).test(passwordCopy)).map(rule => rule.message);
    strength.length = passwordCopy.length;
    const fulfilledOptions = options.filter(option => strength.contains.length >= option.minDiversity).filter(option => strength.length >= option.minLength).sort((o1, o2) => o2.id - o1.id).map(option => ({
      id: option.id,
      value: option.value
    }));
    Object.assign(strength, fulfilledOptions[0]);
    return strength.value;
  } else {
    return isValid;
  }
};

module.exports = {
  isURLValid,
  passwordStrength
};