import React from "react";
import AnswerDisplay from "../AnswerDisplay";
import { GameStateProps } from "../../types/GameState";
import styles from "./styles.module.css";

type TableAnswerDisplayProps = GameStateProps;

const TableAnswerDisplay: React.FC<TableAnswerDisplayProps> = ({
	gameState,
	setGameState,
}) => (
	<section className={styles.tableAnswerDisplay}>
		<span>{gameState.tables.length > 0 && gameState.tables[0].table}</span>
		<AnswerDisplay gameState={gameState} setGameState={setGameState} />
	</section>
);

export default TableAnswerDisplay;
