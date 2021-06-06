import classNames from "classnames";
import Button from "../Button";
import { useLevelState } from "../../providers/LevelStateProvider";

import styles from "./styles.module.css";
import { useGameState } from "../../providers/GameStateProvider";

type PlayAgainModalFooterProps = {
	resetTimer: () => void;
};

const PlayAgainModalFooter: React.FC<PlayAgainModalFooterProps> = ({
	resetTimer,
}) => {
	const { updateGameState } = useGameState();
	const { onResetLevel } = useLevelState();

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
