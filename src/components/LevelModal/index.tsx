import React from "react";
import { WorldBrick } from "../../data/worlds";
import { useGameState } from "../../providers/GameStateProvider";
import { flattenBricksArray } from "../../utils";
import Modal from "../Modal";

import styles from "./styles.module.css";
import brickStyles from "../Brick/styles.module.css";
import { useLevelState } from "../../providers/LevelStateProvider";

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
	const levels = flattenBricksArray<WorldBrick>(worlds[0].levels);

	const hideModal = () => setModalId(null);
	const startLevel = (id: number) => onPlayLevel(id);

	return (
		<Modal onClickBackdrop={() => hideModal()}>
			<h2 className={styles.title}>Name level {modalId}</h2>
			<section className={styles.darkerBackground}>
				<strong className={styles.subTitle}>
					<span>Tafels van : </span>
					<span>{levels[selectedBrick.id - 1].text}</span>
				</strong>
			</section>
			<section className={styles.darkerBackground}>
				<ul className={styles.list}>
					<li>
						<span>Totaal:</span>
						<span className={styles.statsNumbers}>
							{worlds[0].brickScore.current}/
							{levels[selectedBrick.id - 1].maxBricks}
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
							{levels[selectedBrick.id - 1].bricksNeeded}
						</span>
						<div className={brickStyles.iconBrick}></div>
					</li>
				</ul>
			</section>

			{worlds[0].brickScore.current >=
			levels[selectedBrick.id - 1].bricksNeeded ? (
				<button
					className={styles.brickButton}
					onClick={() => startLevel(selectedBrick.id)}
				>
					<span className={styles.text}>Start!</span>
				</button>
			) : (
				<strong>
					Verdien meer stenen om dit level te ontgrendelen!
				</strong>
			)}
		</Modal>
	);
};

export default LevelModal;
