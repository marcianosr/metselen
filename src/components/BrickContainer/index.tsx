import React, { useState, useEffect } from "react";
import { useGameState } from "../../providers/GameStateProvider";
import { neighbours, toBrickIds, flattenBricksArray } from "../../utils";
import { BrickRowContainer, BrickRow } from "../BrickRowContainer";
import Brick from "../Brick";
import {
	BrickType,
	pinkSchemeColors,
	RandomColorType,
} from "../../types/Bricks";
import styles from "./styles.module.css";
import classNames from "classnames";

const HARD_SHAKE_BRICK_ANIMATION_LENGTH = 1220; // In ms. Delay + duration of the animation.

export const getRandomBrickColor = (): RandomColorType => {
	const getColor =
		Object.entries(pinkSchemeColors)[
			Math.floor(Math.random() * Object.values(pinkSchemeColors).length)
		];

	return {
		key: getColor[0],
		values: getColor[1],
	};
};

const mapColorsToBricks = (bricks: BrickType[][]) =>
	bricks.map((brick) =>
		brick.map((brick) => ({
			...brick,
			color: getRandomBrickColor(),
		}))
	);

const BrickContainer: React.FC = () => {
	const { gameState, updateGameState } = useGameState();
	const { answers, currentAnswer } = gameState;

	const [bricks, setBricks] = useState<BrickType[][]>( // TODO: Not sure why I need to strictly type this. Answer: Because I think TS doesn't infer complexer types.
		mapColorsToBricks(gameState.mapping)
	);

	const [slicedBricks, setSlicedBricks] = useState<BrickType[][]>(bricks);
	const [slicedBrickCounter, setSlicedBrickCounter] = useState(1);
	const [currentRow, setCurrentRow] = useState(0);
	const [validRow, increaseValidRow] = useState(0);
	const [currentBrick, setCurrentBrick] = useState<BrickType>();

	useEffect(() => {
		const currentBrick =
			flattenBricksArray(bricks)[gameState.amountOfBricksOnField];

		if (currentAnswer === "incorrect") {
			setBricks(
				bricks.map((brick: BrickType[]) =>
					brick.map((brick: BrickType) =>
						currentBrick && currentBrick.id - 1 === brick.id
							? {
									...brick,
									cracked:
										currentAnswer === "incorrect"
											? true
											: false,
							  }
							: brick
					)
				)
			);
		}
	}, [answers.length]);

	useEffect(() => {
		const previousBrick =
			flattenBricksArray(bricks)[gameState.amountOfBricksOnField - 1];

		if (previousBrick && currentAnswer === "correct") {
			setCurrentBrick({
				...previousBrick,
				hardShake:
					previousBrick &&
					neighbours(previousBrick.id, toBrickIds(bricks)),
			});

			const resetShakeAnimation = setTimeout(() => {
				setCurrentBrick({
					...previousBrick,
					hardShake: [],
				});
			}, HARD_SHAKE_BRICK_ANIMATION_LENGTH);

			setBricks(
				bricks.map((brick: BrickType[]) =>
					brick.map((brick: BrickType) =>
						previousBrick && previousBrick.id > brick.id
							? {
									...brick,
									willDrop: false,
							  }
							: brick
					)
				)
			);

			return () => clearTimeout(resetShakeAnimation);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [answers.length]);

	useEffect(() => {
		const filteredValidBricks = bricks[currentRow].filter(
			(brick) => brick.cracked === false
		).length;

		const isValidRow = filteredValidBricks === bricks[currentRow].length;

		if (slicedBrickCounter === bricks[currentRow].length) {
			setCurrentRow((row) => row + 1);
			setSlicedBrickCounter(0);
		}

		if (slicedBrickCounter === bricks[currentRow].length && isValidRow) {
			increaseValidRow((row) => row + 1);
			updateGameState("rows", validRow + 1);
		}

		if (gameState.amountOfBricksOnField !== 0) {
			const bricks = [...slicedBricks];
			bricks[currentRow] = [...slicedBricks[currentRow].slice(1)];
			setSlicedBricks(bricks);
			setSlicedBrickCounter((count) => count + 1);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gameState.amountOfBricksOnField]);

	return (
		<section className={styles.brickContainer}>
			<BrickRowContainer>
				{bricks.map((brickRow: BrickType[], idx) => (
					<>
						<BrickRow idx={idx}>
							{brickRow.map((brick: BrickType) => {
								const showBrick =
									gameState.amountOfBricksOnField >= brick.id;

								return (
									showBrick && (
										<Brick
											id={brick.id}
											currentBrick={currentBrick}
											willDrop={brick.willDrop}
											size={brick.size}
											color={brick.color}
											cracked={brick.cracked}
											text={
												gameState.answers[brick.id - 1]
													.table
											}
										/>
									)
								);
							})}
						</BrickRow>
						<div
							className={classNames({
								[styles.cementRow]:
									slicedBricks[idx].length === 0,
							})}
						></div>
					</>
				))}
			</BrickRowContainer>
		</section>
	);
};

export default BrickContainer;
