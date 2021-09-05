export type OperatorDisplay = "+" | "-" | "x" | ":";
export type Operator = "+" | "-" | "*" | "/";

export type Assignment = {
	[key: string]: Sum;
};

export enum MathAssignment {
	MULTIPLICATION = "multiplication",
	SUBTRACTION = "subtraction",
	ADDITION = "addition",
	DIVISION = "division",
}

type MathAssignmentConfig = {
	[key: string]: {
		operator: Operator;
		operatorDisplay: OperatorDisplay;
	};
};

export const mathAssignmentConfig: MathAssignmentConfig = {
	[MathAssignment.MULTIPLICATION]: {
		operator: "*",
		operatorDisplay: "x",
	},
	[MathAssignment.ADDITION]: {
		operator: "+",
		operatorDisplay: "+",
	},
};

export type Sum = {
	base: number[];
	modifier: number[];
	modifier2?: number[];
};
