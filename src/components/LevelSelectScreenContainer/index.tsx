import { SetStateAction, useEffect, useState } from "react";
import classNames from "classnames";
import { useLocalStorage } from "react-use";

import Brick from "../Brick";
import { BrickRow, BrickRowContainer } from "../BrickRowContainer";
import { useGameState } from "../../providers/GameStateProvider";
import { flattenBricksArray } from "../../utils";
import LevelModal from "../LevelModal";
import { WorldBrick } from "../../data/worlds";
import { SaveGameState } from "../UserDataScreen";

import styles from "./styles.module.css";
import brickContainerStyles from "../BrickContainer/styles.module.css";
import textStyles from "../../typography.module.css";
import brickStyles from "../Brick/styles.module.css";

const LevelSelectScreenContainer: React.FC = () => {
	const {
		gameState: { worlds },
	} = useGameState();
	const totalLevels = flattenBricksArray<WorldBrick>(worlds[0].levels).length;
	const [modalId, setModalId] = useState<SetStateAction<number | null>>(null);
	const [savedGameState] = useLocalStorage<SaveGameState>("saveGameState");

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
							<span>{worlds[0].world}</span>
						</small>
						<span className={styles.separator}> - </span>
						<div className={styles.totalBricksContainer}>
							<div className={brickStyles.iconBrick}></div>
							<div className={styles.totalBricksText}>
								{worlds[0].brickScore.current}/
								{worlds[0].brickScore.max}
							</div>
						</div>
					</section>
				</div>
			</header>

			<section className={brickContainerStyles.brickContainer}>
				<div className={brickContainerStyles.brickRowContainer}>
					<section className={styles.brickContainer}>
						<BrickRowContainer>
							{worlds[0].levels.map((brickRow, idx) => (
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
													setModalId(brick.id)
												}
											/>

											{modalId === brick.id && (
												<LevelModal
													modalId={modalId}
													setModalId={setModalId}
													selectedBrick={brick}
												/>
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
