import { useEffect } from "react";
import { useLocalStorage } from "react-use";
import { track } from "insights-js";

import { SaveGameState, SaveGameStateLevel } from "../../data/saveGameState";

import { useGameState } from "../../providers/GameStateProvider";
import { useLevelState } from "../../providers/LevelStateProvider";
import useTimer from "../../hooks/useTimer";

import BrickContainer from "../BrickContainer";
import TableAnswerDisplay from "../TableAnswerDisplay";
import PlayAgainModal from "../PlayAgainModal";

import styles from "./styles.module.css";

const LevelContainer = () => {
	const { levelState, updateLevelState } = useLevelState();
	const { stopTimer, timerFinished, timer, resetTimer } = useTimer(
		levelState.timer
	);
	const {
		gameState: { currentLevel },
	} = useGameState();
	const [savedGameState, setSavedGameState] =
		useLocalStorage<SaveGameState>("saveGameState");

	const allAssignmentsCompleted = levelState.assignments.length === 0;
	const user = savedGameState?.username || "";

	const saveLevelDataToStorage = () => {
		const levelsFromStorage = [...(savedGameState?.worlds?.levels || [])];

		track({
			id: `Level scores from ${user}`,
			parameters: {
				highScore: {
					value:
						levelsFromStorage[currentLevel - 1].score.toString() ||
						"",
				},
				attemptedScore: {
					value: levelState.score.toString() || "",
				},
			},
		});

		setSavedGameState({
			...savedGameState,
			worlds: {
				...savedGameState?.worlds,
				levels: updateSaveDataForLevel(levelsFromStorage),
				score: updateWorldScore(levelsFromStorage),
			},
		});
	};

	const createSaveDataForLevel = (levels: SaveGameStateLevel[]) => [
		...levels,
		{ current: currentLevel, score: levelState.score },
	];

	const updateSaveDataForLevel = (levels: SaveGameStateLevel[]) => {
		const isNewHighscore =
			levels[currentLevel - 1].score <= levelState.score;

		if (!isNewHighscore) return levels;

		levels[currentLevel - 1].score = levelState.score;
		levels[currentLevel - 1].current = currentLevel;

		return levels;
	};

	const updateWorldScore = (levels: SaveGameStateLevel[]) =>
		levels.reduce((totalScore, level) => totalScore + level.score, 0);

	useEffect(() => {
		if (allAssignmentsCompleted || timerFinished) {
			updateLevelState("isGameFinished", true);
			stopTimer();
			saveLevelDataToStorage();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allAssignmentsCompleted, timerFinished]);

	useEffect(() => {
		const levelsFromStorage = [...(savedGameState?.worlds?.levels || [])];

		const levelAlreadyExists = levelsFromStorage.find(
			(level) => level.current === currentLevel
		);

		if (levelAlreadyExists) return;

		track({
			id: "Started level",
			parameters: {
				[`level-${currentLevel}`]: {
					value: savedGameState?.username || "",
				},
			},
		});

		setSavedGameState({
			...savedGameState,
			worlds: {
				...savedGameState?.worlds,
				levels: createSaveDataForLevel(levelsFromStorage),
				score: updateWorldScore(levelsFromStorage),
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
					{!allAssignmentsCompleted && <TableAnswerDisplay />}
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
				<PlayAgainModal
					stopTimer={stopTimer}
					resetTimer={resetTimer}
					timerFinished={timerFinished}
				/>
			)}
		</section>
	);
};

export default LevelContainer;
