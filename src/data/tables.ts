import {
	MathAssignment,
	mathAssignmentConfig,
	OperatorDisplay,
} from "../types/Assignment";

export type AssignmentFormat = {
	sum: string;
	result: number;
	correct: "yes" | "no" | "untouched";
};

export const createSumMapping = (
	tableRange: number[],
	multiplierRange: number[],
	assignmentType: MathAssignment
): AssignmentFormat[][] => {
	return tableRange.map((range, idx) =>
		multiplierRange.map((multiplier) => ({
			sum: displaySum({
				range,
				multiplier,
				operator: mathAssignmentConfig[assignmentType].operatorDisplay,
			}),
			result: calculate({ range, multiplier })[
				mathAssignmentConfig[assignmentType].operatorDisplay
			],
			correct: "untouched",
		}))
	);
};

const displaySum = ({
	range,
	multiplier,
	operator,
}: {
	range: number;
	multiplier: number;
	operator: OperatorDisplay;
}) =>
	operator === "+" || operator === "x"
		? `${range} ${operator} ${multiplier}`
		: `${multiplier} ${operator} ${range}`;

const calculate = ({
	range,
	multiplier,
}: {
	range: number;
	multiplier: number;
}) => ({
	"+": range + multiplier,
	"-": multiplier - range,
	x: range * multiplier,
	":": multiplier / range,
});

export const getRandomSum = (
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
