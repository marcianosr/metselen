import React, { CSSProperties } from "react";

import styles from "./styles.module.css";
import { useLevelConfigState } from "../../../providers/LevelConfigProvider";
import { BrickRow } from "../../../components/BrickRowContainer";
import Brick from "../../../components/Brick";
import { TransparentBrick } from "../Brick";
import { BrickType } from "../../../types/Bricks";
import classNames from "classnames";
import { useState } from "react";

type Position = {
	x: number
	y: number
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
			x: Math.floor((position.x + 70) / 70),
			y: Math.floor((position.y + 50) / 50),
		})
	}

	return (
		<>
			<section
				className={styles.gridContainer}
			>
				<div className={styles.grid} onClick={selectCell}>
					{selectedCell && <div style={{ "--x": selectedCell.x, "--y": selectedCell.y } as CSSProperties} className={styles.selectedCell}>cell</div>}
					{levelConfigState.layout.map((brick: BrickType, idx) => {
						return (
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
							/>
						)
					})}
				</div>
				{/* {levelConfigState.layout.map((row: any, rowIdx: number) => {
					return (
						<>
							<BrickRow idx={rowIdx} row={row.order}>
								{row.bricks.map((brick: any, idx: number) => {
									return (
										<>
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
											/>
										</>
									);
								})}
							</BrickRow>
						</>
					);
				})} */}
			</section>
		</>
	);
};

export default Grid;
