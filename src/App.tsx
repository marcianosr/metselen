import { GameStateProvider, useGameState } from "./providers/GameStateProvider";
import { LevelStateProvider } from "./providers/LevelStateProvider";
import LevelContainer from "./components/LevelContainer";
import LevelSelectScreenContainer from "./components/LevelSelectScreenContainer";
import UserDataScreen from "./components/UserDataScreen";
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
			{gameState.screen.current === "enterName" && (
				<UserDataScreen />
			)}
			{gameState.screen.current === "levelSelection" && (
				<LevelSelectScreenContainer />
			)}
			{gameState.screen.current === "level" && <LevelContainer />}

		</>
	);
};
