import { BrickType } from "../types/Bricks";
// import { Tables } from "../types/Tables";
import { flattenBricksArray } from "../utils";
import { getRandomTable, makeTables, TableResult } from "./tables";

type Level = {
	name: string;
	level: number;
	layout: BrickType[][];
	time: number;
	ranges: {
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
	ranges: {
		multiplication: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		tables: [1],
	},
	layout: [
		[
			{ id: 1, size: "default", willDrop: true, cracked: false },
			{ id: 2, size: "default", willDrop: true, cracked: false },
			{ id: 3, size: "default", willDrop: true, cracked: false },
			{ id: 4, size: "default", willDrop: true, cracked: false },
			{ id: 5, size: "default", willDrop: true, cracked: false },
		],
		[
			{
				id: 6,
				size: "small",
				willDrop: true,
				cracked: false,
			},
			{ id: 7, size: "default", willDrop: true, cracked: false },
			{
				id: 8,
				size: "default",
				willDrop: true,
				cracked: false,
			},
			{
				id: 9,
				size: "default",
				willDrop: true,
				cracked: false,
			},
			{
				id: 10,
				size: "default",
				willDrop: true,
				cracked: false,
			},
			{
				id: 11,
				size: "small",
				willDrop: true,
				cracked: false,
			},
		],
		[
			{ id: 12, size: "default", willDrop: true, cracked: false },
			{
				id: 13,
				size: "default",
				willDrop: true,
				cracked: false,
			},
			{
				id: 14,
				size: "small",
				willDrop: true,
				cracked: false,
			},
			{ id: 15, size: "default", willDrop: true, cracked: false },
			{
				id: 16,
				size: "small",
				willDrop: true,
				cracked: false,
			},
			{
				id: 17,
				size: "default",
				willDrop: true,
				cracked: false,
			},
		],
		[
			{ id: 18, size: "default", willDrop: true, cracked: false },
			{ id: 19, size: "default", willDrop: true, cracked: false },
			{ id: 20, size: "default", willDrop: true, cracked: false },
			{ id: 21, size: "default", willDrop: true, cracked: false },
			{ id: 22, size: "default", willDrop: true, cracked: false },
		],
	],
};

const LEVEL_TWO: Level = {
	name: "",
	level: 2,
	time: 30,
	ranges: {
		multiplication: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		tables: [2],
	},
	layout: [
		[
			{ id: 1, size: "default", willDrop: true, cracked: false },
			{ id: 2, size: "default", willDrop: true, cracked: false },
			{ id: 3, size: "default", willDrop: true, cracked: false },
			{ id: 4, size: "default", willDrop: true, cracked: false },
			{ id: 5, size: "default", willDrop: true, cracked: false },
		],
		[
			{
				id: 6,
				size: "small",
				willDrop: true,
				cracked: false,
			},
			{ id: 7, size: "default", willDrop: true, cracked: false },
			{
				id: 8,
				size: "default",
				willDrop: true,
				cracked: false,
			},
			{
				id: 9,
				size: "default",
				willDrop: true,
				cracked: false,
			},
			{
				id: 10,
				size: "default",
				willDrop: true,
				cracked: false,
			},
			{
				id: 11,
				size: "small",
				willDrop: true,
				cracked: false,
			},
		],
		[
			{ id: 12, size: "default", willDrop: true, cracked: false },
			{
				id: 13,
				size: "default",
				willDrop: true,
				cracked: false,
			},
			{
				id: 14,
				size: "small",
				willDrop: true,
				cracked: false,
			},
			{ id: 15, size: "default", willDrop: true, cracked: false },
			{
				id: 16,
				size: "small",
				willDrop: true,
				cracked: false,
			},
			{
				id: 17,
				size: "default",
				willDrop: true,
				cracked: false,
			},
		],
		[
			{ id: 18, size: "default", willDrop: true, cracked: false },
			{ id: 19, size: "default", willDrop: true, cracked: false },
			{ id: 20, size: "default", willDrop: true, cracked: false },
			{ id: 21, size: "default", willDrop: true, cracked: false },
			{ id: 22, size: "default", willDrop: true, cracked: false },
		],
		[
			{ id: 23, size: "default", willDrop: true, cracked: false },
			{ id: 24, size: "default", willDrop: true, cracked: false },
			{ id: 25, size: "default", willDrop: true, cracked: false },
			{ id: 26, size: "default", willDrop: true, cracked: false },
			{ id: 27, size: "default", willDrop: true, cracked: false },
		],
	],
};

const LEVEL_THREE: Level = {
	name: "",
	level: 3,
	time: 40,
	ranges: {
		multiplication: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		tables: [1, 2],
	},
	layout: [
		[
			{ id: 1, size: "default", willDrop: true, cracked: false },
			{ id: 2, size: "default", willDrop: true, cracked: false },
			{ id: 3, size: "default", willDrop: true, cracked: false },
			{ id: 4, size: "default", willDrop: true, cracked: false },
			{ id: 5, size: "default", willDrop: true, cracked: false },
		],
		[
			{
				id: 6,
				size: "small",
				willDrop: true,
				cracked: false,
			},
			{ id: 7, size: "default", willDrop: true, cracked: false },
			{
				id: 8,
				size: "default",
				willDrop: true,
				cracked: false,
			},
			{
				id: 9,
				size: "default",
				willDrop: true,
				cracked: false,
			},
			{
				id: 10,
				size: "default",
				willDrop: true,
				cracked: false,
			},
			{
				id: 11,
				size: "small",
				willDrop: true,
				cracked: false,
			},
		],
		[
			{ id: 12, size: "default", willDrop: true, cracked: false },
			{
				id: 13,
				size: "default",
				willDrop: true,
				cracked: false,
			},
			{
				id: 14,
				size: "small",
				willDrop: true,
				cracked: false,
			},
			{ id: 15, size: "default", willDrop: true, cracked: false },
			{
				id: 16,
				size: "small",
				willDrop: true,
				cracked: false,
			},
			{
				id: 17,
				size: "default",
				willDrop: true,
				cracked: false,
			},
		],
		[
			{ id: 18, size: "default", willDrop: true, cracked: false },
			{ id: 19, size: "default", willDrop: true, cracked: false },
			{ id: 20, size: "default", willDrop: true, cracked: false },
			{ id: 21, size: "default", willDrop: true, cracked: false },
			{ id: 22, size: "default", willDrop: true, cracked: false },
		],
		[
			{ id: 23, size: "default", willDrop: true, cracked: false },
			{ id: 24, size: "default", willDrop: true, cracked: false },
			{ id: 25, size: "default", willDrop: true, cracked: false },
			{ id: 26, size: "default", willDrop: true, cracked: false },
			{ id: 27, size: "default", willDrop: true, cracked: false },
		],
	],
};

export const levelConfig: Level[] = [LEVEL_ONE, LEVEL_TWO, LEVEL_THREE];

export const withGeneratedTables = (levels: Level[]) =>
	levels.map((level) => ({
		...level,
		tables: getTablesForLevel(
			flattenBricksArray(level.layout).length,
			level.ranges
		),
	}));

const getTablesForLevel = (
	amountOfTables: number,
	ranges: { multiplication: number[]; tables: number[] }
): TableResult[] => {
	const list = [];
	for (let idx = 0; idx < amountOfTables; idx++) {
		list.push(
			getRandomTable(
				makeTables(ranges.tables, ranges.multiplication),
				ranges.tables,
				ranges.multiplication
			)
		);
	}
	return list;
};

export const levels = withGeneratedTables(levelConfig);
