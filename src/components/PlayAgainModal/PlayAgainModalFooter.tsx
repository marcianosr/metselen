import React from "react";
import classNames from "classnames";
import Button from "../Button";
import { useLevelState } from "../../providers/LevelStateProvider";
import useTimer from "../../hooks/useTimer";

import styles from "./styles.module.css";
import { useGameState } from "../../providers/GameStateProvider";

const PlayAgainModalFooter = () => {
	const { updateGameState } = useGameState();
	const { levelState, onResetLevel } = useLevelState();
	const { resetTimer } = useTimer(levelState.timer);

	const returnToOverworld = () =>
		updateGameState("screen", { current: "overworld" });

	return (
		<footer className={classNames(styles.buttonContainer)}>
			<Button
				variant="brick"
				onClick={() => {
					onResetLevel();
					resetTimer();
				}}
			>
				Speel opnieuw
			</Button>
			<Button
				variant="brick"
				onClick={() => {
					onResetLevel();
					returnToOverworld();
				}}
			>
				Terug naar wereld 1
			</Button>
		</footer>
	);
};

export default PlayAgainModalFooter;
