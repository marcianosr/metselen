import React from "react";
import "./App.css";
import { tables, getRandomTable } from "./data/tables";
import BrickContainer from "./components/BrickContainer/BrickContainer";
import AnswerDisplay from "./components/AnswerDisplay/AnswerDisplay";
import { GameState } from "./types/GameState";

const times = 20;
const allTables = [...Array(times)].map((_, i) => ({
	id: i,
	...getRandomTable(tables),
}));

function App() {
	const [gameState, setGameState] = React.useState<GameState>({
		timer: null,
		tables: allTables,
		correctAnswers: [],
	});

	console.log("gameState:", gameState);

	return (
		<section className="gameContainer">
			<section>
				<span>
					{gameState.tables.length > 0 && gameState.tables[0].table}
				</span>
				<AnswerDisplay
					gameState={gameState}
					setGameState={setGameState}
				/>
			</section>
			<BrickContainer correctAnswers={gameState.correctAnswers} />
		</section>
	);
}

export default App;
