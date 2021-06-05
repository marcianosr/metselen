import React from "react";
import { useLocalStorage } from "react-use";
import { levels } from "../../data/levelMappings";

import { useLevelState } from "../../providers/LevelStateProvider";
import { WorldBrick } from "../../data/worlds";
import { SaveGameState } from "../../data/saveGameState";
import { useGameState } from "../../providers/GameStateProvider";
import { flattenBricksArray } from "../../utils";
import Modal from "../Modal";

import styles from "./styles.module.css";
import brickStyles from "../Brick/styles.module.css";

type LevelModalProps = {
	modalId: number | null;
	setModalId: (id: number | null) => void;
	selectedBrick: WorldBrick;
};
const LevelModal: React.FC<LevelModalProps> = ({
	modalId,
	setModalId,
	selectedBrick,
}) => {
	const {
		gameState: { worlds },
	} = useGameState();
	const { onPlayLevel } = useLevelState();
	const worldLevels = flattenBricksArray<WorldBrick>(worlds[0].levels);

	const hideModal = () => setModalId(null);
	const startLevel = (id: number) => onPlayLevel(id);
	const [savedGameState] = useLocalStorage<SaveGameState>("saveGameState");
	const storedWorldScore = savedGameState?.worlds.score || 0;
	const storedLevelScore =
		(savedGameState?.worlds.levels &&
			savedGameState?.worlds.levels[selectedBrick.id - 1]?.score) ||
		0;
	const levelIsUnderConstruction = levels[selectedBrick.id - 1] === undefined;

	return (
		<Modal onClickBackdrop={() => hideModal()}>
			<h2 className={styles.title}>Name level {modalId}</h2>
			<section className={styles.darkerBackground}>
				<strong className={styles.subTitle}>
					<span>Tafels van : </span>
					<span>{worldLevels[selectedBrick.id - 1].text}</span>
				</strong>
			</section>
			<section className={styles.darkerBackground}>
				<ul className={styles.list}>
					<li>
						<span>Totaal:</span>
						<span className={styles.statsNumbers}>
							{storedLevelScore}/
							{worldLevels[selectedBrick.id - 1].maxBricks}
						</span>
						<div className={brickStyles.iconBrick}></div>
					</li>
					<li>
						<span>Tijd over:</span>
						<span className={styles.statsNumbers}>0 sec.</span>
					</li>
					<li>
						<span>Ontgrendeld na:</span>
						<span className={styles.statsNumbers}>
							{worldLevels[selectedBrick.id - 1].bricksNeeded}
						</span>
						<div className={brickStyles.iconBrick}></div>
					</li>
				</ul>
			</section>

			{storedWorldScore >=
			worldLevels[selectedBrick.id - 1].bricksNeeded ? (
				<>
					{levelIsUnderConstruction ? (
						<strong>
							Helaas kun je dit level nog niet spelen, omdat de
							metselaars hun constructies nog aan het uittekenen
							zijn!
						</strong>
					) : (
						<button
							className={styles.brickButton}
							onClick={() => startLevel(selectedBrick.id)}
						>
							<span className={styles.text}>Start!</span>
						</button>
					)}
				</>
			) : (
				<strong>
					Verdien meer stenen om dit level te ontgrendelen!
				</strong>
			)}
		</Modal>
	);
};

export default LevelModal;
