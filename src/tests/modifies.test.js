const utils = require('../main');

test('simple input - successes', async () => {
	utils.setConfig('phoneNumberFormatter', {
		format: '3-8',
	});
	await expect(utils.phoneNumberFormatter('12345678765')).toStrictEqual({
		data: '123-45678765',
		message: 'Phone number successfully formatted',
		success: true,
	});
});

test('simple input with isInternational: false- successes', async () => {
	utils.setConfig('phoneNumberFormatter', {
		format: '3-4-4',
		isInternational: false,
	});
	await expect(utils.phoneNumberFormatter('12345678765')).toStrictEqual({
		data: '4567-8765',
		message: 'Phone number successfully formatted',
		success: true,
	});
});

test('phone number length test - error', async () => {
	utils.setConfig('phoneNumberFormatter', {
		format: '3-8-5',
	});
	await expect(utils.phoneNumberFormatter('123-4567-876544133')).toStrictEqual({
		success: false,
		message: 'Phone number length can contain only 7-15 digits',
	});
});

test('phone number format test - error', async () => {
	utils.setConfig('phoneNumberFormatter', {
		format: '3-8',
	});
	await expect(utils.phoneNumberFormatter('123-4567-876544133')).toStrictEqual({
		success: false,
		message: 'Format does not match no. of digits in phone number',
	});
});

test('phone number format invalid - error', async () => {
	utils.setConfig('phoneNumberFormatter', {
		format: '3-3-4',
	});
	await expect(utils.phoneNumberFormatter('123$456$4133')).toStrictEqual({
		success: false,
		message: 'Phone number input is invalid',
	});
});

//************************************************************/

test('user sends one separator - string is split according to it (even if it\'s not the most frequent) - successes', async () => {
	utils.setConfig('tags', {
		separators: [','],
	});
	await expect(utils.tagsSeparator('a:b:c:d,e,f')).toStrictEqual({
		data: ['a:b:c:d', 'e', 'f'],
		message: 'Tags array created successfully',
		success: true,
	});
});

test('user sends a couple of separators , string is split according to the most frequent among them  - successes', async () => {
	utils.setConfig('tags', {
		separators: [',', '-'],
	});
	await expect(utils.tagsSeparator('a,b,c-d,e,f,a-b-c-d-e-f')).toStrictEqual({
		data: ['a,b,c', 'd,e,f,a', 'b', 'c', 'd', 'e', 'f'],
		message: 'Tags array created successfully',
		success: true,
	});
});

test('user does not send separators, the string is split using the most frequent special char - successes', async () => {
	await expect(utils.tagsSeparator('a,b,c,d,e,f')).toStrictEqual({
		data: ['a', 'b', 'c', 'd', 'e', 'f'],
		message: 'Tags array created successfully',
		success: true,
	});
});

test('user sends separators that do not exist in string , function sends back array with one unsplit string - successes', async () => {
	utils.setConfig('tags', {
		separators: ['|', '.'],
	});
	await expect(utils.tagsSeparator('a,b,c-d,e,f,a-b-c-d-e-f')).toStrictEqual({
		data: ['a,b,c-d,e,f,a-b-c-d-e-f'],
		message: 'Tags array created successfully',
		success: true,
	});
});

test('user sends empty separators array, string is split according to most frequent special char', async () => {
	utils.setConfig('tags', {
		separators: [],
	});
	await expect(utils.tagsSeparator('a,b,c-d,e,f,a-b-c-d-e-f')).toStrictEqual({
		data: ['a,b,c', 'd,e,f,a', 'b', 'c', 'd', 'e', 'f'],
		message: 'Tags array created successfully',
		success: true,
	});
});

test('double char seperator - error', async () => {
	utils.setConfig('tags', {
		separators: [',,'],
	});
	await expect(utils.tagsSeparator('a,b,c,d,e,f')).toStrictEqual({
		message: 'Separators may only include one character each.',
		success: false,
	});
});
test('seperator doesnt contains special char - error', async () => {
	utils.setConfig('tags', {
		separators: ['3'],
	});
	await expect(utils.tagsSeparator('a3b3c3d3e3f')).toStrictEqual({
		message: 'Separators may only include special characters.',
		success: false,
	});
});
