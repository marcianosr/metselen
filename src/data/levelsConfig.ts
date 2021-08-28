import { BrickType } from "../types/Bricks";
// import { Tables } from "../types/Tables";
import { flattenBricksArray } from "../utils";
import { getRandomTable, makeTables, TableResult } from "./tables";

export type Level = {
	name: string;
	level: number;
	layout: BrickType[][];
	time: number;
	assignments: {
		multiplication: number[];
		tables: number[];
	};
	// tables: Tables[]
};

// Refactor later: Merge these properties of levels with the levels arr in worlds object

const LEVEL_ONE: Level = {
	name: "",
	level: 1,
	time: 30,
	assignments: {
		multiplication: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		tables: [1],
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
		multiplication: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		tables: [2],
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
		multiplication: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		tables: [1, 2],
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

export const withGeneratedTables = (levels: Level[]) =>
	levels.map((level) => ({
		...level,
		tables: getTablesForLevel(
			flattenBricksArray(level.layout).length,
			level.assignments
		),
	}));

const getTablesForLevel = (
	amountOfTables: number,
	assignments: { multiplication: number[]; tables: number[] }
): TableResult[] => {
	const list = [];
	for (let idx = 0; idx < amountOfTables; idx++) {
		list.push(
			getRandomTable(
				makeTables(assignments.tables, assignments.multiplication),
				assignments.tables,
				assignments.multiplication
			)
		);
	}
	return list;
};

export const levels = withGeneratedTables(levelConfig);
