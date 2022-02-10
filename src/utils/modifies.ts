import { IMagnitudeUnits } from '../models/modifies';

// Handle the overall digit limit
const overallHandler = (num: string, limit: number, isFloatingPoint: number) => {
	// If the number contains floating point and the number is over the limit start to slice away the numbers
	// Until it meets the limit or until reaching the floating point
	if (isFloatingPoint)
		while (num.length - isFloatingPoint > limit) {
			num = num.substring(0, num.length - 1);

			if (num.length - isFloatingPoint === limit) {
				return { num };
			}

			if (num.charAt(num.length - 1) === '.') {
				num = num.substring(0, num.length - 1);
				break;
			}
		}

	// Thousend sliced counter initialized with 0
	let thousandsSliced = 0;
	let remainder: string;

	// The number exceeds the limit start slicing away by thousend at each time, save the sliced digits aside and count the thousends sliced
	while (num.length > limit) {
		remainder = num.substring(num.length - 3);
		num = num.substring(0, num.length - 3);

		thousandsSliced++;
	}

	const magnitudeUnits: IMagnitudeUnits = {
		1: 'K',
		2: 'M',
		3: 'B',
	};

	// Return the number + floating point if needed + the chunk from the remainder the meets the limit
	// Also return the letter that represent the number of thousends sliced
	return {
		num: (num ? num : '0') + (limit - num.length ? '.' : '') + remainder!.substring(0, limit - num.length - (num ? 0 : 1)),
		unitSuffix: magnitudeUnits[thousandsSliced],
	};
};

export { overallHandler };
