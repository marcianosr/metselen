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
					isUnlocked: true,
					bricksNeeded: 5,
					text: "3",
					color: getRandomBrickColor(),
				},
				{
					id: 4,
					size: "default",
					isUnlocked: true,
					bricksNeeded: 0,
					text: "4",
					color: getRandomBrickColor(),
				},
				{
					id: 5,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 0,
					text: "5",
					color: getRandomBrickColor(),
				},
			],
			[
				{
					id: 6,
					size: "small",
					isUnlocked: false,
					bricksNeeded: 5,
					text: "6",
					color: getRandomBrickColor(),
				},
				{
					id: 7,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 0,
					text: "5",
					color: getRandomBrickColor(),
				},
				{
					id: 8,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 0,
					text: "5",
					color: getRandomBrickColor(),
				},
				{
					id: 9,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 0,
					text: "5",
					color: getRandomBrickColor(),
				},
				{
					id: 10,
					size: "default",
					isUnlocked: false,
					bricksNeeded: 0,
					text: "5",
					color: getRandomBrickColor(),
				},
				{
					id: 11,
					size: "small",
					isUnlocked: false,
					bricksNeeded: 5,
					text: "6",
					color: getRandomBrickColor(),
				},
			],
		],
	},
];
