"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateIPAddress = exports.passwordValidation = exports.emailDomainValidator = exports.checkNumberPositivity = exports.URLValidator = void 0;

var _config = require("../config.js");

var _auth = require("../utils/auth.js");

/**
 * URL validator for url validation & formatting
 * @param {url} string url
 * @param {domainOnly} boolean indicator for url domain format, false by default
 * @param {pathIncluded} boolean indicator for url path format, true by default
 * @returns object
 */
const URLValidator = url => {
  const domainOnly = _config.config.URLValidator.domainOnly;
  const pathIncluded = _config.config.URLValidator.pathIncluded;
  let urlObject; // Check for URL validity

  const isValid = (0, _auth.isURLValid)(url);

  if (!isValid.success) {
    return {
      success: false,
      message: 'URL is invalid'
    };
  }

  try {
    urlObject = new URL(url);
  } catch (error) {
    return {
      success: false,
      message: 'URL is invalid'
    };
  }

  if (domainOnly && pathIncluded) {
    // URL domain & path
    url = urlObject.hostname + urlObject.pathname + urlObject.search;
  } else if (domainOnly) {
    // URL domain
    url = urlObject.hostname;
  } else if (!domainOnly && !pathIncluded) {
    // URL without path
    url = urlObject.origin;
  }

  return {
    success: true,
    message: 'Successfully modified URL',
    data: url
  };
};
/**
 * Password validator for password validation
 * @param {password} string the password
 * @returns object
 */


exports.URLValidator = URLValidator;

const passwordValidation = password => {
  const isValid = {
    success: true,
    message: []
  };
  const objTypeof = {
    characterLen: 'number',
    upperCase: 'number',
    lowerCase: 'number',
    num: 'number',
    symbol: 'string'
  };
  Object.entries(_config.config.passwordValidation).map(([key, value]) => {
    if (key !== 'strengthOptions' && value) {
      if (typeof value !== objTypeof[key]) {
        if (key === 'symbol' && value !== 0 || key !== 'symbol') {
          isValid.success = false;
          isValid.message.push(`${key} must be type of ${objTypeof[key]}`);
        }
      }
    }
  });

  if (isValid.success) {
    let validation = [_config.config.passwordValidation.characterLen !== undefined && _config.config.passwordValidation.characterLen !== 0 ? {
      title: 'CharacterLen',
      valid: false,
      re: new RegExp('^.{' + _config.config.passwordValidation.characterLen + ',}$')
    } : null, _config.config.passwordValidation.upperCase !== undefined && _config.config.passwordValidation.upperCase !== 0 ? {
      title: 'UpperCase',
      valid: false,
      re: new RegExp('^(.*?[A-Z]){' + _config.config.passwordValidation.upperCase + ',}')
    } : null, _config.config.passwordValidation.lowerCase !== undefined && _config.config.passwordValidation.lowerCase !== 0 ? {
      title: 'LowerCase',
      valid: false,
      re: new RegExp('^(.*?[a-z]){' + _config.config.passwordValidation.lowerCase + ',}')
    } : null, _config.config.passwordValidation.num !== undefined && _config.config.passwordValidation.num !== 0 ? {
      title: 'Number',
      valid: false,
      re: new RegExp('^(.*?[0-9]){' + _config.config.passwordValidation.num + ',}')
    } : null, _config.config.passwordValidation.symbol !== undefined && _config.config.passwordValidation.symbol !== '' && _config.config.passwordValidation.symbol !== 0 ? {
      title: 'NonAlphaNumeric',
      valid: false,
      re: new RegExp('^(.*?[' + _config.config.passwordValidation.symbol + ',])')
    } : null];
    validation = validation.filter(validator => validator !== null && validator !== undefined);
    const actualValidation = validation.map(validator => {
      return { ...validator,
        valid: Boolean(validator.re.test(password))
      };
    });
    validation = actualValidation;
    return {
      validation,
      strength: (0, _auth.passwordStrength)(password)
    };
  } else {
    return isValid;
  }
};
/**
 * IP validator for IP validation
 * @param {IPAddress} string the IP adderss
 * @returns object
 */


exports.passwordValidation = passwordValidation;

const validateIPAddress = IPAddress => {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(IPAddress)) {
    return {
      success: true,
      message: 'IP is valid'
    };
  }

  return {
    success: false,
    message: 'IP is invalid'
  };
};
/**
 * Check number positivity
 * @param {number} number the number
 * @returns object
 */


exports.validateIPAddress = validateIPAddress;

const checkNumberPositivity = number => {
  // Check input type
  if (typeof number !== 'number') {
    return {
      success: false,
      message: `${number} should be type number`
    };
  } // Responses type


  const trueResponse = {
    success: true,
    message: 'successfully processed number',
    data: true
  };
  const falseResponse = {
    success: true,
    message: 'successfully processed number',
    data: false
  };
  const zeroIncluded = _config.config.checkNumberPositivity.zeroIncluded;

  if (zeroIncluded) {
    if (number >= 0) {
      return trueResponse;
    } else {
      return falseResponse;
    }
  } else {
    if (number > 0) {
      return trueResponse;
    } else {
      return falseResponse;
    }
  }
};
/**
 * @param {string} email inserted by the user
 * @returns boolean of tested input
 */


exports.checkNumberPositivity = checkNumberPositivity;

const emailDomainValidator = email => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //test if email inserted is in email format

  if (regex.test(email)) {
    const domainList = _config.config.emailDomainValidator.domainList ? _config.config.emailDomainValidator.domainList : undefined; // test if user inserted domain list

    if (!domainList || !(Array.isArray(domainList) || typeof domainList === 'string')) {
      return {
        success: false,
        message: 'domain list is required and must be string or array of strings'
      };
    } // test if array contains not string values


    if (Array.isArray(domainList)) {
      for (const domain of domainList) {
        if (typeof domain !== 'string') return {
          success: false,
          message: 'domain list must be string or array of strings only'
        };
      }
    }

    const extractedDomain = email.split('@')[1]; // test if email domain inserted is in domain list

    if (domainList.includes(extractedDomain)) {
      return {
        success: true,
        message: 'Email inserted is valid',
        data: true
      };
    } else {
      return {
        success: false,
        message: 'Email inserted is not in domain list'
      };
    }
  } else {
    return {
      success: false,
      message: 'Email inserted is invalid'
    };
  }
};

exports.emailDomainValidator = emailDomainValidator;