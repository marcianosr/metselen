import classNames from "classnames";
import { useLocalStorage } from "react-use";
import { SaveGameState } from "../../data/saveGameState";
import useTimer from "../../hooks/useTimer";
import { useGameState } from "../../providers/GameStateProvider";
import { useLevelState } from "../../providers/LevelStateProvider";
import Modal from "../Modal";
import Button from "../Button";
import styles from "./styles.module.css";
import TextCollectionWrapper from "../Modal/TextCollectionWrapper";

const PlayAgainModal = () => {
	const { levelState, onResetLevel } = useLevelState();
	const { timerFinished, resetTimer } = useTimer(levelState.timer);
	const {
		gameState: { currentLevel },
		updateGameState,
	} = useGameState();
	const [savedGameState] = useLocalStorage<SaveGameState>("saveGameState");
	const levelsFromStorage = [...(savedGameState?.worlds?.levels || [])];
	const allTablesCompleted = levelState.tables.length === 0;
	const percentageCompleted = Math.round(
		(levelState.score / levelState.bricks.length) * 100
	);

	const returnToOverworld = () =>
		updateGameState("screen", { current: "overworld" });

	return (
		<Modal>
			<section className={styles.modalContainer}>
				<section>
					{(timerFinished && !allTablesCompleted) ||
						(timerFinished && allTablesCompleted && (
							<h1 className={styles.title}>
								Oh nee! De tijd is om! Dit level is nu{" "}
								{percentageCompleted}% compleet.
							</h1>
						))}
					{!timerFinished &&
						allTablesCompleted &&
						levelsFromStorage[currentLevel - 1].score !==
							levelState.score && (
							<h1 className={styles.title}>
								Dit level is voor {percentageCompleted}%
								compleet.
							</h1>
						)}

					{!timerFinished &&
						allTablesCompleted &&
						levelsFromStorage[currentLevel - 1].score ===
							levelState.score && (
							<h1 className={styles.title}>
								Wow super metselaar! Level {currentLevel} is
								uitgespeeld!
							</h1>
						)}
				</section>
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
								{levelsFromStorage[currentLevel - 1].score}/
								{levelState.bricks.length}
							</span>
						</li>
					</ul>
				</TextCollectionWrapper>
				<section className={classNames(styles.buttonContainer)}>
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
				</section>
			</section>
		</Modal>
	);
};

export default PlayAgainModal;
