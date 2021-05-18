import { useState } from "react";
import GameContainer from "./components/GameContainer";
import LevelSelectScreenContainer from "./components/LevelSelectScreenContainer";
import { GameStateProvider } from "./providers/GameStateProvider";
import "./App.css";

function App() {
	const [showGame, setShowGame] = useState(false);
	return (
		<GameStateProvider>
			<button onClick={() => setShowGame(!showGame)}>Toggle mode</button>
			{showGame && <GameContainer />}
			{!showGame && <LevelSelectScreenContainer />}
		</GameStateProvider>
	);
}

export default App;
