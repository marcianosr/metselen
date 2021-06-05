import { v4 as uuidv4 } from "uuid";

export type SaveGameStateLevel = {
	score: number;
	current: number;
};

export type SaveGameStateWorld = {
	score?: number;
	current?: number;
	levels?: SaveGameStateLevel[];
};

export type SaveGameState = {
	id?: string;
	username?: string;
	worlds: SaveGameStateWorld;
};

export const INITIAL_SAVE_GAME_DATA: SaveGameState = {
	id: uuidv4(),
	username: "",
	worlds: {
		current: 1,
		score: 0,
		levels: [
			{
				current: 1,
				score: 0,
			},
		],
	},
};
