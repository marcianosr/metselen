import { MathAssignment, Assignment } from "../types/Assignment";
import { BrickType } from "../types/Bricks";
import { flattenBricksArray } from "../utils";
import { getRandomTable, makeTables, AssignmentFormat } from "./tables";

export type Level = {
	name: string;
	level: number;
	layout: BrickType[][];
	time: number;
	assignments: Assignment;
};

// keyof returns a union string, so: We want a key in Assignment and Maths type which returns "maths" and .MULTIPLICATIONs | additions | subtractions | divisions"
// type MathsConfig = {
// 	[key in keyof Assignment]: {};
// };

// Refactor later: Merge these properties of levels with the levels arr in worlds object
const LEVEL_ONE: Level = {
	name: "",
	level: 1,
	time: 30,
	assignments: {
		[MathAssignment.MULTIPLICATION]: {
			base: [1],
			modifier: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		},
	},
	layout: [
		[
			{ id: 1, size: "medium", willDrop: true, cracked: false },
			{ id: 2, size: "medium", willDrop: true, cracked: false },
			{ id: 3, size: "medium", willDrop: true, cracked: false },
			{ id: 4, size: "medium", willDrop: true, cracked: false },
			{ id: 5, size: "medium", willDrop: true, cracked: false },
		],
		[
			{
				id: 6,
				size: "verySmall",
				willDrop: true,
				cracked: false,
			},
			{ id: 7, size: "medium", willDrop: true, cracked: false },
			{
				id: 8,
				size: "medium",
				willDrop: true,
				cracked: false,
			},
			{
				id: 9,
				size: "medium",
				willDrop: true,
				cracked: false,
			},
			{
				id: 10,
				size: "medium",
				willDrop: true,
				cracked: false,
			},
			{
				id: 11,
				size: "verySmall",
				willDrop: true,
				cracked: false,
			},
		],
		[
			{ id: 12, size: "medium", willDrop: true, cracked: false },
			{
				id: 13,
				size: "medium",
				willDrop: true,
				cracked: false,
			},
			{
				id: 14,
				size: "verySmall",
				willDrop: true,
				cracked: false,
			},
			{ id: 15, size: "medium", willDrop: true, cracked: false },
			{
				id: 16,
				size: "verySmall",
				willDrop: true,
				cracked: false,
			},
			{
				id: 17,
				size: "medium",
				willDrop: true,
				cracked: false,
			},
		],
		[
			{ id: 18, size: "medium", willDrop: true, cracked: false },
			{ id: 19, size: "medium", willDrop: true, cracked: false },
			{ id: 20, size: "medium", willDrop: true, cracked: false },
			{ id: 21, size: "medium", willDrop: true, cracked: false },
			{ id: 22, size: "medium", willDrop: true, cracked: false },
		],
	],
};

const LEVEL_TWO: Level = {
	name: "",
	level: 2,
	time: 30,
	assignments: {
		[MathAssignment.MULTIPLICATION]: {
			base: [2],
			modifier: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		},
	},
	layout: [
		[
			{ id: 1, size: "medium", willDrop: true, cracked: false },
			{ id: 2, size: "medium", willDrop: true, cracked: false },
			{ id: 3, size: "medium", willDrop: true, cracked: false },
			{ id: 4, size: "medium", willDrop: true, cracked: false },
			{ id: 5, size: "medium", willDrop: true, cracked: false },
		],
		[
			{
				id: 6,
				size: "verySmall",
				willDrop: true,
				cracked: false,
			},
			{ id: 7, size: "medium", willDrop: true, cracked: false },
			{
				id: 8,
				size: "medium",
				willDrop: true,
				cracked: false,
			},
			{
				id: 9,
				size: "medium",
				willDrop: true,
				cracked: false,
			},
			{
				id: 10,
				size: "medium",
				willDrop: true,
				cracked: false,
			},
			{
				id: 11,
				size: "verySmall",
				willDrop: true,
				cracked: false,
			},
		],
		[
			{ id: 12, size: "medium", willDrop: true, cracked: false },
			{
				id: 13,
				size: "medium",
				willDrop: true,
				cracked: false,
			},
			{
				id: 14,
				size: "verySmall",
				willDrop: true,
				cracked: false,
			},
			{ id: 15, size: "medium", willDrop: true, cracked: false },
			{
				id: 16,
				size: "verySmall",
				willDrop: true,
				cracked: false,
			},
			{
				id: 17,
				size: "medium",
				willDrop: true,
				cracked: false,
			},
		],
		[
			{ id: 18, size: "medium", willDrop: true, cracked: false },
			{ id: 19, size: "medium", willDrop: true, cracked: false },
			{ id: 20, size: "medium", willDrop: true, cracked: false },
			{ id: 21, size: "medium", willDrop: true, cracked: false },
			{ id: 22, size: "medium", willDrop: true, cracked: false },
		],
		[
			{ id: 23, size: "medium", willDrop: true, cracked: false },
			{ id: 24, size: "medium", willDrop: true, cracked: false },
			{ id: 25, size: "medium", willDrop: true, cracked: false },
			{ id: 26, size: "medium", willDrop: true, cracked: false },
			{ id: 27, size: "medium", willDrop: true, cracked: false },
		],
	],
};

const LEVEL_THREE: Level = {
	name: "",
	level: 3,
	time: 40,
	assignments: {
		[MathAssignment.MULTIPLICATION]: {
			base: [1, 2],
			modifier: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		},
	},
	layout: [
		[
			{ id: 1, size: "medium", willDrop: true, cracked: false },
			{ id: 2, size: "medium", willDrop: true, cracked: false },
			{ id: 3, size: "medium", willDrop: true, cracked: false },
			{ id: 4, size: "medium", willDrop: true, cracked: false },
			{ id: 5, size: "medium", willDrop: true, cracked: false },
		],
		[
			{
				id: 6,
				size: "verySmall",
				willDrop: true,
				cracked: false,
			},
			{ id: 7, size: "medium", willDrop: true, cracked: false },
			{
				id: 8,
				size: "medium",
				willDrop: true,
				cracked: false,
			},
			{
				id: 9,
				size: "medium",
				willDrop: true,
				cracked: false,
			},
			{
				id: 10,
				size: "medium",
				willDrop: true,
				cracked: false,
			},
			{
				id: 11,
				size: "verySmall",
				willDrop: true,
				cracked: false,
			},
		],
		[
			{ id: 12, size: "medium", willDrop: true, cracked: false },
			{
				id: 13,
				size: "medium",
				willDrop: true,
				cracked: false,
			},
			{
				id: 14,
				size: "verySmall",
				willDrop: true,
				cracked: false,
			},
			{ id: 15, size: "medium", willDrop: true, cracked: false },
			{
				id: 16,
				size: "verySmall",
				willDrop: true,
				cracked: false,
			},
			{
				id: 17,
				size: "medium",
				willDrop: true,
				cracked: false,
			},
		],
		[
			{ id: 18, size: "medium", willDrop: true, cracked: false },
			{ id: 19, size: "medium", willDrop: true, cracked: false },
			{ id: 20, size: "medium", willDrop: true, cracked: false },
			{ id: 21, size: "medium", willDrop: true, cracked: false },
			{ id: 22, size: "medium", willDrop: true, cracked: false },
		],
		[
			{ id: 23, size: "medium", willDrop: true, cracked: false },
			{ id: 24, size: "medium", willDrop: true, cracked: false },
			{ id: 25, size: "medium", willDrop: true, cracked: false },
			{ id: 26, size: "medium", willDrop: true, cracked: false },
			{ id: 27, size: "medium", willDrop: true, cracked: false },
		],
	],
};

export const levelConfig: Level[] = [LEVEL_ONE, LEVEL_TWO, LEVEL_THREE];

// Make more dynamic: Based on the input of assignments
export const withGeneratedSums = (levels: Level[]) =>
	levels.map((level: Level) => ({
		...level,
		// Change "tables" here in Level type when changing this
		tables: createSumsForLevel(
			flattenBricksArray(level.layout).length,
			level.assignments
		),
	}));

const createSumsForLevel = (
	amountOfSums: number, // based on the the length of the level
	assignments: Assignment
) => {
	const assignmentFormatList: AssignmentFormat[] = [];
	for (let idx = 0; idx < amountOfSums; idx++) {
		assignmentFormatList.push(
			getRandomTable(
				makeTables(
					assignments.multiplication.base,
					assignments.multiplication?.modifier
				),
				assignments.multiplication?.base,
				assignments.multiplication?.modifier
			)
		);
	}
	return assignmentFormatList;
};

export const levels = withGeneratedSums(levelConfig);

console.log(levels);
