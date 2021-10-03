export type OperatorDisplay = "+" | "-" | "x" | ":";
export type Operator = "+" | "-" | "*" | "/";

export type AssignmentSettings = {
	[key in MathAssignment]?: SumStructure;
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
	[MathAssignment.SUBTRACTION]: {
		operator: "-",
		operatorDisplay: "-",
	},
	[MathAssignment.DIVISION]: {
		operator: "/",
		operatorDisplay: ":",
	},
};

export type SumStructure = {
	base: number[];
	modifier: number[];
	modifier2?: number[];
};
