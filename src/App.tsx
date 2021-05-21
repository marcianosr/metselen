import { useState } from "react";
import GameContainer from "./components/LevelContainer";
import LevelSelectScreenContainer from "./components/LevelSelectScreenContainer";
import { LevelStateProvider } from "./providers/LevelStateProvider";
import "./App.css";
import { GameStateProvider } from "./providers/GameStateProvider";

function App() {
	const [showGame, setShowGame] = useState(false);
	return (
		<GameStateProvider>
			<LevelStateProvider>
				<button onClick={() => setShowGame(!showGame)}>
					Toggle mode
				</button>
				{showGame && <GameContainer />}
				{!showGame && <LevelSelectScreenContainer />}
			</LevelStateProvider>
		</GameStateProvider>
	);
}

export default App;
