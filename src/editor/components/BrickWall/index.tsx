import React, { useState, CSSProperties } from "react";

import Brick from "../../../components/Brick";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useLevelConfigState } from "../../../providers/LevelConfigProvider";

// Getting a test layoout for now.
// This will be a file based on the edits of a user
// I now want to make a brick grid
//

export interface CSSVars extends CSSProperties {
	"--columns": number;
	"--rowOrder": number;
}

// Setup a basic grid of 5 default bricks = 10 small bricks
// This is adjustable in a panel
const BrickWall = () => {
	const { levelConfigState } = useLevelConfigState();

	const columnSettingStyles = {
		"--columns": levelConfigState.columns,
	} as CSSVars;

	return (
		<>
			<section
				style={columnSettingStyles}
				className={styles.brickWallContainer}
			>
				{levelConfigState.layout.map((row: any) => {
					const rowOrderStyles = {
						"--rowOrder": row.order,
					} as CSSVars;

					return (
						<>
							<div
								style={rowOrderStyles}
								className={styles.brickRow}
							>
								{row.bricks.map((brick: any) => {
									return (
										<div
											className={classNames(
												styles.brick,
												[styles[`${brick.size}`]]
											)}
										>
											{brick.id}
										</div>
									);
								})}
							</div>
						</>
					);
				})}
			</section>
		</>
	);
};

export default BrickWall;
