import { useEffect } from "react";
import { useGameState } from "../../providers/GameStateProvider";
import useTimer from "../../hooks/useTimer";

import BrickContainer from "../BrickContainer";
import TableAnswerDisplay from "../TableAnswerDisplay";
import Modal from "../Modal";

const GameContainer = () => {
	const { gameState, setGameState, onResetGame } = useGameState();
	const { stopTimer, timerFinished, timer, resetTimer } = useTimer(
		gameState.timer
	);
	const allTablesCompleted = gameState.tables.length === 0;

	useEffect(() => {
		if (allTablesCompleted || timerFinished) {
			setGameState({
				...gameState,
				isGameFinished: true,
			});
			stopTimer();
		}
	}, [allTablesCompleted, timerFinished]);

	return (
		<section className="gameContainer">
			<>
				<h1>Tijd: {timer}</h1>
				<TableAnswerDisplay />
				{!gameState.isGameFinished && <BrickContainer />}
				{/* <h1>Punten: {gameState.score}</h1> */}
			</>
			{gameState.isGameFinished && (
				<Modal>
					<button
						onClick={() => {
							onResetGame();
							resetTimer();
						}}
					>
						Play again!
					</button>
				</Modal>
			)}
		</section>
	);
};

export default GameContainer;
