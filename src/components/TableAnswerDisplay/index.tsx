import React from "react";
import AnswerDisplay from "../AnswerDisplay";
import styles from "./styles.module.css";
import { useLevelState } from "../../providers/LevelStateProvider";

const TableAnswerDisplay: React.FC = () => {
	const { levelState } = useLevelState();
	const sum = levelState.assignments[0].table;
	const displaySum = sum.split(" ");

	return (
		<section className={styles.tableAnswerDisplay}>
			<span className={styles.sumContainer}>
				{levelState.assignments.length > 0 && (
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
