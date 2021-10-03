import React from "react";
import { WorldBrick, worlds } from "../../data/worldsConfig";
import { useGameState } from "../../providers/GameStateProvider";
import { useLevelState } from "../../providers/LevelStateProvider";
import { flattenBricksArray } from "../../utils";
import styles from "./styles.module.css";

type PlayAgainModalHeaderProps = {
	timerFinished: boolean;
	allAssignmentsCompleted: boolean;
};

const PlayAgainModalHeader: React.FC<PlayAgainModalHeaderProps> = ({
	allAssignmentsCompleted,
	timerFinished,
}) => {
	const { levelState } = useLevelState();
	const {
		gameState: { currentLevel, currentWorld },
	} = useGameState();
	const worldLevelConfig = flattenBricksArray<WorldBrick>(
		worlds[currentWorld - 1].levels
	);
	const maxBricksPerLevel = worldLevelConfig[currentLevel - 1].maxBricks;

	return (
		<header>
			{(timerFinished && !allAssignmentsCompleted) ||
				(timerFinished && allAssignmentsCompleted && (
					<>
						<h1 className={styles.title}>Game over!</h1>
						<span className={styles.text}>De tijd is om!</span>
					</>
				))}
			{!timerFinished &&
				allAssignmentsCompleted &&
				maxBricksPerLevel !== levelState.score && (
					<>
						<h1 className={styles.title}>Level afgelopen!</h1>
						<span className={styles.text}>
							Je hebt alle sommen beantwoord van dit level.
						</span>
					</>
				)}

			{!timerFinished &&
				allAssignmentsCompleted &&
				maxBricksPerLevel === levelState.score && (
					<h1 className={styles.title}>
						Wow super metselaar! Level {currentLevel} is
						uitgespeeld!
					</h1>
				)}
		</header>
	);
};

export default PlayAgainModalHeader;
