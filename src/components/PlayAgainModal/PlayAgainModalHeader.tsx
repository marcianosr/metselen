import React from "react";
import { useGameState } from "../../providers/GameStateProvider";
import { useLevelState } from "../../providers/LevelStateProvider";
import styles from "./styles.module.css";

type PlayAgainModalHeaderProps = {
	storedHighscore: number;
	timerFinished: boolean;
	allTablesCompleted: boolean;
	percentageCompleted: number;
};

const PlayAgainModalHeader: React.FC<PlayAgainModalHeaderProps> = ({
	storedHighscore,
	allTablesCompleted,
	timerFinished,
	percentageCompleted,
}) => {
	const { levelState } = useLevelState();
	const {
		gameState: { currentLevel },
	} = useGameState();

	return (
		<header>
			{(timerFinished && !allTablesCompleted) ||
				(timerFinished && allTablesCompleted && (
					<h1 className={styles.title}>
						Oh nee! De tijd is om! Dit level is nu{" "}
						{percentageCompleted}% compleet.
					</h1>
				))}
			{!timerFinished &&
				allTablesCompleted &&
				storedHighscore !== levelState.score && (
					<h1 className={styles.title}>
						Dit level is voor {percentageCompleted}% compleet.
					</h1>
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
