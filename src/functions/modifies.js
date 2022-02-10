const { config } = require('../config');
const { overallHandler } = require('../utils/modifies');

/**
 * Tags separator for tags string
 * @param {string} string tags
 * @param {separators} array indicator for format options, contains all special chars by default
 * @returns object
 */
const tagsSeparator = (string) => {
	const separators = config.tags.separators;
	let inferredSeparator = '';
	let options = [];

	if (separators?.length) {
		const reg = /\W/;

		for (const separator of separators) {
			if (separator.length > 1) {
				return {
					success: false,
					message: 'Separators may only include one character each.',
				};
			}

			if (!reg.test(separator)) {
				return {
					success: false,
					message: 'Separators may only include special characters.',
				};
			}
		}

		// Check items length
		if (separators.length === 1) {
			inferredSeparator = separators[0];
		} else {
			options = [...separators];
		}
	}

	if (!separators || separators.length > 1 || separators.length === 0) {
		const regSeparatorCandidates = /\W/g;

		// Capturing special characers- these are the candidates for the separator (with dupicates). This will be used if no seperators are being passed or if an empty separators array is being passed
		let specialChars = [...string.matchAll(regSeparatorCandidates)].map((item) => item[0]);

		if (separators?.length > 1) {
			// If user supplied legit array of separtor options (more than 1) - the candidates for selected separator will only include user options
			specialChars = specialChars.filter((char) => options.includes(char));
			if (specialChars.length === 0) {
				// If the separators passed by user do not exist in the passed string, push the first user separator anyway to specialChars
				//This way, the string will not be splitted later - as should happen.
				specialChars.push(options[0]);
			}
		}

		// Counting frequncy for each candidate
		const count = specialChars.reduce((accumulator, current) => {
			accumulator[current] = accumulator[current] ? (accumulator[current] += 1) : (accumulator[current] = 1);
			return accumulator;
		}, {});

		const countsArr = Object.entries(count);

		if (countsArr.length > 1) {
			// If there are several candidates for separators - sort according to count
			countsArr.sort((a, b) => b[1] - a[1]);
		}
		// Saving either the only candidate or the candidate with highest count
		inferredSeparator = countsArr[0]?.[0];
	}

	// Moving from the separator as a string to a regex that represents it correctly
	const specialChars = ['.', '*', '?', '$', '^', '(', ')', '|'];
	let inferredReg;
	let tags;

	if(!inferredSeparator){
		//if there is no inferred separator, no special chars - there will be one tag containing the string
		tags = [string]
	}else if (inferredSeparator === ' ') {
		inferredReg = /\s/;
	} else if (specialChars.includes(inferredSeparator)) {
		// Add backslash
		inferredReg = new RegExp(`\\${inferredSeparator}`);
	} else {
		inferredReg = new RegExp(inferredSeparator);
	}
	let notAtagReg = /\W/
	tags = [...new Set(string.split(inferredReg))].filter(tag => !((tag.length === 1 && notAtagReg.test(tag) ) || tag.length === 0 || tag === " "));

	return {
		success: true,
		message: 'Tags array created successfully',
		data: tags,
	};
};


console.log(tagsSeparator("tags1 , tag2"))
/**
 * Number formatter for numbers
 * @param {numToFormat} string
 * @returns string
 */
const numberFormatter = (numToFormat) => {
	if (typeof numToFormat !== 'number')
		return {
			success: false,
			message: 'Input is not a valid number',
		};

	let isNegative = false;

	// turn positive in case negative to streamline 'numberFormatter' function use
	if (numToFormat < 0) {
		isNegative = true;
		numToFormat *= -1;
	}

	const { overallDigitLimit, decimalDigitLimit, useColors, colors } = config.numberFormatter;
	//if the number have floating point count it.
	const hasFloatingPoint = String(numToFormat).includes('.') ? 1 : 0;
	let processedNumber = numToFormat,
		unitSuffix;

	//if the number got floating point fixed the number accordingly
	if (hasFloatingPoint) processedNumber = String(Number(numToFormat.toFixed(decimalDigitLimit)));
	processedNumber = String(processedNumber);
	// if the number exceeds the limit handle it
	if (processedNumber.length - hasFloatingPoint > overallDigitLimit) {
		overallHandlement = overallHandler(processedNumber, overallDigitLimit, hasFloatingPoint);
		//the processed number is the new number that has been handled + the letter represent the thousends sliced
		processedNumber = overallHandlement.num;
		unitSuffix = overallHandlement.unitSuffix;
	}

	//seperate the number by the floating point

	const [left, right] = processedNumber.split('.');

	//returns the handled number seperated by commas, attach the right side if exist and append the letter representing the thousends sliced

	const obj = {
		success: true,
		message: 'Successfully formatted number',
		data: {
			number: (isNegative ? '-' : '') + left.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (right ? '.' + right : '') + (unitSuffix ?? ''),
		},
	};

	if (useColors) obj.data.color = colors[isNegative ? 'negative' : 'positive'];

	return obj;
};

/**
 * Number formatter for phone numbers
 * @param {string} number phone number
 * @param {string} format area code, 3-2-3-4 by default
 * @param {boolean} isInternational indicator for international format, true by default
 * @returns object
 */
const phoneNumberFormatter = (number) => {
	const format = config.phoneNumberFormatter.format;
	const isInternational = config.phoneNumberFormatter.isInternational;

	const regexFormat = /^([\+]?[\(]?[0-9]{1,3}[\)]?)([\s.-]?[0-9]{1,12})([\s.-]?[0-9]{1,6}?)([\s.-]?[0-9]{1,4})$/;
	const arr = format.split('-').map((str) => +str);
	const sum = arr.reduce((acc, item) => acc + item);

	// format the phone number to numbers only
	const cleanNumber = number.replace(/[^0-9]/g, '');

	//tests if the phone number input doesn't contain letters and also accepts hyphens, whitespace and parenthesis in specific locations.
	if (!regexFormat.test(number)) {
		return {
			success: false,
			message: 'Phone number input is invalid',
		};
	}
	//tests if the phone number after removing char is equal to format sum.
	if (sum !== cleanNumber.length) {
		return {
			success: false,
			message: 'Format does not match no. of digits in phone number',
		};
	}
	// tests the phone number length by global standards
	if (cleanNumber.length >= 7 && cleanNumber.length <= 15) {
		let formattedNumber = '';
		let count = 0;
		// add to the clean number hyphens by the format param
		for (let i = 0; i < arr.length; i++) {
			if (i === 0) {
				formattedNumber = cleanNumber.slice(0, arr[i]);
				count += +arr[i];
			} else {
				formattedNumber = formattedNumber.concat('-' + cleanNumber.slice(count, count + arr[i]));
				count += +arr[i];
			}
		}
		// tests for prefix off/on and then return formatted phone number
		if (!isInternational) {
			return {
				success: true,
				message: 'Phone number successfully formatted',
				data: formattedNumber.slice(arr[0] + 1),
			};
		}
		return {
			success: true,
			message: 'Phone number successfully formatted',
			data: formattedNumber,
		};
	} else {
		return {
			success: false,
			message: 'Phone number length can contain only 7-15 digits',
		};
	}
};
/**
 * Special characters modifier
 * @param {string} string any string
 * @returns object
 */
const specialCharsModifier = (string) => {
	if (typeof string !== 'string') {
		return {
			success: false,
			message: `${string} should be string`,
		};
	}
	const formattedReg = new RegExp('[^A-Za-z0-9 ' + config.specialCharsModifier.exceptions + ']', 'g');
	const replacedString = string.replace(formattedReg, '');

	return { success: true, message: 'String successfully modified', data: replacedString };
};

/**
 * Removes unnecessary space from a text
 * @param {string} string
 * @returns object
 */
const removeSpaces = (string) => {
	if (typeof string !== 'string') {
		return {
			success: false,
			message: `${string} should be string`,
		};
	}

	const reg = /([\S])[\s]{2,}([\S])/g;
	const trimmedString = string.trim().replace(reg, '$1 $2');

	const reg2 = /([\S])[\s]{1,}([.,!?%;])/;
	const newString = trimmedString.replace(reg2, '$1$2');

	return {
		success: true,
		message: 'Spaces removed successfully',
		data: newString,
	};
};

module.exports = {
	numberFormatter,
	tagsSeparator,
	phoneNumberFormatter,
	specialCharsModifier,
	removeSpaces,
};
