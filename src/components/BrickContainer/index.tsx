import React from "react";
import { useGameState } from "../../providers/GameStateProvider";
import {
	neighbours,
	toBrickIds,
	flattenBricksArray,
	findIndexRow,
} from "../../utils";
import Brick from "../Brick";
import { BrickType, PinkSchemeBrickColors } from "../../types/Bricks"
import styles from "./styles.module.css";


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

	const [bricks, setBricks] = React.useState<BrickType[][]>( // TODO: Not sure why I need to strictly type this
		mapColorsToBricks(gameState.bricks)
	);


	// Think of a way to set the current brick based on the mapping. 
	// slice away the bricks when the answer is correct 
	// This needs to be refactored in the GameProvider 
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
