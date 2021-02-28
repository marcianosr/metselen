import React from "react";
import classnames from "classnames";
import { BrickType } from "../BrickContainer";
import styles from "../BrickContainer/styles.module.css";

type BrickProps = {
	id: number;
	currentBrick?: BrickType;
	size: string;
	willDrop: boolean;
};

const Brick: React.FC<BrickProps> = ({ id, currentBrick, size, willDrop }) => (
	<div
		key={id}
		data-idx={id}
		className={classnames(styles.brick, {
			[styles.currentBrick]: currentBrick?.id === id,
			[styles.smallBrick]: size === "small",
			[styles.dropBrick]: willDrop,
			[styles.hardShakeBrick]:
				currentBrick?.hardShake?.length &&
				currentBrick?.hardShake.includes(id),
		})}
	>
		{id}
	</div>
);

export default Brick;
