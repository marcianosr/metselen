import React from "react";
import { neighbours, toBrickIds } from "../../utils";
import { GameState } from "../../types/GameState";
import Brick from "../Brick";
import styles from "./styles.module.css";

type BrickContainerProps = Pick<GameState, "correctAnswers">;
export type BrickType = {
	id: number;
	size: string;
	willDrop: boolean;
	hardShake?: number[];
	color?: PinkSchemeBrickColors;
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

const BrickContainer: React.FC<BrickContainerProps> = ({ correctAnswers }) => {
	const [showBricksCounter, setShowBricksCounter] = React.useState<number[]>(
		[]
	);
	const [bricks, setBricks] = React.useState<BrickType[][]>( // Not sure why I need to strictly type this
		mapColorsToBricks(bricksMapping)
	);
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
	}, [correctAnswers.length, setShowBricksCounter]);

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
