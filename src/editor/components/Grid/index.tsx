import React, { useState, CSSProperties, useEffect } from "react";
import classNames from "classnames";
import { BrickPosition } from "../../../providers/EditorStateProvider";
import Brick from "../../../components/Brick";
import BrickInventory from "../Inventory/BrickInventory";
import { BrickSizes, BrickType } from "../../../types/Bricks";
import styles from "./styles.module.css";
import { EditorDraftStateProps } from "../../../types/LevelState";

type Position = {
	x: number;
	y: number;
};

const GRID_SETTINGS = {
	width: 35,
	height: 50,
};

const Grid: React.FC<EditorDraftStateProps> = ({
	editorDraftState,
	setEditorDraftState,
}) => {
	const [selectedCell, setSelectedCell] = useState<Position>({ x: 1, y: 1 });
	const [showInventory, setShowInventory] = useState(false);
	const [selectedSize, setSelectedSize] = useState<BrickSizes>("medium");

	const selectCell = (e: React.MouseEvent) => {
		const grid = e.currentTarget.getBoundingClientRect();
		const position = {
			x: e.clientX - grid.left,
			y: e.clientY - grid.top,
		};

		setSelectedCell({
			x: Math.floor(position.x / GRID_SETTINGS.width),
			y: Math.floor(position.y / GRID_SETTINGS.height),
		});
	};

	useEffect(() => {
		setEditorDraftState({
			...editorDraftState,
			maxBricks: editorDraftState.layout.length,
		});
	}, [editorDraftState.layout]);

	const addBrick = (e: React.MouseEvent) => {
		const grid = e.currentTarget.getBoundingClientRect();
		const position = {
			x: e.clientX - grid.left,
			y: e.clientY - grid.top,
		};

		setEditorDraftState({
			...editorDraftState,
			layout: [
				...editorDraftState.layout,
				{
					id: Math.round(Math.random() * 1000),
					size: selectedSize,
					x: Math.floor(position.x / GRID_SETTINGS.width),
					y: Math.floor(position.y / GRID_SETTINGS.height),
				},
			],
		});
	};

	const removeBrick = (e: React.MouseEvent, brick: BrickType) => {
		const newBricksState = editorDraftState.layout.filter(
			(b: BrickType) => b.id !== brick.id
		);
		setEditorDraftState({
			...editorDraftState,
			layout: newBricksState,
		});
	};

	const openBrickInventory = (e: React.MouseEvent) => {
		e.preventDefault();
		setShowInventory(true);
	};

	const handleRightClick = (e: React.MouseEvent, brick?: BrickType) => {
		e.preventDefault();
		if (e.currentTarget.id === "grid") openBrickInventory(e);
		if (brick && e.currentTarget.id === "brick") removeBrick(e, brick);
	};

	return (
		<section className={styles.gridContainer}>
			<div
				id="grid"
				className={styles.grid}
				onMouseMove={selectCell}
				onClick={addBrick}
				onContextMenu={(e: React.MouseEvent) => {
					handleRightClick(e);
				}}
			>
				{selectedCell && (
					<div
						style={
							{
								"--x": selectedCell.x,
								"--y": selectedCell.y,
							} as CSSProperties
						}
						className={classNames(styles.selectedCell, [
							styles[selectedSize],
						])}
					>
						cell
					</div>
				)}
				{editorDraftState.layout.map(
					(brick: BrickPosition, idx: number) => (
						<Brick
							key={idx}
							id={idx}
							size={brick.size}
							text={brick.size}
							color={{
								key: "1",
								values: ["#ff0000", "#ff00ff"],
							}}
							x={brick.x}
							y={brick.y}
							onRightClick={(e: React.MouseEvent) => {
								e.stopPropagation(); // don't bubble up and fire the onClick of the grid
								handleRightClick(e, brick);
							}}
						/>
					)
				)}
			</div>
			{showInventory && (
				<BrickInventory
					selectedSize={selectedSize}
					setSelectedSize={setSelectedSize}
					setShowInventory={setShowInventory}
				/>
			)}
		</section>
	);
};

export default Grid;
