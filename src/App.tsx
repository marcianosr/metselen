import GameContainer from "./components/GameContainer";
import { GameStateProvider } from "./providers/GameStateProvider";
import "./App.css";

function App() {
	return (
		<GameStateProvider>
			<GameContainer />
		</GameStateProvider>
	);
}

export default App;
