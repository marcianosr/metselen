import { GameStateProvider, useGameState } from "./providers/GameStateProvider";
import { LevelStateProvider } from "./providers/LevelStateProvider";
import LevelContainer from "./components/LevelContainer";
import LevelSelectScreenContainer from "./components/LevelSelectScreenContainer";
import UserDataScreen from "./components/UserDataScreen";
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
	const user = localStorage.getItem("user");

	useEffect(() => {
		if (user) {
			updateGameState("screen", { current: "levelSelection" });
		}
	}, [user]);

	return (
		<>
			{gameState.screen.current === "enterName" && <UserDataScreen />}
			{gameState.screen.current === "levelSelection" && (
				<LevelSelectScreenContainer user={JSON.parse(user || "")} />
			)}
			{gameState.screen.current === "level" && <LevelContainer />}
		</>
	);
};
