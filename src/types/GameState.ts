import { Tables } from "./Tables";
import { BrickType } from "./Bricks";

export type GameState = {
	timer: number;
	rows: number;
	score: number;
	bricks: BrickType[];
	mapping: BrickType[][];
	tables: Tables[];
	answers: Tables[];
	isGameFinished: boolean;
	amountOfBricksOnField: number;
	currentAnswer: string | null;
};

export type GameStateProps = {
	gameState: GameState;
	setGameState: (gameState: GameState) => void;
};
