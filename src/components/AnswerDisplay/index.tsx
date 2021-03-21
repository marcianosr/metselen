import React, { ChangeEvent, useEffect, useCallback } from "react";
import { useGameState } from "../../providers/GameStateProvider";

const increaseScore = (amount: number, score: number) => amount + score;

const AnswerDisplay: React.FC = () => {
	const { gameState, updateGameStateMultiple } = useGameState();
	const [givenAnswer, setGivenAnswer] = React.useState<string>("");

	const validateAnswer = useCallback(
		(answer: string) => {
			// const isCorrectAnswer = gameState.tables[0].result === +answer;
			const isCorrectAnswer = true; // to cheat
			updateGameStateMultiple({
				tables: [...gameState.tables.slice(1)],
				score: increaseScore(1, gameState.score),
				correctAnswers: [
					...gameState.correctAnswers,
					...(isCorrectAnswer ? [gameState.tables[0]] : []),
				],
			});

			clearTextField();
		},
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
	}, [givenAnswer, validateAnswer]);

	return (
		<>
			<input
				type="number"
				id="answer"
				name="answer"
				value={givenAnswer}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					setGivenAnswer(e.target.value);
				}}
			/>
		</>
	);
};

export default AnswerDisplay;
