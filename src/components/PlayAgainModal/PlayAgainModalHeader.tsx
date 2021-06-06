import React from "react";
import { useGameState } from "../../providers/GameStateProvider";
import { useLevelState } from "../../providers/LevelStateProvider";
import styles from "./styles.module.css";

type PlayAgainModalHeaderProps = {
	storedHighscore: number;
	timerFinished: boolean;
	allTablesCompleted: boolean;
};

const PlayAgainModalHeader: React.FC<PlayAgainModalHeaderProps> = ({
	storedHighscore,
	allTablesCompleted,
	timerFinished,
}) => {
	const { levelState } = useLevelState();
	const {
		gameState: { currentLevel },
	} = useGameState();

	return (
		<header>
			{(timerFinished && !allTablesCompleted) ||
				(timerFinished && allTablesCompleted && (
					<>
						<h1 className={styles.title}>Game over!</h1>
						<span className={styles.text}>De tijd is om!</span>
					</>
				))}
			{!timerFinished &&
				allTablesCompleted &&
				storedHighscore !== levelState.score && (
					<>
						<h1 className={styles.title}>Level afgelopen!</h1>
						<span className={styles.text}>
							Je hebt alle sommen beantwoord van dit level.
						</span>
					</>
				)}

			{!timerFinished &&
				allTablesCompleted &&
				storedHighscore === levelState.score && (
					<h1 className={styles.title}>
						Wow super metselaar! Level {currentLevel} is
						uitgespeeld!
					</h1>
				)}
		</header>
	);
};

export default PlayAgainModalHeader;
