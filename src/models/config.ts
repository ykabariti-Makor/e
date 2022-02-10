export interface IParameters {
	characterLen?: null | string | number;
	upperCase?: null | string | number;
	lowerCase?: null | string | number;
	num?: null | string | number;
	symbol?: null | string | number;
	overallDigitLimit?: null | string | number;
	decimalDigitLimit?: null | string | number;
	strengthOptions?: {
		id: number;
		value: string;
		minDiversity: number;
		minLength: number;
	}[];
	useColors: boolean;
	colors: {
		positive: boolean;
		negative: boolean;
	};
	separators?: string;
	exceptions: string;
	domainOnly: boolean;
	pathIncluded: boolean;
	format: boolean;
	isInternational: boolean;
	domainList: boolean;
}

export interface IConfig {
	specialCharsModifier: {
		exceptions: string;
	};
	passwordValidation: {
		strengthOptions: {
			id: number;
			value: string;
			minDiversity: number;
			minLength: number;
		}[];
		characterLen?: string | number;
		upperCase?: string | number;
		lowerCase?: string | number;
		num?: string | number;
		symbol?: string | number;
	};
	URLValidator: {
		domainOnly: boolean;
		pathIncluded: boolean;
	};
	phoneNumberFormatter: {
		format: boolean | string;
		isInternational: boolean;
	};
	tagsSeparator: {
		separators?: string;
	};
	numberFormatter: {
		overallDigitLimit: number | null | string;
		decimalDigitLimit: number | null | string;
		useColors: boolean;
		colors: {
			positive?: boolean;
			negative?: boolean;
		};
	};
	checkNumberPositivity: {
		zeroIncluded: boolean;
	};
	emailDomainValidator: {
		domainList?: boolean;
	};
}
