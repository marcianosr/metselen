import React from "react";
import { WorldBrick } from "../../data/worlds";
import { useGameState } from "../../providers/GameStateProvider";
import { flattenBricksArray } from "../../utils";
import Modal from "../Modal";

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
	const levels = flattenBricksArray<WorldBrick>(worlds[0].levels);

	const hideModal = () => {
		setModalId(null);
	};

	return (
		<Modal onClickBackdrop={() => hideModal()}>
			<h2>Name level {modalId}</h2>
			<strong>
				Tafels van:
				{levels[selectedBrick.id - 1].text}
			</strong>
			<ul>
				<li>
					Totaal:
					{worlds[0].brickScore.current}/
					{levels[selectedBrick.id - 1].maxBricks}
				</li>
				<li>Tijd over: </li>
				<li>
					Ontgrendeld na:
					{levels[selectedBrick.id - 1].bricksNeeded}
				</li>
			</ul>
			{worlds[0].brickScore.current >=
			levels[selectedBrick.id - 1].bricksNeeded ? (
				<button>Speel level!</button>
			) : (
				<strong>
					Verdien meer stenen om dit level te ontgrendelen!
				</strong>
			)}
		</Modal>
	);
};

export default LevelModal;
