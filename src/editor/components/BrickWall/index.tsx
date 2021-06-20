import React, { useState, CSSProperties } from "react";
import { Level } from "../../../data/levelsConfig";

import Brick from "../../../components/Brick";
import styles from "./styles.module.css";
import classNames from "classnames";
import { BrickType } from "../../../types/Bricks";

// Getting a test layoout for now.
// This will be a file based on the edits of a user
// I now want to make a brick grid
//

// The new Level Type
type LevelConfig = {
	name: string;
	level: number;
	columns: number;
	layout: {
		order: number;
		bricks: BrickType[];
	}[];
	ranges: {
		multiplication: number[];
		tables: number[];
	};
	time: number;
};

export interface CSSVars extends CSSProperties {
	"--columns": number;
	"--rowOrder": number;
}

const INITIAL_LEVEL: LevelConfig = {
	name: "Untitled",
	level: 0,
	columns: 1,
	layout: [
		{
			order: 3,
			bricks: [
				{ id: 1, size: "medium", willDrop: true, cracked: false },
				{ id: 2, size: "medium", willDrop: true, cracked: false },
				{ id: 3, size: "medium", willDrop: true, cracked: false },
				{ id: 4, size: "medium", willDrop: true, cracked: false },
				{ id: 5, size: "small", willDrop: true, cracked: false },
			],
		},
		{
			order: 2,
			bricks: [
				{ id: 1, size: "veryLarge", willDrop: true, cracked: false },
				{ id: 2, size: "small", willDrop: true, cracked: false },
			],
		},
		{
			order: 1,
			bricks: [
				{ id: 1, size: "large", willDrop: true, cracked: false },
				{ id: 2, size: "small", willDrop: true, cracked: false },
			],
		},
	],
	ranges: {
		multiplication: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		tables: [1],
	},
	time: 10,
};

// Setup a basic grid of 5 default bricks = 10 small bricks
// This is adjustable in a panel
const BrickWall = () => {
	const [levelSettings, setLevelSettings] =
		useState<LevelConfig>(INITIAL_LEVEL);

	const columnSettingStyles = {
		"--columns": levelSettings.columns,
	} as CSSVars;

	return (
		<>
			<section
				style={columnSettingStyles}
				className={styles.brickWallContainer}
			>
				{levelSettings.layout.map((row: any) => {
					const rowOrderStyles = {
						"--rowOrder": row.order,
					} as CSSVars;

					return (
						<div style={rowOrderStyles} className={styles.brickRow}>
							{row.bricks.map((brick: any) => {
								return (
									<div
										className={classNames(styles.brick, [
											styles[`${brick.size}`],
										])}
									>
										{brick.id}
									</div>
								);
							})}
						</div>
					);
				})}
			</section>
		</>
	);
};

export default BrickWall;
