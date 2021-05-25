import { useEffect } from "react";
import { useLevelState } from "../../providers/LevelStateProvider";
import useTimer from "../../hooks/useTimer";

import BrickContainer from "../BrickContainer";
import TableAnswerDisplay from "../TableAnswerDisplay";
import Modal from "../Modal";

import styles from "./styles.module.css";
import { useGameState } from "../../providers/GameStateProvider";

const LevelContainer = () => {
	const { levelState, onResetLevel, updateLevelState } = useLevelState();
	const { stopTimer, timerFinished, timer, resetTimer } = useTimer(
		levelState.timer
	);
	const {
		gameState: { currentLevel },
	} = useGameState();
	const allTablesCompleted = levelState.tables.length === 0;

	useEffect(() => {
		if (allTablesCompleted || timerFinished) {
			updateLevelState("isGameFinished", true);
			stopTimer();
		}
	}, [allTablesCompleted, timerFinished]);

	return (
		<section className={styles.levelContainer}>
			<>
				<section className={styles.gameInfoContainer}>
					<ul className={styles.pointsList}>
						{/* <li className={styles.points}>Punten</li> */}
						<li className={styles.points}>
							<span>{levelState.score}</span>
							<span>punten</span>
						</li>
						<li className={styles.points}>
							<span>{levelState.rows}</span>
							<span>rijen</span>
						</li>
					</ul>
					<TableAnswerDisplay />
					<section className={styles.timerAndLevel}>
						<span className={styles.levelText}>
							Level{" "}
							<span className={styles.levelNumber}>
								{currentLevel}
							</span>
						</span>
						<strong className={styles.timer}>{timer}</strong>
					</section>
				</section>
				{!levelState.isGameFinished && <BrickContainer />}
			</>
			{levelState.isGameFinished && (
				<Modal>
					<button
						onClick={() => {
							onResetLevel();
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

export default LevelContainer;
