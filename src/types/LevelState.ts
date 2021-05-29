import { Tables } from "./Tables";
import { BrickType } from "./Bricks";

export type LevelState = {
	timer: number;
	rows: number;
	score: number;
	bricks: BrickType[];
	mapping: BrickType[][];
	tables: any;
	answers: Tables[];
	isGameFinished: boolean;
	amountOfBricksOnField: number;
	currentAnswer: string | null;
};

export type LevelStateProps = {
	levelState: LevelState;
	setLevelState: (levelState: LevelState) => void;
};
