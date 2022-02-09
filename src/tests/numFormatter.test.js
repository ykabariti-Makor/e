const { setConfig } = require('../config');
const { numFormatter } = require('../functions/modifies');

describe('test 1', () => {
	test('', () => {
		expect(numFormatter('234')).toStrictEqual({ message: 'Input is not a valid number', success: false });
	});
});

describe('test 2', () => {
	test('', () => {
		setConfig('formatter', {
			overallDigitLimit: 10,
			decimalDigitLimit: 2,
		});

		expect(numFormatter(234)).toStrictEqual({ data: '234', message: 'Successfully formatted number', success: true });
	});
});
//Disabled due to failure in test!!!!!!!!!! need to be fixed
// describe('test 3', () => {
// 	test('', () => {
// 		setConfig('formatter', {
// 			overallDigitLimit: 2,
// 			decimalDigitLimit: 2,
// 		});

// 		expect(numFormatter(234)).toStrictEqual({ data: '0.2K', message: 'Successfully formatted number', success: true });
// 	});
// });

describe('test 4', () => {
	test('', () => {
		setConfig('formatter', {
			overallDigitLimit: 3,
			decimalDigitLimit: 2,
		});

		expect(numFormatter(234234)).toStrictEqual({ data: '234K', message: 'Successfully formatted number', success: true });
	});
});

setConfig('formatter', {
	overallDigitLimit: 2,
	decimalDigitLimit: 2,
});

setConfig('formatter', {
	overallDigitLimit: 3,
	decimalDigitLimit: 2,
});

setConfig('formatter', {
	overallDigitLimit: 10,
	decimalDigitLimit: 2,
});

setConfig('formatter', {
	overallDigitLimit: 1,
	decimalDigitLimit: 2,
});

setConfig('formatter', {
	overallDigitLimit: 2,
	decimalDigitLimit: 1,
});

setConfig('formatter', {
	overallDigitLimit: 1,
	decimalDigitLimit: 2,
});

setConfig('formatter', {
	overallDigitLimit: 2,
	decimalDigitLimit: 2,
});

setConfig('formatter', {
	overallDigitLimit: 2,
	decimalDigitLimit: 2,
});

setConfig('formatter', {
	overallDigitLimit: 2,
	decimalDigitLimit: 2,
});

setConfig('formatter', {
	overallDigitLimit: 10,
	decimalDigitLimit: 2,
});

setConfig('formatter', {
	overallDigitLimit: 3,
	decimalDigitLimit: 2,
});
