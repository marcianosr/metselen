import React from "react";
import { GameState } from "../../types/GameState";
import classnames from "classnames";

import styles from "./styles.module.css";

type BrickContainerProps = Pick<GameState, "correctAnswers">;

type Brick = {
	id: number;
	size: string;
	softShake: number[];
	isDropping: boolean;
};

const bricksMapping: Brick[] = [
	{ id: 1, size: "default", softShake: [], isDropping: true },
	{ id: 2, size: "default", softShake: [1], isDropping: true },
	{ id: 3, size: "default", softShake: [2], isDropping: true },
	{ id: 4, size: "default", softShake: [3], isDropping: true },
	{ id: 5, size: "default", softShake: [4], isDropping: true },
	{
		id: 6,
		size: "small",
		softShake: [1],
		isDropping: true,
	},
	{ id: 7, size: "default", softShake: [1, 2, 6], isDropping: true },
	{
		id: 8,
		size: "default",
		softShake: [7, 2, 3, 9],
		isDropping: true,
	},
	// { id: 9, size: "default", softShake: [] },
	// { id: 10, size: "default", softShake: [] },
	// { id: 11, size: "small", softShake: [] },
	// { id: 12, size: "default", softShake: [] },
	// { id: 13, size: "small", softShake: [] },
	// { id: 14, size: "small", softShake: [] },
	// { id: 15, size: "default", softShake: [] },
	// { id: 16, size: "default", softShake: [] },
	// { id: 17, size: "default", softShake: [] },
	// { id: 18, size: "small", softShake: [] },
	// { id: 19, size: "default", softShake: [] },
	// { id: 20, size: "small", softShake: [] },
	// { id: 21, size: "default", softShake: [] },
	// { id: 22, size: "default", softShake: [] },
	// { id: 23, size: "small", softShake: [] },
	// { id: 24, size: "small", softShake: [] },
	// { id: 25, size: "default", softShake: [] },
];

// Brick 7:
// First shock: 6, 1, 2
// Second shock: 3

const BrickContainer: React.FC<BrickContainerProps> = ({ correctAnswers }) => {
	const [showBricksCounter, setShowBricksCounter] = React.useState<number[]>(
		[]
	);
	const [bricks, setBricks] = React.useState([...bricksMapping]);
	const [currentBrick, setCurrentBrick] = React.useState<any>();

	React.useEffect(() => {
		setShowBricksCounter((state) => [...state, correctAnswers.length]);
		const currentBrick = bricks[showBricksCounter.length - 1];
		setCurrentBrick(currentBrick);

		const timer = setInterval(() => {
			setBricks(
				bricks.map((brick) =>
					currentBrick && currentBrick.id > brick.id
						? {
								...brick,
								isDropping: false,
						  }
						: brick
				)
			);
		}, 1);

		return () => clearTimeout(timer);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [correctAnswers.length, setShowBricksCounter]);

	return (
		<section className={styles.brickContainer}>
			<div className={styles.brickRowContainer}>
				{bricks.map((brick) => {
					const showBrick = showBricksCounter.includes(brick.id);

					return (
						showBrick && (
							<div
								key={brick.id}
								data-idx={brick.id}
								className={classnames(styles.brick, {
									[styles.smallBrick]: brick.size === "small",
									[styles.dropBrick]: brick.isDropping,
									[styles.softShakeBrick]: currentBrick?.softShake.includes(
										brick.id
									),
								})}
							>
								{brick.id}
							</div>
						)
					);
				})}
			</div>
		</section>
	);
};

export default BrickContainer;
