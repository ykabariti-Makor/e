const { config } = require('../config');
const { passwordStrength, isURLValid } = require('../utils/auth');

/**
 * URL validator for url validation & formatting
 * @param {url} string url
 * @param {domainOnly} boolean indicator for url domain format, false by default
 * @param {pathIncluded} boolean indicator for url path format, true by default
 * @returns object
 */
const URLValidator = (url) => {
	const domainOnly = config.URLValidator.domainOnly;
	const pathIncluded = config.URLValidator.pathIncluded;
	let urlObject;

	// Check for URL validity
	const isValid = isURLValid(url);

	if (!isValid.success) {
		return {
			success: false,
			message: 'URL is invalid',
		};
	}

	try {
		urlObject = new URL(url);
	} catch (error) {
		return {
			success: false,
			message: 'URL is invalid',
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
		data: url,
	};
};

/**
 * Password validator for password validation
 * @param {password} string the password
 * @returns object
 */
const passwordValidation = (password) => {
	const isValid = {
		success: true,
		message: [],
	};

	const objTypeof = {
		characterLen: 'number',
		upperCase: 'number',
		lowerCase: 'number',
		num: 'number',
		symbol: 'string',
	};

	Object.entries(config.password).map(([key, value]) => {
		if (key !== 'strengthOptions' && value) {
			if (typeof value !== objTypeof[key]) {
				if ((key === 'symbol' && value !== 0) || key !== 'symbol') {
					isValid.success = false;
					isValid.message.push(`${key} must be type of ${objTypeof[key]}`);
				}
			}
		}
	});

	if (isValid.success) {
		let validation = [
			config.password.characterLen !== undefined && config.password.characterLen !== 0
				? {
						title: 'CharacterLen',
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
			config.password.lowerCase !== undefined && config.password.lowerCase !== 0
				? {
						title: 'LowerCase',
						valid: false,
						re: new RegExp('^(.*?[a-z]){' + config.password.lowerCase + ',}'),
				  }
				: null,
			config.password.num !== undefined && config.password.num !== 0
				? {
						title: 'Number',
						valid: false,
						re: new RegExp('^(.*?[0-9]){' + config.password.num + ',}'),
				  }
				: null,
			config.password.symbol !== undefined && config.password.symbol !== '' && config.password.symbol !== 0
				? {
						title: 'NonAlphaNumeric',
						valid: false,
						re: new RegExp('^(.*?[' + config.password.symbol + ',])'),
				  }
				: null,
		];

		validation = validation.filter((validator) => validator !== null && validator !== undefined);
		const actualValidation = validation.map((validator) => {
			return { ...validator, valid: Boolean(validator.re.test(password)) };
		});
		validation = actualValidation;
		return { validation, strength: passwordStrength(password) };
	} else {
		return isValid;
	}
};

const ValidateIPaddress = (ipaddress) => {
	if (
		/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
			ipaddress,
		)
	) {
		return { success: true, message: 'IP is valid' };
	}

	return { success: false, message: 'IP is invalid' };
};

const checkNumberPositivity = (number) => {
	// Check input type
	if (typeof number !== 'number') {
		return {
			success: false,
			message: `${number} should be type number`,
		};
	}

	// Responses type
	const trueResponse = {
		success: true,
		message: 'successfully processed number',
		data: true,
	};
	const falseResponse = {
		success: true,
		message: 'successfully processed number',
		data: false,
	};

	const zeroIncluded = config.checkNumberPositivity.zeroIncluded;

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
 *
 * @param {string} email inserted by the user
 * @returns boolean of tested input
 */
const emailDomainValidator = (email) => {
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	//test if email inserted is in email format
	if (regex.test(email)) {
		const domainList = config.emailDomainValidator.domainList ? config.emailDomainValidator.domainList : undefined;
		// test if user inserted domain list
		if (!domainList || !(Array.isArray(domainList) || typeof domainList === 'string')) {
			return {
				success: false,
				message: 'domain list is required and must be string or array of strings',
			};
		}

		// test if array contains not string values
		if (Array.isArray(domainList)) {
			for (const domain of domainList) {
				if (typeof domain !== 'string')
					return {
						success: false,
						message: 'domain list must be string or array of strings only',
					};
			}
		}

		const extractedDomain = email.split('@')[1];
		// test if email domain inserted is in domain list
		if (domainList.includes(extractedDomain)) {
			return {
				success: true,
				message: 'Email inserted is valid',
				data: true,
			};
		} else {
			return {
				success: false,
				message: 'Email inserted is not in domain list',
			};
		}
	} else {
		return {
			success: false,
			message: 'Email inserted is invalid',
		};
	}
};
module.exports = {
	URLValidator,
	passwordValidation,
	ValidateIPaddress,
	checkNumberPositivity,
	emailDomainValidator,
};
