import React from "react";
import AnswerDisplay from "../AnswerDisplay";
import styles from "./styles.module.css";
import { useGameState } from "../../providers/GameStateProvider";

const TableAnswerDisplay: React.FC = () => {
	const { gameState } = useGameState();
	const sum = gameState.tables[0].table;
	const displaySum = sum.split(" ");

	return (
		<section className={styles.tableAnswerDisplay}>
			<span className={styles.sumContainer}>
				{gameState.tables.length > 0 && (
					<div className={styles.sumDisplay}>
						<div>{displaySum[0]}</div>
						<div>{displaySum[1]}</div>
						<div>{displaySum[2]}</div>
						<div>=</div>
					</div>
				)}
			</span>
			<AnswerDisplay />
		</section>
	);
};

export default TableAnswerDisplay;
