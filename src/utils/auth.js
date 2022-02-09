const { config } = require('../../config');

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

const isURLValid = (url) => {
	// Checks for URL validity
	const pattern = new RegExp(
		'^(https?:\\/\\/)?' +
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
			'((\\d{1,3}\\.){3}\\d{1,3}))' +
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
			'(\\?[;&a-z\\d%_.~+=-]*)?' +
			'(\\#[-a-z\\d_]*)?$',
		'i',
	);

	if (!pattern.test(url)) {
		return {
			success: false,
			message: 'URL is invalid',
		};
	}

	return {
		success: true,
		message: 'URL is valid',
		data: pattern.test(url),
	};
};

/**
 * Password validator for password validation
 * @param {password} string the password
 * @returns object
 */
const passwordValidation = (password) => {
	let isValid = {
		success: true,
		message: [],
	};

	let objTypeof = {
		characterLen: 'number',
		upperCase: 'number',
		lowerCase: 'number',
		num: 'number',
		symbol: 'string',
	};

	Object.entries(config.password).map(([key, value]) => {
		if (key !== 'strengthOptions' && value) {
			if (typeof value !== objTypeof[key]) {
				if (key === 'symbol' && value !== 0) {
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
			config.password.symbol !== undefined && config.password.symbol !== '' && config.password.symbol !== 0
				? {
						title: 'NonAlphaNumeric',
						valid: false,
						re: new RegExp('^(.*?[' + config.password.symbol + ',])'),
				  }
				: null,
		];

		validation = validation.filter((validator) => validator !== null && validator !== undefined);
		let actualValidation = validation.map((validator) => {
			return { ...validator, valid: Boolean(validator.re.test(password)) };
		});
		validation = actualValidation;
		return { validation, strength: passwordStrength(password) };
	} else {
		return isValid;
	}
};

const passwordStrength = (password, options = config.password.strengthOptions, allowedSymbols = config.password.symbol) => {
	let passwordCopy = password || '';

	let isValid = {
		success: true,
		message: [],
	};

	let objTypeof = {
		value: 'string',
		minDiversity: 'number',
		minLength: 'number',
	};

	options.map((opt) => {
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
		(options[0].minDiversity = 0), (options[0].minLength = 0);

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
		];

		if (allowedSymbols) {
			rules.push({
				regex: `[${escapeRegExp(allowedSymbols)}]`,
				message: 'symbol',
			});
		}

		let strength = {};

		strength.contains = rules.filter((rule) => new RegExp(`${rule.regex}`).test(passwordCopy)).map((rule) => rule.message);

		strength.length = passwordCopy.length;

		let fulfilledOptions = options
			.filter((option) => strength.contains.length >= option.minDiversity)
			.filter((option) => strength.length >= option.minLength)
			.sort((o1, o2) => o2.id - o1.id)
			.map((option) => ({ id: option.id, value: option.value }));

		Object.assign(strength, fulfilledOptions[0]);
		return strength.value;
	} else {
		return isValid;
	}
};

const escapeRegExp = (string) => string.replace(/[-.*+?^${}()|[\]\\]/g, '\\$&');

const ValidateIPaddress = (ipaddress) => {
	if (
		/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
			ipaddress,
		)
	) {
		return true;
	}

	return false;
};

const checkPositive = (number, zeroIncluded = false) => {};
module.exports = {
	URLValidator,
	passwordValidation,
	ValidateIPaddress,
};
