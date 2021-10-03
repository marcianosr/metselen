import React, { ChangeEvent, useEffect, useCallback } from "react";
import { useLevelState } from "../../providers/LevelStateProvider";
import { LevelState } from "../../types/LevelState";
import styles from "./styles.module.css";
import classNames from "classnames";

const increaseScore = (amount: number, score: number) => amount + score;
const increaseBricksOnField = (amount: number, score: number) => amount + score;

// const getNewTable = (assignments: Tables[]) => {
// 	const allTables = [...assignments];
// 	const firstElem = allTables[0];
// 	firstElem.correct = "no";
// 	const shuffle = [...allTables.slice(1), firstElem]; // maybe just remove the sum or come up with a new one after getting it wrong

// 	return [...shuffle];
// };

const allowBrickOnField = (amountOfBricksOnField: number) =>
	increaseBricksOnField(1, amountOfBricksOnField);

const markAnswerCorrect = (levelState: LevelState) => {
	const currentTable = levelState.assignments[0];

	currentTable.correct = "yes";
	return [currentTable];
};

const markAnswerWrong = (levelState: LevelState) => {
	const currentTable = levelState.assignments[0];

	currentTable.correct = "no";
	return [currentTable];
};

const AnswerDisplay: React.FC = () => {
	const { levelState, updateLevelStateMultiple } = useLevelState();
	const [givenAnswer, setGivenAnswer] = React.useState<string>("");

	// research the need of 'useCallBack'.
	const validateAnswer = useCallback(
		(answer: string) => {
			const isCorrectAnswer =
				levelState.assignments[0].result === +answer;

			updateLevelStateMultiple({
				assignments: levelState.assignments.slice(1),
				score: isCorrectAnswer
					? increaseScore(1, levelState.score)
					: levelState.score,
				amountOfBricksOnField: isCorrectAnswer
					? allowBrickOnField(levelState.amountOfBricksOnField)
					: levelState.amountOfBricksOnField,

				answers: [
					...levelState.answers,
					...(isCorrectAnswer
						? markAnswerCorrect(levelState)
						: markAnswerWrong(levelState)),
				],
				currentAnswer: isCorrectAnswer ? "correct" : "incorrect",
			});

			clearTextField();
		},
		// research the need of these dependencies.
		[levelState, updateLevelStateMultiple]
	);

	const clearTextField = (): void => setGivenAnswer("");

	useEffect(() => {
		const handleEnter = (e: KeyboardEvent): boolean | void =>
			!levelState.isGameFinished &&
			e.key === "Enter" &&
			validateAnswer(givenAnswer);

		window.addEventListener("keydown", handleEnter);

		return () => window.removeEventListener("keydown", handleEnter);
	}, [givenAnswer, validateAnswer, levelState.isGameFinished]);

	return (
		<div className={styles.answerInputContainer}>
			<input
				type="number"
				id="answer"
				name="answer"
				autoFocus
				value={givenAnswer}
				disabled={levelState.isGameFinished}
				className={classNames(styles.answerInput)}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					setGivenAnswer(e.target.value);
				}}
			/>
		</div>
	);
};

export default AnswerDisplay;
