import { TableResult } from "../data/tables";

export type Tables = TableResult & {
	id: number;
};

export type GameState = {
	timer: any;
	tables: Tables[];
	correctAnswers: Tables[];
};

export type GameStateProps = {
	gameState: GameState;
	setGameState: (gameState: GameState) => void;
};
