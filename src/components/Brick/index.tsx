import React, { CSSProperties } from "react";
import classnames from "classnames";
import { BrickType } from "../../types/Bricks";
import styles from "../BrickContainer/styles.module.css";

type BrickProps = {
	id: number;
	currentBrick?: BrickType;
	size: string;
	willDrop: boolean;
	color?: string;
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
}) => (
	<div
		key={id}
		className={classnames(styles.brickCement, {
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
					"--defaultBrickColor": color,
				} as CSSProp
			}
			className={classnames(styles.brick, {
				// [styles.dropBrick]: willDrop,
				[styles.currentBrick]: currentBrick?.id === id,
			})}
		>
			{id}
		</div>
	</div>
);

export default Brick;
