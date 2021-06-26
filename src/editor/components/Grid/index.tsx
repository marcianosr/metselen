import React, { useState, CSSProperties } from "react";
import { BrickPosition, useLevelConfigState } from "../../../providers/LevelConfigProvider";
import Brick from "../../../components/Brick";
import styles from "./styles.module.css";

type Position = {
	x: number
	y: number
}

const GRID_SETTINGS = {
	width: 70,
	height: 50,
}

const Grid = () => {
	const { levelConfigState } = useLevelConfigState();
	const [selectedCell, setSelectedCell] = useState<Position>({ x: 1, y: 1 });

	const selectCell = (e: React.MouseEvent) => {
		const grid = e.currentTarget.getBoundingClientRect();
		const position = {
			x: e.clientX - grid.left,
			y: e.clientY - grid.top
		}

		setSelectedCell({
			x: Math.floor((position.x + GRID_SETTINGS.width) / GRID_SETTINGS.width),
			y: Math.floor((position.y + GRID_SETTINGS.height) / GRID_SETTINGS.height),
		})
	}

	return (
		<section
			className={styles.gridContainer}
		>
			<div className={styles.grid} onClick={selectCell}>
				{selectedCell && <div style={{ "--x": selectedCell.x, "--y": selectedCell.y } as CSSProperties} className={styles.selectedCell}>cell</div>}
				{levelConfigState.layout.map((brick: BrickPosition, idx) =>
					<Brick
						key={idx}
						id={idx}
						size={brick.size}
						text={brick.size}
						color={{
							key: "1",
							values: [
								"#ff0000",
								"#ff00ff",
							],
						}}
						x={brick.x}
						y={brick.y}
					/>
				)}
			</div>
		</section>
	);
};

export default Grid;
