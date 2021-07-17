import React, { useState, CSSProperties } from "react";
import classNames from "classnames";
import { BrickPosition, useLevelConfigState } from "../../../providers/LevelConfigProvider";
import Brick from "../../../components/Brick";
import BrickInventory from "../Inventory/BrickInventory";
import { BrickSizes, BrickType } from "../../../types/Bricks";
import styles from "./styles.module.css";

type Position = {
	x: number
	y: number
}

const GRID_SETTINGS = {
	width: 35,
	height: 50,
}

type GridProps = {
	levelDraft: any;
	setLevelDraft: any;
}

const Grid: React.FC<GridProps> = ({ levelDraft, setLevelDraft }) => {
	const [selectedCell, setSelectedCell] = useState<Position>({ x: 1, y: 1 });
	const [brickLayout, setBrickLayout] = useState([
		...levelDraft.layout
	]);
	const [showInventory, setShowInventory] = useState(false);
	const [selectedSize, setSelectedSize] = useState<BrickSizes>("medium");

	const selectCell = (e: React.MouseEvent) => {
		const grid = e.currentTarget.getBoundingClientRect();
		const position = {
			x: e.clientX - grid.left,
			y: e.clientY - grid.top
		}

		setSelectedCell({
			x: Math.floor(position.x / GRID_SETTINGS.width),
			y: Math.floor(position.y / GRID_SETTINGS.height),
		});
	}


	const addBrick = (e: React.MouseEvent) => {
		const grid = e.currentTarget.getBoundingClientRect();
		const position = {
			x: e.clientX - grid.left,
			y: e.clientY - grid.top
		}

		setLevelDraft({
			...levelDraft,
			layout: [
				...levelDraft.layout,
				{
					id: Math.round(Math.random() * 1000), size: selectedSize, x: Math.floor(position.x / GRID_SETTINGS.width),
					y: Math.floor(position.y / GRID_SETTINGS.height)
				}
			]
		});
	}

	const removeBrick = (e: React.MouseEvent, brick: BrickType) => {
		const newBricksState = levelDraft.layout.filter((b: BrickType) => b.id !== brick.id);
		setLevelDraft({
			...levelDraft,
			layout: newBricksState
		});
	}

	const openBrickInventory = (e: React.MouseEvent) => {
		e.preventDefault();
		setShowInventory(true);
	}

	const handleRightClick = (e: React.MouseEvent, brick?: BrickType) => {
		e.preventDefault();
		if (e.currentTarget.id === "grid") openBrickInventory(e);
		if (brick && e.currentTarget.id === "brick") removeBrick(e, brick);
	}

	return (
		<section
			className={styles.gridContainer}
		>
			<div id="grid" className={styles.grid} onMouseMove={selectCell} onClick={addBrick} onContextMenu={(e: React.MouseEvent) => {
				handleRightClick(e)
			}}>
				{selectedCell && <div style={{ "--x": selectedCell.x, "--y": selectedCell.y } as CSSProperties} className={classNames(styles.selectedCell, [styles[selectedSize]])}>cell</div>}
				{levelDraft.layout.map((brick: BrickPosition, idx: number) =>
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
						onRightClick={(e: React.MouseEvent) => {
							e.stopPropagation(); // don't bubble up and fire the onClick of the grid
							handleRightClick(e, brick);
						}}
					/>
				)}

			</div>
			{showInventory && <BrickInventory selectedSize={selectedSize} setSelectedSize={setSelectedSize} setShowInventory={setShowInventory} />}
		</section >
	);
};

export default Grid;
