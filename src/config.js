const config = {
	password: {
		strengthOptions: [
			{
				id: 0,
				value: 'Weak',
				minDiversity: 1,
				minLength: 8
			},

			{
				id: 1,
				value: 'Strong',
				minDiversity: 2,
				minLength: 10
			},

			{
				id: 2,
				value: 'Very Strong',
				minDiversity: 4,
				minLength: 12
			}
		],

		characterLen: 8,
		upperCase: 1,
		lowerCase: 1,
		num: 1,
		symbol: '#?!@$%^&*-'
	},
	URLValidator: {
		domainOnly: false,
		pathIncluded: true
	},
	phones: {
		format: '3-2-3-4',
		isInternational: true
	},
	tags: {
		separators: undefined
	},
	numsFormater: {
		overallDigitLimit: 100,
		decimalDigitLimit: 100
	}
};

const setConfig = (configName, parameters) => {
	switch (configName) {
	case 'password':
		config.password = {
			characterLen:
          parameters.characterLen === null ||
          parameters.characterLen === undefined ||
          parameters.characterLen === 0
          	? undefined
          	: parameters.characterLen,
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
          parameters.symbol === ''
          	? undefined
          	: parameters.symbol,
			strengthOptions: parameters.strengthOptions
				? parameters.strengthOptions.map((opt, index) => ({
					...opt,
					id: index
				}))
				: config.password.strengthOptions.map((opt, index) => ({
					...opt,
					id: index,
					minLength:
                parameters.characterLen + (index === 0 ? 0 : (index *= 2))
				}))
		};
		break;

	case 'formatter':
		if (parameters.overallDigitLimit !== undefined)
			config.numsFormater.overallDigitLimit = parameters.overallDigitLimit;
		if (parameters.decimalDigitLimit !== undefined)
			config.numsFormater.decimalDigitLimit = parameters.decimalDigitLimit;
		break;
	case 'URLValidator' || 'urlValidator':
		if (parameters.domainOnly !== undefined)
			config.URLValidator.domainOnly = parameters.domainOnly;
		if (parameters.pathIncluded !== undefined)
			config.URLValidator.pathIncluded = parameters.pathIncluded;
		break;
	case 'phones':
		if (parameters.format !== undefined)
			config.phones.format = parameters.format;
		if (parameters.isInternational !== undefined)
			config.phones.isInternational = parameters.isInternational;
		break;
	case 'tags':
		config.tags.separators = parameters.separators;
		break;
	}
};

module.exports = { config, setConfig };
