import { Tables } from "./Tables";
import { BrickType } from "./Bricks"

export type GameState = {
	timer: number;
	rows: number;
	score: number;
	bricks: BrickType[];
	mapping: BrickType[][];
	tables: Tables[];
	correctAnswers: Tables[];
	isGameFinished: boolean;
};

export type GameStateProps = {
	gameState: GameState;
	setGameState: (gameState: GameState) => void;
};
