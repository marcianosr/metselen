import { World } from "../data/worlds";

export type GameState = {
	worlds: World[];
	currentWorld: number;
	currentLevel: number;
	screen: {
		current: string
	}
};

export type GameStateProps = {
	gameState: GameState;
	setGameState: (gameState: GameState) => void;
};
