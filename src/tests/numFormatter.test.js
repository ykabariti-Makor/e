const { setConfig } = require('./config');
const { numFormatter } = require('./utils/modifies');

console.log(
	`   ~~~~~~~~~~~ ~ ~ ~ ### @ @ @                                  @ @ @ ### ~ ~ ~ ~~~~~~~~~~~
   ~~~~~~~~~~~ ~ ~ ~ ### @ @ @     Testing Number Formatter     @ @ @ ### ~ ~ ~ ~~~~~~~~~~~
   ~~~~~~~~~~~ ~ ~ ~ ### @ @ @                                  @ @ @ ### ~ ~ ~ ~~~~~~~~~~~\n`
);

describe('test 1', () => {
	test('', () => {
		expect(numFormatter('234')).toEqual('Input is not a valid number');
	});
});

describe('test 2', () => {
	test('', () => {
		setConfig('formatter', {
			overallDigitLimit: 10,
			decimalDigitLimit: 2,
		});

		expect(numFormatter(234)).toEqual('234');
	});
});

describe('test 2', () => {
	test('', () => {
		setConfig('formatter', {
			overallDigitLimit: 2,
			decimalDigitLimit: 2,
		});


		expect(numFormatter(234)).toEqual('0.2K');
	});
});

describe('test 2', () => {
	test('', () => {

		setConfig('formatter', {
			overallDigitLimit: 3,
			decimalDigitLimit: 2,
		});

		expect(numFormatter(234234)).toEqual('0.2K');
	});
});


console.log(
	'\n\n',
	'test 4',
	'\n',
	numFormatter(234234),
	'\n',
	'expected value: 234K'
);

setConfig('formatter', {
	overallDigitLimit: 2,
	decimalDigitLimit: 2,
});
console.log(
	'\n\n',
	'test 5',
	'\n',
	numFormatter(234234),
	'\n',
	'expected value: 0.2M'
);

setConfig('formatter', {
	overallDigitLimit: 3,
	decimalDigitLimit: 2,
});
console.log(
	'\n\n',
	'test 6',
	'\n',
	numFormatter(234234),
	'\n',
	'expected value: 0.23M'
);

setConfig('formatter', {
	overallDigitLimit: 10,
	decimalDigitLimit: 2,
});
console.log(
	'\n\n',
	'test 7',
	'\n',
	numFormatter(234.234),
	'\n',
	'expected value: 234.23'
);

setConfig('formatter', {
	overallDigitLimit: 1,
	decimalDigitLimit: 2,
});
console.log(
	'\n\n',
	'test 8',
	'\n',
	numFormatter(0.234),
	'\n',
	'expected value: 0'
);

setConfig('formatter', {
	overallDigitLimit: 2,
	decimalDigitLimit: 1,
});
console.log(
	'\n\n',
	'test 9',
	'\n',
	numFormatter(0.234),
	'\n',
	'expected value: 0.2'
);

setConfig('formatter', {
	overallDigitLimit: 1,
	decimalDigitLimit: 2,
});
console.log(
	'\n\n',
	'test 10',
	'\n',
	numFormatter(1000000000),
	'\n',
	'expected value: 1G'
);

setConfig('formatter', {
	overallDigitLimit: 2,
	decimalDigitLimit: 2,
});
console.log(
	'\n\n',
	'test 11',
	'\n',
	numFormatter(100000000),
	'\n',
	'expected value: 0.1G'
);

setConfig('formatter', {
	overallDigitLimit: 2,
	decimalDigitLimit: 2,
});
console.log(
	'\n\n',
	'test 12',
	'\n',
	numFormatter(10000000),
	'\n',
	'expected value: 10M'
);

setConfig('formatter', {
	overallDigitLimit: 2,
	decimalDigitLimit: 2,
});
console.log(
	'\n\n',
	'test 13',
	'\n',
	numFormatter(1000000),
	'\n',
	'expected value: 1M'
);

setConfig('formatter', {
	overallDigitLimit: 10,
	decimalDigitLimit: 2,
});
console.log(
	'\n\n',
	'test 14',
	'\n',
	numFormatter(234234.234),
	'\n',
	'expected value: 234234.23'
);

setConfig('formatter', {
	overallDigitLimit: 3,
	decimalDigitLimit: 2,
});
console.log(
	'\n\n',
	'test 15',
	'\n',
	numFormatter(234),
	'\n',
	'expected value: 0.23K'
);

// setConfig("formatter", {
//   overallDigitLimit: 10,
//   decimalDigitLimit: 2,
// });
// console.log(
//   "\n\n",
//   "test 16",
//   "\n",
//   numFormatter(123000),
//   "\n",
//   "expected value: "
// );

// setConfig("formatter", {
//   overallDigitLimit: 10,
//   decimalDigitLimit: 2,
// });
// console.log(
//   "\n\n",
//   "test 17",
//   "\n",
//   numFormatter(234),
//   "\n",
//   "expected value:"
// );

// setConfig("formatter", {
//   overallDigitLimit: 10,
//   decimalDigitLimit: 2,
// });
// console.log(
//   "\n\n",
//   "test 18",
//   "\n",
//   numFormatter(234),
//   "\n",
//   "expected value:"
// );

// setConfig("formatter", {
//   overallDigitLimit: 10,
//   decimalDigitLimit: 2,
// });
// console.log(
//   "\n\n",
//   "test 19",
//   "\n",
//   numFormatter(234),
//   "\n",
//   "expected value:"
// );

// setConfig("formatter", {
//   overallDigitLimit: 10,
//   decimalDigitLimit: 2,
// });
// console.log(
//   "\n\n",
//   "test 20",
//   "\n",
//   numFormatter(234),
//   "\n",
//   "expected value:"
// );
