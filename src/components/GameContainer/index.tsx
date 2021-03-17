import { useEffect, useRef } from "react";
import { useGameState } from "../../providers/GameStateProvider";

import BrickContainer from "../BrickContainer";
import TableAnswerDisplay from "../TableAnswerDisplay";
import Modal from "../Modal";

const GameContainer = () => {
	const { gameState, setGameState, onResetGame } = useGameState();
	const timerRef = useRef<number | null>(null);
	const allTablesCompleted = gameState.tables.length === 0;

	useEffect(() => {
		if (allTablesCompleted) {
			setGameState({
				...gameState,
				isGameFinished: true,
			});
		}
	}, [allTablesCompleted]);

	useEffect(() => {
		timerRef.current = window.setTimeout(() => {
			setGameState({
				...gameState,
				timer: gameState.timer - 1,
			});
		}, 1000);

		if (gameState.timer === 0) {
			stopTimer();
			setGameState({
				...gameState,
				isGameFinished: true,
			});
		}

		return () => stopTimer();
	}, [gameState.timer]);

	const stopTimer = () => window.clearTimeout(timerRef.current || 0);

	return (
		<section className="gameContainer">
			<>
				<h1>Tijd: {gameState.timer}</h1>
				<TableAnswerDisplay />
				<BrickContainer />
			</>
			{gameState.isGameFinished && (
				<Modal>
					<button onClick={() => onResetGame()}>Play again!</button>
				</Modal>
			)}
		</section>
	);
};

export default GameContainer;
