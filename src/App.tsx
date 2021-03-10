import React, { useEffect } from "react";
import { GameStateProvider } from "./providers/GameStateProvider";
import "./App.css";
import { tables, getRandomTable } from "./data/tables";
import { GameState } from "./types/GameState";

import BrickContainer from "./components/BrickContainer";
import TableAnswerDisplay from "./components/TableAnswerDisplay";
import Modal from "./components/Modal";

const times = 6; // sould be leading for the generation of bricks
const allTables = [...Array(times)].map((_, i) => ({
	id: i + 1,
	...getRandomTable(tables),
}));

const INITIAL_GAME_STATE: GameState = {
	timer: null,
	tables: allTables,
	correctAnswers: [],
	isGameFinished: false,
};

const onResetGame = (setGameState: (gameState: GameState) => void) =>
	setGameState({ ...INITIAL_GAME_STATE });

function App() {
	const [gameState, setGameState] = React.useState<GameState>({
		...INITIAL_GAME_STATE,
	});
	const allTablesCompleted = gameState.tables.length === 0;

	useEffect(() => {
		if (allTablesCompleted) {
			setGameState({
				...gameState,
				isGameFinished: true,
			});
		}
	}, [allTablesCompleted]);

	return (
		<GameStateProvider>
			<section className="gameContainer">
				{!gameState.isGameFinished ? (
					<>
						<TableAnswerDisplay />
						<BrickContainer />
					</>
				) : (
					<Modal>
						<button onClick={() => onResetGame(setGameState)}>
							Play again
						</button>
					</Modal>
				)}
			</section>
		</GameStateProvider>
	);
}

export default App;
