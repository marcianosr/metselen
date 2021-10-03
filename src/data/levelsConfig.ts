import { Assignment, MathAssignment } from "../types/Assignment";
import { BrickType } from "../types/Bricks";
import { flattenBricksArray } from "../utils";
import { getRandomSum, createSumMapping, AssignmentFormat } from "./tables";

const levelFiles = require.context("./levels/", false, /\.(json)$/);

const allLevels = levelFiles.keys().map((file) => {
	const filename = file.replace("./", "");
	const data = require(`./levels/${filename}`);

	return data;
});

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

export const levelConfig: Level[] = allLevels.map((level) => level.data);

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
	const key = Object.keys(assignments)[0] as MathAssignment;

	for (let idx = 0; idx < amountOfSums; idx++) {
		assignmentFormatList.push(
			getRandomSum(
				createSumMapping(
					assignments[key]?.base || [],
					assignments[key]?.modifier || [],
					key
				),
				assignments[key]?.base || [],
				assignments[key]?.modifier || []
			)
		);
	}
	return assignmentFormatList;
};

export const levels = withGeneratedSums(levelConfig);

console.log(levels);
