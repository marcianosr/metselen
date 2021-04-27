import React, { CSSProperties } from "react";
import classnames from "classnames";
import { BrickType } from "../../types/Bricks";
import { Tables } from "../../types/Tables";
import styles from "../BrickContainer/styles.module.css";

type BrickProps = {
	id: number;
	currentBrick?: BrickType;
	size: string;
	willDrop: boolean;
	color: string[];
	cracked?: boolean;
};

interface CSSProp extends CSSProperties {
	"--defaultBrickColor": string;
}

const Brick: React.FC<BrickProps> = ({
	id,
	currentBrick,
	size,
	willDrop,
	color,
	cracked,
}) => (
	<div
		key={id}
		className={classnames(styles.brickCementSide, {
			[styles.dropBrick]: willDrop,
			[styles.smallBrick]: size === "small",
			[styles.hardShakeBrick]:
				currentBrick?.hardShake?.length &&
				currentBrick?.hardShake.includes(id),
			// [styles.dropBrick]: !willDrop,
		})}
	>
		<div
			style={
				{
					"--defaultBrickColor": color[0],
					"--secondBrickColor": color[1],
				} as CSSProp
			}
			className={classnames(styles.brick, {
				// [styles.dropBrick]: willDrop,
				[styles.crackedBrick]: cracked,
				[styles.currentBrick]: currentBrick?.id === id,
			})}
		>
			{id} - cracked: {JSON.stringify(cracked)} -{" "}
			{JSON.stringify(willDrop)}
		</div>
	</div>
);

export default Brick;
