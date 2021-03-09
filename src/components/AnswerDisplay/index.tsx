import React, { ChangeEvent } from "react";
import { GameStateProps } from "../../types/GameState";

type AnswerDisplayProps = GameStateProps;

const AnswerDisplay: React.FC<AnswerDisplayProps> = ({
	gameState,
	setGameState,
}) => {
	const [givenAnswer, setGivenAnswer] = React.useState<string>("");

	const validateAnswer = React.useCallback(
		(answer: string) => {
			// const isCorrectAnswer = gameState.tables[0].result === +answer;
			const isCorrectAnswer = true; // to cheat

			setGameState({
				...gameState,
				tables: [...gameState.tables.slice(1)],
				correctAnswers: [
					...gameState.correctAnswers,
					...(isCorrectAnswer ? [gameState.tables[0]] : []),
				],
			});

			clearTextField();
		},
		[gameState, setGameState]
	);

	const clearTextField = (): void => setGivenAnswer("");

	React.useEffect(() => {
		const handleEnter = (e: KeyboardEvent): boolean | void =>
			e.key === "Enter" && validateAnswer(givenAnswer);

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
