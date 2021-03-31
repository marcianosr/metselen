import React, { useState, useEffect } from "react";
import { useGameState } from "../../providers/GameStateProvider";
import { neighbours, toBrickIds, flattenBricksArray } from "../../utils";
import Brick from "../Brick";
import { BrickType, PinkSchemeBrickColors } from "../../types/Bricks";
import styles from "./styles.module.css";
import classNames from "classnames";

const HARD_SHAKE_BRICK_ANIMATION_LENGTH = 1220; // In ms. Delay + duration of the animation.

const brickColor: PinkSchemeBrickColors[] = [
	PinkSchemeBrickColors.Normal,
	PinkSchemeBrickColors.Dark,
	PinkSchemeBrickColors.Light,
	PinkSchemeBrickColors.VeryDark,
];

const getRandomBrickColor = () =>
	brickColor[Math.floor(Math.random() * brickColor.length)];

const mapColorsToBricks = (bricks: BrickType[][]) =>
	bricks.map((brick) =>
		brick.map((brick) => ({
			...brick,
			color: getRandomBrickColor(),
		}))
	);

const BrickContainer: React.FC = () => {
	const { gameState } = useGameState();
	const { correctAnswers } = gameState;

	const [bricks, setBricks] = useState<BrickType[][]>( // TODO: Not sure why I need to strictly type this
		mapColorsToBricks(gameState.mapping)
	);

	const [slicedBricks, setSlicedBricks] = useState<BrickType[][]>(bricks);
	const [slicedBrickCounter, setSlicedBrickCounter] = useState(1);
	const [currentRow, setCurrentRow] = useState(0);

	// Think of a way to set the current brick based on the mapping.
	// slice away the bricks when the answer is correct
	// This needs to be refactored in the GameProvider
	const [currentBrick, setCurrentBrick] = useState<BrickType>();

	useEffect(() => {
		const currentBrick = flattenBricksArray(bricks)[
			correctAnswers.length - 1
		];

		setCurrentBrick({
			...currentBrick,
			hardShake:
				currentBrick && neighbours(currentBrick.id, toBrickIds(bricks)),
		});

		const resetShakeAnimation = setTimeout(() => {
			setCurrentBrick({ ...currentBrick, hardShake: [] });
		}, HARD_SHAKE_BRICK_ANIMATION_LENGTH);

		const timer = setTimeout(() => {
			setBricks(
				bricks.map((brick: BrickType[]) =>
					brick.map((brick: BrickType) =>
						currentBrick && currentBrick.id > brick.id
							? {
									...brick,
									willDrop: false,
							  }
							: brick
					)
				)
			);
		}, 1);

		return () => {
			clearTimeout(timer);
			clearTimeout(resetShakeAnimation);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [correctAnswers.length]);

	useEffect(() => {
		if (slicedBrickCounter === bricks[currentRow].length) {
			setCurrentRow((c) => c + 1);
			setSlicedBrickCounter(0);
		}

		if (correctAnswers.length !== 0) {
			const bricks = [...slicedBricks];
			bricks[currentRow] = [...slicedBricks[currentRow].slice(1)];
			setSlicedBricks(bricks);
			setSlicedBrickCounter((count) => count + 1);
		}
	}, [correctAnswers.length]);

	return (
		<section className={styles.brickContainer}>
			<div className={styles.brickRowContainer}>
				{bricks.map((brickRow: BrickType[], idx) => {
					return (
						<div
							key={idx}
							className={classNames(styles.brickRow, {
								[styles.showCompletedRow]:
									slicedBricks[idx].length === 0,
							})}
						>
							{brickRow.map((brick: BrickType) => {
								const showBrick = correctAnswers
									.map((answer) => answer.id)
									.includes(brick.id);

								return (
									showBrick && (
										<Brick
											id={brick.id}
											currentBrick={currentBrick}
											willDrop={brick.willDrop}
											size={brick.size}
											color={brick.color}
										/>
									)
								);
							})}
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default BrickContainer;

// classNames([styles.showCompletedRow]: slicedBricks[idx].length === 0)

// <div
// className={classNames({
// 	[styles.showCompletedRow]: true,
// })}
// ></div>
