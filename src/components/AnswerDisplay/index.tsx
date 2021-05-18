import React, { ChangeEvent, useEffect, useCallback } from "react";
import { useGameState } from "../../providers/GameStateProvider";
import { GameState } from "../../types/GameState";
import { Tables } from "../../types/Tables";
import styles from "./styles.module.css";
import textStyles from "../../typography.module.css";
import classNames from "classnames";

const increaseScore = (amount: number, score: number) => amount + score;
const increaseBricksOnField = (amount: number, score: number) => amount + score;

// const getNewTable = (tables: Tables[]) => {
// 	const allTables = [...tables];
// 	const firstElem = allTables[0];
// 	firstElem.correct = "no";
// 	const shuffle = [...allTables.slice(1), firstElem]; // maybe just remove the sum or come up with a new one after getting it wrong

// 	return [...shuffle];
// };

const allowBrickOnField = (amountOfBricksOnField: number) =>
	increaseBricksOnField(1, amountOfBricksOnField);

const markAnswerCorrect = (gameState: GameState) => {
	const currentTable = gameState.tables[0];

	currentTable.correct = "yes";
	return [currentTable];
};

const markAnswerWrong = (gameState: GameState) => {
	const currentTable = gameState.tables[0];

	currentTable.correct = "no";
	return [currentTable];
};

const AnswerDisplay: React.FC = () => {
	const { gameState, updateGameStateMultiple } = useGameState();
	const [givenAnswer, setGivenAnswer] = React.useState<string>("");

	// research the need of 'useCallBack'.
	const validateAnswer = useCallback(
		(answer: string) => {
			const isCorrectAnswer = gameState.tables[0].result === +answer;

			updateGameStateMultiple({
				tables: gameState.tables.slice(1),
				score: isCorrectAnswer
					? increaseScore(1, gameState.score)
					: gameState.score,
				amountOfBricksOnField: isCorrectAnswer
					? allowBrickOnField(gameState.amountOfBricksOnField)
					: gameState.amountOfBricksOnField,

				answers: [
					...gameState.answers,
					...(isCorrectAnswer
						? markAnswerCorrect(gameState)
						: markAnswerWrong(gameState)),
				],
				currentAnswer: isCorrectAnswer ? "correct" : "incorrect",
			});

			clearTextField();
		},
		// research the need of these dependencies.
		[gameState, updateGameStateMultiple]
	);

	const clearTextField = (): void => setGivenAnswer("");

	useEffect(() => {
		const handleEnter = (e: KeyboardEvent): boolean | void =>
			!gameState.isGameFinished &&
			e.key === "Enter" &&
			validateAnswer(givenAnswer);

		window.addEventListener("keydown", handleEnter);

		return () => window.removeEventListener("keydown", handleEnter);
	}, [givenAnswer, validateAnswer, gameState.isGameFinished]);

	return (
		<div className={styles.answerInputContainer}>
			<input
				type="number"
				id="answer"
				name="answer"
				autoFocus
				value={givenAnswer}
				disabled={gameState.isGameFinished}
				className={classNames(styles.answerInput)}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					setGivenAnswer(e.target.value);
				}}
			/>
		</div>
	);
};

export default AnswerDisplay;
