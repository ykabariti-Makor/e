import { specialCharsModifier, numberFormatter, tagsSeparator, phoneNumberFormatter, removeSpaces, setConfig } from '../main';

test('simple input - successes', async () => {
	setConfig('phoneNumberFormatter', {
		format: '3-8',
	});
	await expect(phoneNumberFormatter('12345678765')).toStrictEqual({
		data: '123-45678765',
		message: 'Phone number successfully formatted',
		success: true,
	});
});

test('simple input with isInternational: false- successes', async () => {
	setConfig('phoneNumberFormatter', {
		format: '3-4-4',
		isInternational: false,
	});
	await expect(phoneNumberFormatter('12345678765')).toStrictEqual({
		data: '4567-8765',
		message: 'Phone number successfully formatted',
		success: true,
	});
});

test('phone number length test - error', async () => {
	setConfig('phoneNumberFormatter', {
		format: '3-8-5',
	});
	await expect(phoneNumberFormatter('123-4567-876544133')).toStrictEqual({
		success: false,
		message: 'Phone number length can contain only 7-15 digits',
	});
});

test('phone number format test - error', async () => {
	setConfig('phoneNumberFormatter', {
		format: '3-8',
	});
	await expect(phoneNumberFormatter('123-4567-876544133')).toStrictEqual({
		success: false,
		message: 'Format does not match no. of digits in phone number',
	});
});

test('phone number format invalid - error', async () => {
	setConfig('phoneNumberFormatter', {
		format: '3-3-4',
	});
	await expect(phoneNumberFormatter('123$456$4133')).toStrictEqual({
		success: false,
		message: 'Phone number input is invalid',
	});
});

test('user sends words with a number of separators between them; function cleans separators that might be recognized as tags', async () => {
	await expect(tagsSeparator('tag1 | tag2')).toStrictEqual({
		success: true,

		message: 'Tags array created successfully',

		data: ['tag1', 'tag2'],
	});
});

test('user does not send separators, the string is split using the most frequent special char - successes', async () => {
	await expect(tagsSeparator('a,b,c,d,e,f')).toStrictEqual({
		data: ['a', 'b', 'c', 'd', 'e', 'f'],
		message: 'Tags array created successfully',
		success: true,
	});
});

test('user sends duplicate words, function returns only unique tags - successes', async () => {
	await expect(tagsSeparator('sea-sun-moon-sea')).toStrictEqual({
		success: true,
		message: 'Tags array created successfully',
		data: ['sea', 'sun', 'moon'],
	});
});

test('user sends one separator - string is split according to it (even if it is not the most frequent) - successes', async () => {
	setConfig('tagsSeparator', {
		separators: [','],
	});
	await expect(tagsSeparator('a:b:c:d,e,f')).toStrictEqual({
		data: ['a:b:c:d', 'e', 'f'],
		message: 'Tags array created successfully',
		success: true,
	});
});

test('user sends a couple of separators , string is split according to the most frequent among them  - successes', async () => {
	setConfig('tagsSeparator', {
		separators: [',', '-'],
	});
	await expect(tagsSeparator('a,b,c-d,e,f,a-b-c-d-e-f')).toStrictEqual({
		data: ['a,b,c', 'd,e,f,a', 'b', 'c', 'd', 'e', 'f'],
		message: 'Tags array created successfully',
		success: true,
	});
});

test('user sends separators that do not exist in string , function sends back array with one unsplit string - successes', async () => {
	setConfig('tagsSeparator', {
		separators: ['|', '.'],
	});
	await expect(tagsSeparator('a,b,c-d,e,f,a-b-c-d-e-f')).toStrictEqual({
		data: ['a,b,c-d,e,f,a-b-c-d-e-f'],
		message: 'Tags array created successfully',
		success: true,
	});
});

test('user sends empty separators array, string is split according to most frequent special char', async () => {
	setConfig('tagsSeparator', {
		separators: [],
	});
	await expect(tagsSeparator('a,b,c-d,e,f,a-b-c-d-e-f')).toStrictEqual({
		data: ['a,b,c', 'd,e,f,a', 'b', 'c', 'd', 'e', 'f'],
		message: 'Tags array created successfully',
		success: true,
	});
});

test('double char separator - error', async () => {
	setConfig('tagsSeparator', {
		separators: [',,'],
	});
	await expect(tagsSeparator('a,b,c,d,e,f')).toStrictEqual({
		message: 'Separators may only include one character each.',
		success: false,
	});
});

test('separator doesnt contains special char - error', async () => {
	setConfig('tagsSeparator', {
		separators: ['3'],
	});
	await expect(tagsSeparator('a3b3c3d3e3f')).toStrictEqual({
		message: 'Separators may only include special characters.',
		success: false,
	});
});

test('user sends string with unneeded spaces at the start/end of the string', async () => {
	await expect(removeSpaces('   user sends empty separators array, string is split according to most frequent char')).toStrictEqual({
		data: 'user sends empty separators array, string is split according to most frequent char',
		message: 'Spaces removed successfully',
		success: true,
	});
});

test('user sends string with unneeded spaces between words (more then one space)', async () => {
	await expect(removeSpaces('user      sends empty separators array, string is split according to most frequent char')).toStrictEqual({
		data: 'user sends empty separators array, string is split according to most frequent char',

		message: 'Spaces removed successfully',

		success: true,
	});
});

test('user sends string with unneeded spaces between words and punctuation marks (even one space is considered unneeded)', async () => {
	await expect(removeSpaces('user sends empty separators array , string is split according to most frequent char')).toStrictEqual({
		data: 'user sends empty separators array, string is split according to most frequent char',
		message: 'Spaces removed successfully',
		success: true,
	});
});

test('user sends string with unneeded whitespace created by tabs', async () => {
	await expect(removeSpaces('user sends empty separators array , string is split according to most frequent char')).toStrictEqual({
		data: 'user sends empty separators array, string is split according to most frequent char',
		message: 'Spaces removed successfully',
		success: true,
	});
});

describe(`~~~~~~~~~~~ ~ ~ ~ ### @ @ @                                  @ @ @ ### ~ ~ ~ ~~~~~~~~~~~
~~~~~~~~~~~ ~ ~ ~ ### @ @ @     Testing Number Formatter     @ @ @ ### ~ ~ ~ ~~~~~~~~~~~
~~~~~~~~~~~ ~ ~ ~ ### @ @ @                                  @ @ @ ### ~ ~ ~ ~~~~~~~~~~~\n`, () => {
	test('Test No. 1', async () => {
		await expect(numberFormatter('234')).toEqual(
			expect.objectContaining({
				success: false,
			}),
		);
	});

	test('Test No. 2', async () => {
		setConfig('numberFormatter', {
			overallDigitLimit: 10,
			decimalDigitLimit: 2,
		});

		await expect(numberFormatter(234)).toEqual(
			expect.objectContaining({
				data: { number: '234' },
			}),
		);
	});

	test('Test No. 3', async () => {
		setConfig('numberFormatter', {
			overallDigitLimit: 2,
			decimalDigitLimit: 2,
		});

		await expect(numberFormatter(234)).toEqual(
			expect.objectContaining({
				data: { number: '0.2K' },
			}),
		);
	});

	test('Test No. 4', async () => {
		setConfig('numberFormatter', {
			overallDigitLimit: 3,
			decimalDigitLimit: 2,
		});

		await expect(numberFormatter(234234)).toEqual(
			expect.objectContaining({
				data: { number: '234K' },
			}),
		);
	});

	test('Test No. 5', async () => {
		setConfig('numberFormatter', {
			overallDigitLimit: 2,
			decimalDigitLimit: 2,
		});

		await expect(numberFormatter(234234)).toEqual(
			expect.objectContaining({
				data: { number: '0.2M' },
			}),
		);
	});

	test('Test No. 6', async () => {
		setConfig('numberFormatter', {
			overallDigitLimit: 3,
			decimalDigitLimit: 2,
		});

		await expect(numberFormatter(234234)).toEqual(
			expect.objectContaining({
				data: { number: '234K' },
			}),
		);
	});

	test('Test No. 7', async () => {
		setConfig('numberFormatter', {
			overallDigitLimit: 10,
			decimalDigitLimit: 2,
		});

		await expect(numberFormatter(234.234)).toEqual(
			expect.objectContaining({
				data: { number: '234.23' },
			}),
		);
	});

	test('Test No. 8', async () => {
		setConfig('numberFormatter', {
			overallDigitLimit: 1,
			decimalDigitLimit: 2,
		});

		await expect(numberFormatter(0.234)).toEqual(
			expect.objectContaining({
				data: { number: '0' },
			}),
		);
	});

	test('Test No. 9', async () => {
		setConfig('numberFormatter', {
			overallDigitLimit: 2,
			decimalDigitLimit: 1,
		});

		await expect(numberFormatter(0.234)).toEqual(
			expect.objectContaining({
				data: { number: '0.2' },
			}),
		);
	});

	test('Test No. 10', async () => {
		setConfig('numberFormatter', {
			overallDigitLimit: 1,
			decimalDigitLimit: 2,
		});

		await expect(numberFormatter(1000000000)).toEqual(
			expect.objectContaining({
				data: { number: '1B' },
			}),
		);
	});

	test('Test No. 11', async () => {
		setConfig('numberFormatter', {
			overallDigitLimit: 2,
			decimalDigitLimit: 2,
		});

		await expect(numberFormatter(100000000)).toEqual(
			expect.objectContaining({
				data: { number: '0.1B' },
			}),
		);
	});

	test('Test No. 12', async () => {
		setConfig('numberFormatter', {
			overallDigitLimit: 2,
			decimalDigitLimit: 2,
		});

		await expect(numberFormatter(10000000)).toEqual(
			expect.objectContaining({
				data: { number: '10M' },
			}),
		);
	});

	test('Test No. 13', async () => {
		setConfig('numberFormatter', {
			overallDigitLimit: 2,
			decimalDigitLimit: 2,
		});

		await expect(numberFormatter(1000000)).toEqual(
			expect.objectContaining({
				data: { number: '1.0M' },
			}),
		);
	});

	test('Test No. 14', async () => {
		setConfig('numberFormatter', {
			overallDigitLimit: 10,
			decimalDigitLimit: 2,
		});

		await expect(numberFormatter(234234.234)).toEqual(
			expect.objectContaining({
				data: { number: '234,234.23' },
			}),
		);
	});

	test('Test No. 15', async () => {
		setConfig('numberFormatter', {
			overallDigitLimit: 10,
			decimalDigitLimit: 2,
		});

		await expect(numberFormatter(234)).toEqual(
			expect.objectContaining({
				data: { number: '234' },
			}),
		);
	});

	test('Test No. 16', async () => {
		setConfig('numberFormatter', {
			overallDigitLimit: 2,
			decimalDigitLimit: 2,
		});

		await expect(numberFormatter(-1234)).toEqual(
			expect.objectContaining({
				data: { number: '-1.2K' },
			}),
		);
	});

	test('Test No. 17', async () => {
		setConfig('numberFormatter', {
			overallDigitLimit: 2,
			decimalDigitLimit: 2,
		});

		await expect(numberFormatter(-0.5)).toEqual(
			expect.objectContaining({
				data: { number: '-0.5' },
			}),
		);
	});

	test('Test No. 18', async () => {
		setConfig('numberFormatter', {
			overallDigitLimit: 2,
			decimalDigitLimit: 2,
		});

		await expect(numberFormatter(-0.5)).toEqual(
			expect.objectContaining({
				data: { number: '-0.5' },
			}),
		);
	});

	test('Test No. 19', async () => {
		setConfig('numberFormatter', {
			overallDigitLimit: 10,
			decimalDigitLimit: 2,
		});

		await expect(numberFormatter(5000000000)).toEqual(
			expect.objectContaining({
				data: { number: '5,000,000,000' },
			}),
		);
	});

	test('Test No. 20', async () => {
		setConfig('numberFormatter', {
			overallDigitLimit: 2,
			decimalDigitLimit: 2,
		});

		await expect(numberFormatter(-0.5)).toEqual(
			expect.objectContaining({
				data: { number: '-0.5' },
			}),
		);
	});
});

// Success situation when no configuration function.
test('specialCharModifier', async () => {
	await expect(specialCharsModifier('av!iv @ avisrur $# !&*')).toStrictEqual({
		success: true,
		message: 'String successfully modified',
		data: 'aviv  avisrur  ',
	});
});

// Success situation when config the function.
test('specialCharModifier', async () => {
	setConfig('specialCharsModifier', { exceptions: '@#$' });
	await expect(specialCharsModifier('av!iv @ avisrur $# !&*')).toStrictEqual({
		success: true,
		message: 'String successfully modified',
		data: 'aviv @ avisrur $# ',
	});
});

// Success situation when no configuration function.
test('specialCharModifier', async () => {
	await expect(specialCharsModifier(12345)).toStrictEqual({ success: false, message: '12345 should be string' });
});
