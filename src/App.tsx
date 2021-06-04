import { useLocalStorage } from "react-use";
import { GameStateProvider, useGameState } from "./providers/GameStateProvider";
import { LevelStateProvider } from "./providers/LevelStateProvider";
import LevelContainer from "./components/LevelContainer";
import LevelSelectScreenContainer from "./components/LevelSelectScreenContainer";
import UserDataScreen from "./components/UserDataScreen";
import { SaveGameState } from "./data/saveGameState";
import "./App.css";
import { useEffect } from "react";

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
	const { gameState, updateGameState } = useGameState();
	const [user] = useLocalStorage<SaveGameState>("saveGameState");

	useEffect(() => {
		if (user?.username) {
			updateGameState("screen", { current: "levelSelection" });
		}
	}, [user]);

	return (
		<>
			{gameState.screen.current === "enterName" && <UserDataScreen />}
			{gameState.screen.current === "levelSelection" && (
				<LevelSelectScreenContainer />
			)}
			{gameState.screen.current === "level" && <LevelContainer />}
		</>
	);
};
