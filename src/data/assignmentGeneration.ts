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
	baseRange: number[],
	modifierRange: number[],
	assignmentType: MathAssignment
): AssignmentFormat[][] => {
	return baseRange.map((base) =>
		modifierRange.map((modifier) => ({
			sum: displaySum({
				base,
				modifier,
				operator: mathAssignmentConfig[assignmentType].operatorDisplay,
			}),
			result: calculate({ base, modifier })[
				mathAssignmentConfig[assignmentType].operatorDisplay
			],
			correct: "untouched",
		}))
	);
};

const displaySum = ({
	base,
	modifier,
	operator,
}: {
	base: number;
	modifier: number;
	operator: OperatorDisplay;
}) =>
	operator === "+" || operator === "x"
		? `${base} ${operator} ${modifier}`
		: `${modifier} ${operator} ${base}`;

const calculate = ({ base, modifier }: { base: number; modifier: number }) => ({
	"+": base + modifier,
	"-": modifier - base,
	x: base * modifier,
	":": modifier / base,
});

export const getRandomSum = (
	assignmentFormat: AssignmentFormat[][],
	baseRange: number[],
	modifierRange: number[]
): AssignmentFormat => {
	const randomNumberForRow: number = Math.floor(
		Math.random() * baseRange.length
	);
	const randomNumberForCell: number = Math.floor(
		Math.random() * modifierRange.length
	);

	return assignmentFormat[randomNumberForRow][randomNumberForCell];
};
