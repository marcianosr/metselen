import React from "react";
import { useLocalStorage } from "react-use";
import { levels } from "../../data/levelsConfig";

import { useLevelState } from "../../providers/LevelStateProvider";
import { WorldBrick } from "../../data/worlds";
import { SaveGameState } from "../../data/saveGameState";
import { useGameState } from "../../providers/GameStateProvider";
import { flattenBricksArray } from "../../utils";
import Modal from "../Modal";

import styles from "./styles.module.css";
import brickStyles from "../Brick/styles.module.css";
import Button from "../Button";
import TextCollectionWrapper from "../Modal/TextCollectionWrapper";

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
			<section className={styles.modalContainer}>
				<h2 className={styles.title}>Name level {modalId}</h2>
				<section className={styles.darkerBackground}>
					<strong className={styles.subTitle}>
						<span>Tafels van : </span>
						<span>{worldLevels[selectedBrick.id - 1].text}</span>
					</strong>
				</section>
				<TextCollectionWrapper>
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
				</TextCollectionWrapper>

				{storedWorldScore >=
				worldLevels[selectedBrick.id - 1].bricksNeeded ? (
					<>
						{levelIsUnderConstruction ? (
							<strong>
								Helaas kun je dit level nog niet spelen, omdat
								de metselaars hun constructies nog aan het
								uittekenen zijn!
							</strong>
						) : (
							<Button
								variant="brick"
								onClick={() => startLevel(selectedBrick.id)}
							>
								Start!
							</Button>
						)}
					</>
				) : (
					<strong>
						Verdien meer stenen om dit level te ontgrendelen!
					</strong>
				)}
			</section>
		</Modal>
	);
};

export default LevelModal;
