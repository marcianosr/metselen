import React from "react";
import { GameState } from "../../types/GameState";
import classnames from "classnames";

import styles from "./styles.module.css";

type BrickProps = Pick<GameState, "correctAnswers">;

const bricksMapping = [
	{ id: 1, size: "default" },
	{ id: 2, size: "default" },
	{ id: 3, size: "default" },
	{ id: 4, size: "default" },
	{ id: 5, size: "default" },
	{ id: 6, size: "small" },
	{ id: 7, size: "default" },
	{ id: 8, size: "default" },
	{ id: 9, size: "default" },
	{ id: 10, size: "default" },
	{ id: 11, size: "small" },
	{ id: 12, size: "default" },
	{ id: 13, size: "small" },
	{ id: 14, size: "small" },
	{ id: 15, size: "default" },
	{ id: 16, size: "default" },
	{ id: 17, size: "default" },
	{ id: 18, size: "small" },
	{ id: 19, size: "default" },
	{ id: 20, size: "small" },
	{ id: 21, size: "default" },
	{ id: 22, size: "default" },
	{ id: 23, size: "small" },
	{ id: 24, size: "small" },
	{ id: 24, size: "default" },
];

const Brick: React.FC<BrickProps> = ({ correctAnswers }) => {
	const [showBricksCounter, setShowBricksCounter] = React.useState<number[]>(
		[]
	);

	React.useEffect(() => {
		setShowBricksCounter((state) => [...state, correctAnswers.length]);
	}, [correctAnswers.length, setShowBricksCounter]);

	return (
		<section className={styles.brickContainer}>
			<div className={styles.brickRowContainer}>
				{bricksMapping.map((brick) => {
					const showBrick = showBricksCounter.includes(brick.id);

					return (
						true && (
							<div
								key={brick.id}
								data-idx={brick.id}
								className={classnames(styles.brick, {
									[styles.smallBrick]: brick.size === "small",
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

export default Brick;
