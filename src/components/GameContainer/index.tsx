import { useEffect } from "react";
import { useGameState } from "../../providers/GameStateProvider";
import useTimer from "../../hooks/useTimer";

import BrickContainer from "../BrickContainer";
import TableAnswerDisplay from "../TableAnswerDisplay";
import Modal from "../Modal";

import styles from "./styles.module.css";

const GameContainer = () => {
	const { gameState, onResetGame, updateGameState } = useGameState();
	const { stopTimer, timerFinished, timer, resetTimer } = useTimer(
		gameState.timer
	);
	const allTablesCompleted = gameState.tables.length === 0;

	useEffect(() => {
		if (allTablesCompleted || timerFinished) {
			updateGameState("isGameFinished", true);
			stopTimer();
		}
	}, [allTablesCompleted, timerFinished]);

	return (
		<section className="gameContainer">
			<>
				<section className={styles.gameInfoContainer}>
					<ul className={styles.pointsList}>
						<li className={styles.points}>Punten</li>
						<li className={styles.points}>Punten</li>
					</ul>
					<TableAnswerDisplay />
					<strong className={styles.timer}>{timer}</strong>
				</section>
				{!gameState.isGameFinished && <BrickContainer />}
				<h1>Punten: {gameState.score}</h1>
				<h1>Rijen: {gameState.rows}</h1>
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
