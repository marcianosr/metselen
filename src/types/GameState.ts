import { Tables } from "./Tables";

export type GameState = {
	timer: any;
	tables: Tables[];
	correctAnswers: Tables[];
};

export type GameStateProps = {
	gameState: GameState;
	setGameState: (gameState: GameState) => void;
};
