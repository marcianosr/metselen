import React from "react";
import { useGameState } from "../../../providers/GameStateProvider";
import BrickWall from "../BrickWall";
import Inventory from "../Inventory";
import styles from "./styles.module.css";

const EditorScreen = () => {
	return (
		<section className={styles.editorScreen}>
			<section className={styles.editorContainer}>
				<Inventory />
				<BrickWall />
			</section>
		</section>
	);
};

export default EditorScreen;
