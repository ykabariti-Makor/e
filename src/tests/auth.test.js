const utils = require('../main');

test('url_valid', async () => {
	utils.setConfig('URLValidator', {
		domainOnly: true,
		pathIncluded: false,
	});
	await expect(utils.URLValidator('https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages')).toStrictEqual({
		success: true,
		message: 'Successfully modified URL',
		data: 'docs.npmjs.com',
	});
});

test('password_valid', async () => {
	//arrange
	utils.setConfig('password', {
		strengthOptions: [
			{
				value: 'Weak',
				minDiversity: 1,
				minLength: 12,
			},

			{
				value: 'Strong',
				minDiversity: 2,
				minLength: 14,
			},

			{
				value: 'Very Strong',
				minDiversity: 4,
				minLength: 16,
			},
		],

		characterLen: 12,
		upperCase: 1,
		lowerCase: 1,
		num: 1,
		symbol: '#?!@$%^&*-',
	});

	//act
	const passwordResult = utils.passwordValidation('123Aa4@5@#!678');

	//assent
	await expect(passwordResult).toStrictEqual({
		validation: [
			{ title: 'CharacterLen', valid: true, re: /^.{12,}$/ },
			{ title: 'UpperCase', valid: true, re: /^(.*?[A-Z]){1,}/ },
			{ title: 'LowerCase', valid: true, re: /^(.*?[a-z]){1,}/ },
			{ title: 'Number', valid: true, re: /^(.*?[0-9]){1,}/ },
			{
				title: 'NonAlphaNumeric',
				valid: true,
				re: /^(.*?[#?!@$%^&*-,])/,
			},
		],
		strength: 'Strong',
	});
});

//fail password scenarios
test('password_valid_fail_senario_1', async () => {
	//arrange
	utils.setConfig('password', {
		strengthOptions: [
			{
				value: 'Weak',
				minDiversity: 1,
				minLength: 12,
			},

			{
				value: 'Strong',
				minDiversity: 2,
				minLength: 14,
			},

			{
				value: 'Very Strong',
				minDiversity: 4,
				minLength: 16,
			},
		],

		characterLen: 'a',
		upperCase: 1,
		lowerCase: 1,
		num: 1,
		symbol: '#?!@$%^&*-',
	});

	//act
	const passwordResult = utils.passwordValidation('123Aa4@5@#!678');

	//assent
	await expect(passwordResult).toStrictEqual({
		success: false,
		message: ['characterLen must be type of number'],
	});
});

test('password_valid_fail_senario_2', async () => {
	//arrange
	utils.setConfig('password', {
		strengthOptions: [
			{
				value: 'Weak',
				minDiversity: 1,
				minLength: 12,
			},

			{
				value: 'Strong',
				minDiversity: 2,
				minLength: 14,
			},

			{
				value: 'Very Strong',
				minDiversity: 4,
				minLength: 16,
			},
		],

		characterLen: 8,
		upperCase: "a",
		lowerCase: 1,
		num: 1,
		symbol: '#?!@$%^&*-',
	});

	//act
	const passwordResult = utils.passwordValidation('123Aa4@5@#!678');

	//assent
	await expect(passwordResult).toStrictEqual({
		success: false,
		message: ['upperCase must be type of number'],
	});
});

test('password_valid_fail_senario_3', async () => {
	//arrange
	utils.setConfig('password', {
		strengthOptions: [
			{
				value: 'Weak',
				minDiversity: 1,
				minLength: 12,
			},

			{
				value: 'Strong',
				minDiversity: 2,
				minLength: 14,
			},

			{
				value: 'Very Strong',
				minDiversity: 4,
				minLength: 16,
			},
		],

		characterLen: 8,
		upperCase: 1,
		lowerCase: "1",
		num: 1,
		symbol: '#?!@$%^&*-',
	});

	//act
	const passwordResult = utils.passwordValidation('123Aa4@5@#!678');

	//assent
	await expect(passwordResult).toStrictEqual({
		success: false,
		message: ['lowerCase must be type of number'],
	});
});

test('password_valid_fail_senario_4', async () => {
	//arrange
	utils.setConfig('password', {
		strengthOptions: [
			{
				value: 'Weak',
				minDiversity: 1,
				minLength: 12,
			},

			{
				value: 'Strong',
				minDiversity: 2,
				minLength: 14,
			},

			{
				value: 'Very Strong',
				minDiversity: 4,
				minLength: 16,
			},
		],

		characterLen: 8,
		upperCase: 1,
		lowerCase: 1,
		num: "a",
		symbol: '#?!@$%^&*-',
	});

	//act
	const passwordResult = utils.passwordValidation('123Aa4@5@#!678');

	//assent
	await expect(passwordResult).toStrictEqual({
		success: false,
		message: ['num must be type of number'],
	});
});

test('password_valid_fail_senario_5', async () => {
	//arrange
	utils.setConfig('password', {
		strengthOptions: [
			{
				value: 'Weak',
				minDiversity: 1,
				minLength: 12,
			},

			{
				value: 'Strong',
				minDiversity: 2,
				minLength: 14,
			},

			{
				value: 'Very Strong',
				minDiversity: 4,
				minLength: 16,
			},
		],

		characterLen: 8,
		upperCase: 1,
		lowerCase: 1,
		num: 1,
		symbol: 1,
	});

	//act
	const passwordResult = utils.passwordValidation('123Aa4@5@#!678');

	//assent
	await expect(passwordResult).toStrictEqual({
		success: false,
		message: ['symbol must be type of string'],
	});
});


//success scenario
test('ip_validation', async () => {
	await expect(utils.ValidateIPaddress('10.0.0.36')).toStrictEqual({ success: true, message: 'IP is valid' });
});

//failed scenario - wrong input
test('ip_validation_fail', async () => {
	await expect(utils.ValidateIPaddress(10)).toStrictEqual({ success: false, message: 'IP is invalid' });
});

//failed scenario - wrong ip
test('ip_validation_fail', async () => {
	await expect(utils.ValidateIPaddress('10.0.0')).toStrictEqual({ success: false, message: 'IP is invalid' });
});
