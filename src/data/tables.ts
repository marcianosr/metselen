import { Sum } from "../types/Assignment";

export type AssignmentFormat = {
	sum: string;
	result: number;
	correct: "yes" | "no" | "untouched";
};

export const buildSumAssignmentsToDisplay = (sum: Sum): AssignmentFormat[][] =>
	sum.base.map((base: number) =>
		sum.modifier.map((modifier: number) => ({
			sum: `${base} x ${modifier}`,
			result: base * modifier,
			correct: "untouched",
		}))
	);

export const makeTables = (
	tableRange: number[],
	multiplierRange: number[]
): AssignmentFormat[][] => {
	return tableRange.map((range, idx) =>
		multiplierRange.map((multiplier) => ({
			sum: `${range} x ${multiplier}`,
			result: multiplier * range,
			correct: "untouched",
		}))
	);
};
export const getRandomTable = (
	assignmentFormat: AssignmentFormat[][],
	tableRange: number[],
	multiplierRange: number[]
): AssignmentFormat => {
	const randomNumberForRow: number = Math.floor(
		Math.random() * tableRange.length
	);
	const randomNumberForCell: number = Math.floor(
		Math.random() * multiplierRange.length
	);

	return assignmentFormat[randomNumberForRow][randomNumberForCell];
};
