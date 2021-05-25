import { World } from "../data/worlds";

export type GameState = {
	worlds: World[];
	currentLevel: number;
	screen: {
		current: string
	}
};

export type GameStateProps = {
	gameState: GameState;
	setGameState: (gameState: GameState) => void;
};
