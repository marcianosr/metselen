import React from "react";
import { useGameState } from "../../providers/GameStateProvider";
import { neighbours, toBrickIds, flattenBricksArray } from "../../utils";
import Brick from "../Brick";
import styles from "./styles.module.css";

export type BrickType = {
	id: number;
	size: "default" | "small";
	willDrop: boolean;
	hardShake?: number[];
	color?: PinkSchemeBrickColors;
};

export const bricksMapping: BrickType[][] = [
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
		{
			id: 11,
			size: "small",
			willDrop: true,
		},
	],
	[
		{ id: 12, size: "default", willDrop: true },
		{
			id: 13,
			size: "default",
			willDrop: true,
		},
		{
			id: 14,
			size: "small",
			willDrop: true,
		},
		{ id: 15, size: "default", willDrop: true },
		{
			id: 16,
			size: "small",
			willDrop: true,
		},
		{
			id: 17,
			size: "default",
			willDrop: true,
		},
	],
];

enum PinkSchemeBrickColors {
	Normal = "#cd5c7c",
	Dark = "#9a5879",
	VeryDark = "#665776",
	Light = "#d76c80",
}

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

	const [bricks, setBricks] = React.useState<BrickType[][]>( // Not sure why I need to strictly type this
		mapColorsToBricks(bricksMapping)
	);

	const [currentBrick, setCurrentBrick] = React.useState<BrickType>();

	React.useEffect(() => {
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

	return (
		<section className={styles.brickContainer}>
			<div className={styles.brickRowContainer}>
				{bricks.map((brickRow: BrickType[], idx) => {
					return (
						<div key={idx} className={styles.brickRow}>
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
