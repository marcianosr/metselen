import React from "react";
import classNames from "classnames";
import Brick from "../Brick";
import styles from "./styles.module.css";
import brickContainerStyles from "../BrickContainer/styles.module.css";
import textStyles from "../../typography.module.css";
import { BrickRow, BrickRowContainer } from "../BrickRowContainer";
import { useGameState } from "../../providers/GameStateProvider";

const LevelSelectScreenContainer = () => {
	const { gameState } = useGameState();
	console.log("d", gameState);
	return (
		<section className={styles.levelSelectContainer}>
			<section className={styles.gameInfoContainer}>
				<h1
					className={classNames(
						textStyles.defaultText,
						styles.selectLevelTitle
					)}
				>
					Selecteer level
				</h1>
				<section className={styles.gameInfo}>
					<small className={styles.worldText}>
						<span>Wereld</span>
						<span>{gameState.worlds[0].world}</span>
					</small>
					<span className={styles.seperator}> - </span>
					<div className={styles.totalBricksContainer}>
						<div className={styles.brick}></div>
						<div className={styles.totalBricksText}>
							{gameState.worlds[0].brickScore.current}/
							{gameState.worlds[0].brickScore.max}
						</div>
					</div>
				</section>
			</section>
			<section className={brickContainerStyles.brickContainer}>
				<div className={brickContainerStyles.brickRowContainer}>
					<section className={styles.brickContainer}>
						<BrickRowContainer>
							{gameState.worlds[0].levels.map((brickRow, idx) => (
								<BrickRow idx={idx}>
									{brickRow.map((brick) => {
										return (
											<Brick
												id={brick.id}
												size={brick.size}
												color={brick.color}
												text={brick.text}
												disabled={!brick.isUnlocked}
											/>
										);
									})}
								</BrickRow>
							))}
						</BrickRowContainer>
					</section>
				</div>
			</section>
		</section>
	);
};

export default LevelSelectScreenContainer;
