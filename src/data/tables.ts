export type TableResult = {
	table: string;
	result: number;
	correct: "yes" | "no" | "untouched";
};

// Will be configurable
const TABLE_RANGE = [1, 2];
const MULTIPLIER_RANGE = [4, 5, 6, 7, 8];

const tables: TableResult[][] = TABLE_RANGE.map((range) =>
	MULTIPLIER_RANGE.map((multiplier) => ({
		table: `${range} * ${multiplier}`,
		result: multiplier * range,
		correct: "untouched",
	}))
);

export const getRandomTable = (tableResult: TableResult[][]): TableResult => {
	const randomNumberForRow: number = Math.floor(
		Math.random() * TABLE_RANGE.length
	);
	const randomNumberForCell: number = Math.floor(
		Math.random() * MULTIPLIER_RANGE.length
	);

	return tableResult[randomNumberForRow][randomNumberForCell];
};

export { tables };
