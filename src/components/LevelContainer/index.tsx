import { useEffect } from "react";
import { useLocalStorage } from "react-use";
import { SaveGameState, SaveGameStateLevel } from "../../data/saveGameState";

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
	const [savedGameState, setSavedGameState] =
		useLocalStorage<SaveGameState>("saveGameState");

	const allTablesCompleted = levelState.tables.length === 0;

	const saveLevelDataToStorage = () => {
		const levelsFromStorage = [...(savedGameState?.worlds?.levels || [])];

		setSavedGameState({
			...savedGameState,
			worlds: {
				levels: levelsFromStorage[currentLevel - 1]
					? updateSaveDataForLevel(levelsFromStorage)
					: createSaveDataForLevel(levelsFromStorage),
			},
		});
	};

	const createSaveDataForLevel = (levels: SaveGameStateLevel[]) => [
		...levels,
		{ current: currentLevel, score: levelState.score },
	];

	const updateSaveDataForLevel = (levels: SaveGameStateLevel[]) => {
		levels[currentLevel - 1].score = levelState.score;
		levels[currentLevel - 1].current = currentLevel;

		return levels;
	};

	useEffect(() => {
		if (allTablesCompleted || timerFinished) {
			updateLevelState("isGameFinished", true);
			stopTimer();
			saveLevelDataToStorage();
		}
	}, [allTablesCompleted, timerFinished]);

	return (
		<section className={styles.levelContainer}>
			<>
				<section className={styles.gameInfoContainer}>
					<ul className={styles.pointsList}>
						<li className={styles.points}>
							<span>{levelState.score}</span>
							<span>punten</span>
						</li>
						<li className={styles.points}>
							<span>{levelState.rows}</span>
							<span>rijen</span>
						</li>
					</ul>
					{!allTablesCompleted && <TableAnswerDisplay />}
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
