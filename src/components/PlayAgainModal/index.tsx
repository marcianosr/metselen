import classNames from "classnames";
import { useLocalStorage } from "react-use";
import { SaveGameState } from "../../data/saveGameState";
import useTimer from "../../hooks/useTimer";
import { useGameState } from "../../providers/GameStateProvider";
import { useLevelState } from "../../providers/LevelStateProvider";
import Modal from "../Modal";
import PlayAgainModalHeader from "./PlayAgainModalHeader";
import PlayAgainModalFooter from "./PlayAgainModalFooter";
import styles from "./styles.module.css";
import TextCollectionWrapper from "../Modal/TextCollectionWrapper";

const PlayAgainModal = () => {
	const { levelState } = useLevelState();
	const { timerFinished } = useTimer(levelState.timer);
	const {
		gameState: { currentLevel },
	} = useGameState();
	const [savedGameState] = useLocalStorage<SaveGameState>("saveGameState");
	const levelsFromStorage = [...(savedGameState?.worlds?.levels || [])];
	const allTablesCompleted = levelState.tables.length === 0;
	const percentageCompleted = Math.round(
		(levelState.score / levelState.bricks.length) * 100
	);
	const storedHighscore = levelsFromStorage[currentLevel - 1].score;
	const storedPercentageCompleted =
		(levelsFromStorage[currentLevel - 1].score / levelState.bricks.length) *
		100;

	return (
		<Modal>
			<section className={styles.modalContainer}>
				<PlayAgainModalHeader
					storedHighscore={storedHighscore}
					timerFinished={timerFinished}
					allTablesCompleted={allTablesCompleted}
					percentageCompleted={percentageCompleted}
				/>
				<TextCollectionWrapper>
					<h2 className={styles.subTitle}>Jouw resultaten</h2>
					<hr className={styles.line} />
					<ul className={styles.totalsContainer}>
						<li className={styles.listItem}>
							<span>totaal:</span>{" "}
							<span>
								{levelState.score}/{levelState.bricks.length}
							</span>
						</li>
						<li className={styles.listItem}>
							<span>tijd over:</span> <span>0 sec.</span>
						</li>
						<li className={styles.listItem}>
							<span>rijen:</span> <span>0</span>
						</li>
					</ul>
					<hr className={styles.line} />
					<ul className={styles.totalsContainer}>
						<li className={styles.listItem}>
							<span>beste totaal: </span>
							<span>
								{storedHighscore}/{levelState.bricks.length} (
								{storedPercentageCompleted}%)
							</span>
						</li>
					</ul>
				</TextCollectionWrapper>
				<PlayAgainModalFooter />
			</section>
		</Modal>
	);
};

export default PlayAgainModal;
