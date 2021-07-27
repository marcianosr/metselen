import { World } from "../data/worldsConfig";

type AppModes = "editor" | "game";

type GameScreens = "enterName" | "overworld" | "level";
type EditorScreens = "files" | "editor";

type AppScreens = {
	game?: GameScreens;
	editor?: EditorScreens;
};

export type GameState = {
	worlds: World[];
	currentWorld: number;
	currentLevel: number;
	screen: AppScreens; 
	mode: AppModes;
};

export type GameStateProps = {
	gameState: GameState;
	setGameState: (gameState: GameState) => void;
};
