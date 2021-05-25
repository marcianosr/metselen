import LevelContainer from "./components/LevelContainer";
import LevelSelectScreenContainer from "./components/LevelSelectScreenContainer";
import { LevelStateProvider } from "./providers/LevelStateProvider";
import { GameStateProvider, useGameState } from "./providers/GameStateProvider";
import "./App.css";

function App() {
	return (
		<GameStateProvider>
			<LevelStateProvider>
				<ScreenManager />
			</LevelStateProvider>
		</GameStateProvider>
	);
}

export default App;

const ScreenManager = () => {
	const { gameState } = useGameState();

	return (
		<>
			{gameState.screen.current === "level" && <LevelContainer />}
			{gameState.screen.current === "levelSelection" && (
				<LevelSelectScreenContainer />
			)}
		</>
	);
};
