import { useState } from "react";
import GameContainer from "./components/LevelContainer";
import LevelSelectScreenContainer from "./components/LevelSelectScreenContainer";
import { LevelStateProvider } from "./providers/LevelStateProvider";
import "./App.css";

function App() {
	const [showGame, setShowGame] = useState(false);
	return (
		<LevelStateProvider>
			<button onClick={() => setShowGame(!showGame)}>Toggle mode</button>
			{showGame && <GameContainer />}
			{!showGame && <LevelSelectScreenContainer />}
		</LevelStateProvider>
	);
}

export default App;
