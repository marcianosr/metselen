import { BrickType } from "../types/Bricks";

type Level = {
	name: string;
	level: number;
	layout: BrickType[][];
};

// Refactor later: Merge these properties of levels with the levels arr in worlds object

const LEVEL_ONE: Level = {
	name: "",
	level: 1,
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

export const levels: Level[] = [LEVEL_ONE, LEVEL_TWO];
