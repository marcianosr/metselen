import React from "react";
import classnames from "classnames";
import { neighbours, toBrickIds } from "../../utils";
import { GameState } from "../../types/GameState";

import styles from "./styles.module.css";

type BrickContainerProps = Pick<GameState, "correctAnswers">;
export type BrickType = {
	id: number;
	size: string;
	willDrop: boolean;
	hardShake?: number[];
};

const bricksMapping: BrickType[][] = [
	[
		{ id: 1, size: "default", willDrop: true },
		{ id: 2, size: "default", willDrop: true },
		{ id: 3, size: "default", willDrop: true },
		{ id: 4, size: "default", willDrop: true },
		{ id: 5, size: "default", willDrop: true },
	],
	[
		{
			id: 6,
			size: "small",
			willDrop: true,
		},
		{ id: 7, size: "default", willDrop: true },
		{
			id: 8,
			size: "default",
			willDrop: true,
		},
		{
			id: 9,
			size: "default",
			willDrop: true,
		},
		{
			id: 10,
			size: "default",
			willDrop: true,
		},
	],
];

const BrickContainer: React.FC<BrickContainerProps> = ({ correctAnswers }) => {
	const [showBricksCounter, setShowBricksCounter] = React.useState<number[]>(
		[]
	);
	const [bricks, setBricks] = React.useState(bricksMapping);
	const [currentBrick, setCurrentBrick] = React.useState<BrickType>();

	React.useEffect(() => {
		setShowBricksCounter((state) => [...state, correctAnswers.length]);

		const brickRows = bricks.flatMap((brickRow: BrickType[]) => brickRow);
		const currentBrick = brickRows[showBricksCounter.length - 1];

		setCurrentBrick({
			...currentBrick,
			hardShake:
				currentBrick && neighbours(currentBrick.id, toBrickIds(bricks)),
		});

		const resetShakeAnimation = setTimeout(() => {
			setCurrentBrick({ ...currentBrick, hardShake: [] });
		}, 1220); // animation delay + duration

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
	}, [correctAnswers.length, setShowBricksCounter]);

	return (
		<section className={styles.brickContainer}>
			<div className={styles.brickRowContainer}>
				{bricks.map((brickRow: BrickType[], idx) => {
					return (
						<div key={idx} className={styles.brickRow}>
							{brickRow.map((brick: BrickType) => {
								const showBrick = showBricksCounter.includes(
									brick.id
								);

								return (
									showBrick && (
										<div
											key={brick.id}
											data-idx={brick.id}
											className={classnames(
												styles.brick,
												{
													[styles.smallBrick]:
														brick.size === "small",
													[styles.dropBrick]:
														brick.willDrop,
													[styles.hardShakeBrick]:
														currentBrick?.hardShake
															?.length &&
														currentBrick?.hardShake.includes(
															brick.id
														),
												}
											)}
										>
											{brick.id}
										</div>
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
