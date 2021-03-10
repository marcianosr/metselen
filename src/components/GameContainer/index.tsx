import { useEffect } from "react";
import { useGameState } from "../../providers/GameStateProvider";

import BrickContainer from "../BrickContainer";
import TableAnswerDisplay from "../TableAnswerDisplay";
import Modal from "../Modal";

const GameContainer = () => {
	const { gameState, setGameState, onResetGame } = useGameState();

	const allTablesCompleted = gameState.tables.length === 0;

	useEffect(() => {
		if (allTablesCompleted) {
			setGameState({
				...gameState,
				isGameFinished: true,
			});
		}
	}, [allTablesCompleted]);

	return (
		<section className="gameContainer">
			{!gameState.isGameFinished ? (
				<>
					<TableAnswerDisplay />
					<BrickContainer />
				</>
			) : (
				<Modal>
					<button onClick={() => onResetGame()}>Play again!</button>
				</Modal>
			)}
		</section>
	);
};

export default GameContainer;
