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
import EditorScreen from "./editor/components/EditorScreen";

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
		if (process.env.NODE_ENV === "production")
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<>
			{gameState.mode === "game" && (
				<>
					{gameState.screen.current === "enterName" && (
						<UserDataScreen />
					)}
					{gameState.screen.current === "overworld" && (
						<LevelSelectScreenContainer />
					)}
					{gameState.screen.current === "level" && <LevelContainer />}
				</>
			)}

			{gameState.mode === "editor" && <EditorScreen />}
		</>
	);
};

export const ModeManager: React.FC = ({ children }) => {
	const { gameState, updateGameState } = useGameState();

	return (
		<>
			<button
				onClick={() =>
					gameState.mode === "game"
						? updateGameState("mode", "editor")
						: updateGameState("mode", "game")
				}
			>
				Switch to {gameState.mode === "game" ? "editor" : "game"}
			</button>

			{children}
		</>
	);
};
