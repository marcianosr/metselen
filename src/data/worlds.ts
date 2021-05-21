import { getRandomBrickColor } from "../components/BrickContainer";
import { BrickType, RandomColorType } from "../types/Bricks";

export type World = {
	name: string;
	world: number;
	brickScore: {
		current: number;
		max: number;
	};
	levels: BrickLevelType[][];
};

type BrickLevelType = Pick<BrickType, "id" | "size" | "color"> & {
	isUnlocked: boolean;
	bricksNeeded: number;
	text: string;
	color: RandomColorType;
};

export const worlds: World[] = [
	{
		name: "",
		world: 1,
		brickScore: {
			current: 0,
			max: 54,
		},
		levels: [
			[
				{
					id: 1,
					size: "default",
					isUnlocked: true,
					bricksNeeded: 0,
					text: "1",
					color: getRandomBrickColor(),
				},
				{
					id: 2,
					size: "default",
					isUnlocked: true,
					bricksNeeded: 0,
					text: "2",
					color: getRandomBrickColor(),
				},
				{
					id: 3,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 5,
					text: "1 & 2",
					color: getRandomBrickColor(),
				},
				{
					id: 4,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 12,
					text: "3",
					color: getRandomBrickColor(),
				},
				{
					id: 5,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 20,
					text: "3",
					color: getRandomBrickColor(),
				},
			],
			[
				{
					id: 6,
					size: "small",
					isUnlocked: false,
					bricksNeeded: 32,
					text: "4",
					color: getRandomBrickColor(),
				},
				{
					id: 7,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 43,
					text: "2 - 4",
					color: getRandomBrickColor(),
				},
				{
					id: 8,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 57,
					text: "5",
					color: getRandomBrickColor(),
				},
				{
					id: 9,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 70,
					text: "1 - 5",
					color: getRandomBrickColor(),
				},
				{
					id: 10,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 72,
					text: "6",
					color: getRandomBrickColor(),
				},
				{
					id: 11,
					size: "small",
					isUnlocked: false,
					bricksNeeded: 83,
					text: "7",
					color: getRandomBrickColor(),
				},
			],
			[
				{
					id: 12,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 100,
					text: "4-7",
					color: getRandomBrickColor(),
				},
				{
					id: 13,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 113,
					text: "8",
					color: getRandomBrickColor(),
				},
				{
					id: 14,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 130,
					text: "1 - 8",
					color: getRandomBrickColor(),
				},
				{
					id: 15,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 150,
					text: "9",
					color: getRandomBrickColor(),
				},
				{
					id: 16,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 175,
					text: "4 - 9",
					color: getRandomBrickColor(),
				},
			],
			[
				{
					id: 17,
					size: "small",
					isUnlocked: true,
					bricksNeeded: 0,
					text: "",
					color: getRandomBrickColor(),
				},
				{
					id: 18,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 201,
					text: "10",
					color: getRandomBrickColor(),
				},
				{
					id: 19,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 232,
					text: "5 - 10",
					color: getRandomBrickColor(),
				},
				{
					id: 20,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 265,
					text: "3 - 10",
					color: getRandomBrickColor(),
				},
				{
					id: 21,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 285,
					text: "2 - 9",
					color: getRandomBrickColor(),
				},
				{
					id: 22,
					size: "small",
					isUnlocked: true,
					bricksNeeded: 0,
					text: "",
					color: getRandomBrickColor(),
				},
			],
			[
				{
					id: 23,
					size: "large",
					isUnlocked: true,
					bricksNeeded: 300,
					text: "1 - 10",
					color: getRandomBrickColor(),
				},
			],
		],
	},
];
