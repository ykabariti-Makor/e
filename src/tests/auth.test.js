const utils = require('../main');

test('url valid', async () => {
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

test('password valid', async () => {
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

//****************************************************/
test('domain list is undefined - error', async () => {

	await expect(utils.emailDomainValidator('ortal0166@gmail.com')).toStrictEqual({
	  success: false,
    message: 'domain list is required and must be string or array of strings'
	});
});

test('email input matches domain value single string - successes', async () => {
	utils.setConfig('emailDomainValidator', {
		domainList: ['makor-capital.com'],
	});
	await expect(utils.emailDomainValidator('yonit@makor-capital.com')).toStrictEqual({
		success: true,
		message: 'Email inserted is valid',
	});
});

test('email input matches domain list values inside array of strings - successes', async () => {
	utils.setConfig('emailDomainValidator', {
		domainList: ['makor-capital.com', 'enigma-securities.com'],
	});
	await expect(utils.emailDomainValidator('yonit@makor-capital.com')).toStrictEqual({
		success: true,
		message: 'Email inserted is valid',
	});
});

test('Domain list is single input number type - error', async () => {
	utils.setConfig('emailDomainValidator', {
		domainList: 3,
	});
	await expect(utils.emailDomainValidator('yonit@makor-capital.com')).toStrictEqual({
		success: false,
		message: 'domain list is required and must be string or array of strings',
	});
});

test('Domain list is array of numbers - error', async () => {
	utils.setConfig('emailDomainValidator', {
		domainList: [3, 3, 5],
	});
	await expect(utils.emailDomainValidator('yonit@makor-capital.com')).toStrictEqual({
		success: false,
		message: 'domain list must be string or array of strings only',
	});
});

test("email input doesn't match the domain value single string - error", async () => {
	utils.setConfig('emailDomainValidator', {
		domainList: 'enigma.com',
	});
	await expect(utils.emailDomainValidator('yonit@makor-capital.com')).toStrictEqual({
		success: false,
		message: 'Email inserted is not in domain list',
	});
});

test("email input doesn't match domain list values inside array of strings - error", async () => {
	utils.setConfig('emailDomainValidator', {
		domainList: ['makor-capital.com', 'enigma-securities.com'],
	});
	await expect(utils.emailDomainValidator('yonit@makor-group.com')).toStrictEqual({
		success: false,
		message: 'Email inserted is not in domain list',
	});
});


