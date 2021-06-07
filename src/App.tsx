import { useEffect } from "react";
import { useLocalStorage } from "react-use";
import { init, track, parameters } from "insights-js";
import { GameStateProvider, useGameState } from "./providers/GameStateProvider";
import { LevelStateProvider } from "./providers/LevelStateProvider";
import LevelContainer from "./components/LevelContainer";
import LevelSelectScreenContainer from "./components/LevelSelectScreenContainer";
import UserDataScreen from "./components/UserDataScreen";
import { SaveGameState } from "./data/saveGameState";
import "./App.css";

type Config = {
	analytics: {
		development: string;
		production: string;
		test: string;
	};
};
const configs: Config = {
	analytics: {
		development: process.env.REACT_APP_INSIGHTS_API_KEY_DEV || "",
		production: process.env.REACT_APP_INSIGHTS_API_KEY_PRD || "",
		test: "",
	},
};

console.log("NODE ENV:", process.env.NODE_ENV);

function App() {
	useEffect(() => {
		init(configs.analytics[process.env.NODE_ENV]);
	}, []);

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
			updateGameState("screen", { current: "overworld" });
			track({
				id: "User registered",
				parameters: {
					browser: {
						value: window.navigator.userAgent,
					},
					username: {
						value: user.username,
					},
					screenType: parameters.screenType(),
				},
			});
		}
	}, [user]);

	return (
		<>
			{gameState.screen.current === "enterName" && <UserDataScreen />}
			{gameState.screen.current === "overworld" && (
				<LevelSelectScreenContainer />
			)}
			{gameState.screen.current === "level" && <LevelContainer />}
		</>
	);
};
