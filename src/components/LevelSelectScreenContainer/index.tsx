import { Fragment, SetStateAction, useEffect, useState } from "react";
import { track } from "insights-js";
import classNames from "classnames";
import { useLocalStorage } from "react-use";

import Brick from "../Brick";
import { BrickRow, BrickRowContainer } from "../BrickRowContainer";
import { useGameState } from "../../providers/GameStateProvider";
import { flattenBricksArray } from "../../utils";
import LevelModal from "../LevelModal";
import { WorldBrick } from "../../data/worldsConfig";
import { SaveGameState } from "../../data/saveGameState";

import styles from "./styles.module.css";
import brickContainerStyles from "../BrickContainer/styles.module.css";
import textStyles from "../../typography.module.css";
import brickStyles from "../Brick/styles.module.css";

const LevelSelectScreenContainer: React.FC = () => {
	const {
		gameState: { worlds, currentWorld },
	} = useGameState();
	const totalLevels = flattenBricksArray<WorldBrick>(
		worlds[currentWorld - 1].levels
	).length;
	const [modalId, setModalId] = useState<SetStateAction<number | null>>(null);
	const [savedGameState] = useLocalStorage<SaveGameState>("saveGameState");
	const worldsScore = savedGameState?.worlds?.score;
	const user = savedGameState?.username || "";

	useEffect(() => {
		track({
			id: "Worlds score by user",
			parameters: {
				[`user: ${user}`]: {
					value: worldsScore?.toString() || "",
				},
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<section className={styles.levelSelectContainer}>
			<header className={styles.header}>
				<div className={styles.user}>{savedGameState?.username}</div>

				<div className={styles.gameInfoContainer}>
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
							<span>{worlds[currentWorld - 1].world}</span>
						</small>
						<span className={styles.separator}> - </span>
						<div className={styles.totalBricksContainer}>
							<div className={brickStyles.iconBrick}></div>
							<div className={styles.totalBricksText}>
								{savedGameState?.worlds.score}/
								{worlds[currentWorld - 1].brickScore.max}
							</div>
						</div>
					</section>
				</div>
			</header>

			<section className={brickContainerStyles.brickContainer}>
				<div className={brickContainerStyles.brickRowContainer}>
					<section className={styles.brickContainer}>
						<BrickRowContainer>
							{worlds[currentWorld - 1].levels.map(
								(brickRow, idx) => (
									<Fragment key={idx}>
										<BrickRow idx={idx}>
											{brickRow.map((brick) => {
												const isUnlocked =
													(worldsScore || false) <
													brick.bricksNeeded;

												const levelIsPlayable =
													!brick.nonPlayable;

												return (
													<Fragment key={brick.id}>
														<Brick
															id={brick.id}
															size={brick.size}
															color={brick.color}
															text={brick.text}
															disabled={
																isUnlocked
															}
															isLastBrick={
																totalLevels ===
																brick.id
															}
															onClick={() => {
																setModalId(
																	brick.id
																);

																track({
																	id: "Opened modal from level",
																	parameters:
																		{
																			[`level-${brick.id}`]:
																				{
																					value:
																						savedGameState?.username ||
																						"",
																				},
																		},
																});
															}}
														/>

														{levelIsPlayable &&
															modalId ===
																brick.id && (
																<LevelModal
																	modalId={
																		modalId
																	}
																	setModalId={
																		setModalId
																	}
																	selectedBrick={
																		brick
																	}
																/>
															)}
													</Fragment>
												);
											})}
										</BrickRow>
									</Fragment>
								)
							)}
						</BrickRowContainer>
					</section>
				</div>
			</section>
		</section>
	);
};

export default LevelSelectScreenContainer;
