import { Tables } from "./Tables";

export type GameState = {
	timer: number;
	score: number;
	tables: Tables[];
	correctAnswers: Tables[];
	isGameFinished: boolean;
};

export type GameStateProps = {
	gameState: GameState;
	setGameState: (gameState: GameState) => void;
};
