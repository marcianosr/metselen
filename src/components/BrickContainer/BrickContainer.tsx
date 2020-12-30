import React from "react";
import { GameState } from "../../types/GameState";

import styles from "./styles.module.css";

type BrickProps = Pick<GameState, "correctAnswers">;

const Brick: React.FC<BrickProps> = ({ correctAnswers }) => (
	<section className={styles.brickContainer}>
		{correctAnswers.map((answer, idx) => (
			<span key={idx} data-idx={idx} className={styles.brick}>
				Brick: {idx} {answer?.table} = {answer?.result}
			</span>
		))}
	</section>
);

export default Brick;
