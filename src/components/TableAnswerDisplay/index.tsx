import React from "react";
import AnswerDisplay from "../AnswerDisplay";
import styles from "./styles.module.css";
import { useGameState } from "../../providers/GameStateProvider";

const TableAnswerDisplay: React.FC = () => {
	const { gameState } = useGameState();

	return (
		<section className={styles.tableAnswerDisplay}>
			<span>
				{gameState.tables.length > 0 && gameState.tables[0].table}
			</span>
			<AnswerDisplay />
		</section>
	);
};

export default TableAnswerDisplay;
