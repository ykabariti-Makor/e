export interface IObj {
	success: boolean;
	message: string;
	data: {
		number: string;
		color?: string;
	};
}

export interface IMagnitudeUnits {
	1: string;
	2: string;
	3: string;
	[key: string]: string;
}
