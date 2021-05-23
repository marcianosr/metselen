import React, { SetStateAction, useState } from "react";
import classNames from "classnames";
import Brick from "../Brick";
import styles from "./styles.module.css";
import brickContainerStyles from "../BrickContainer/styles.module.css";
import textStyles from "../../typography.module.css";
import { BrickRow, BrickRowContainer } from "../BrickRowContainer";
import { useGameState } from "../../providers/GameStateProvider";
import { flattenBricksArray } from "../../utils";
import Modal from "../Modal";
import { WorldBrick } from "../../data/worlds";

const LevelSelectScreenContainer = () => {
	const { gameState } = useGameState();
	const totalLevels = flattenBricksArray<WorldBrick>(
		gameState.worlds[0].levels
	).length;
	const [modalId, setModalId] = useState<SetStateAction<number | null>>(null);

	const levels = flattenBricksArray<WorldBrick>(gameState.worlds[0].levels);

	const showModal = (id: number) => {
		setModalId(id);
	};

	console.log(gameState.worlds[0].brickScore);
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
									{brickRow.map((brick) => (
										<>
											<Brick
												id={brick.id}
												size={brick.size}
												color={brick.color}
												text={brick.text}
												disabled={!brick.isUnlocked}
												isLastBrick={
													totalLevels === brick.id
												}
												onClick={() =>
													showModal(brick.id)
												}
											/>

											{modalId === brick.id && (
												<Modal hideModal={setModalId}>
													<h2>
														Name level {modalId}
													</h2>
													<strong>
														Tafels van:
														{
															levels[brick.id - 1]
																.text
														}
													</strong>
													<ul>
														<li>
															Totaal:
															{
																gameState
																	.worlds[0]
																	.brickScore
																	.current
															}
															/
															{
																levels[
																	brick.id - 1
																].maxBricks
															}
														</li>
														<li>Tijd over: </li>
														<li>
															Ontgrendeld na:
															{
																levels[
																	brick.id - 1
																].bricksNeeded
															}
														</li>
													</ul>
													{gameState.worlds[0]
														.brickScore.current >=
													levels[brick.id - 1]
														.bricksNeeded ? (
														<button>
															Speel level!
														</button>
													) : (
														<strong>
															Verdien meer stenen
															om dit level te
															ontgrendelen!
														</strong>
													)}
												</Modal>
											)}
										</>
									))}
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
