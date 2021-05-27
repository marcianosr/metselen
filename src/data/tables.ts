export type TableResult = {
	table: string;
	result: number;
	correct: "yes" | "no" | "untouched";
};


export const makeTables = (tableRange: number[], multiplierRange:number[]): TableResult[][] => 
	tableRange.map((range) =>
	multiplierRange.map((multiplier) => ({
		table: `${range} x ${multiplier}`,
		result: multiplier * range,
		correct: "untouched",
	}))
); 

export const getRandomTable = (tableResult: TableResult[][], tableRange: number[], multiplierRange: number[]): TableResult => {
	const randomNumberForRow: number = Math.floor(
		Math.random() * tableRange.length
	);
	const randomNumberForCell: number = Math.floor( 
		Math.random() * multiplierRange.length
	);

	return tableResult[randomNumberForRow][randomNumberForCell];
};

