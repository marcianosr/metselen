import React, { CSSProperties } from "react";
import classnames from "classnames";
import { BrickType, RandomColorType } from "../../types/Bricks";
import { LightCrack, DarkCrack } from "./Cracks";
import brickContainerStyles from "../BrickContainer/styles.module.css";
import styles from "./styles.module.css";

type BrickProps = {
	id: number;
	currentBrick?: BrickType;
	size: string;
	willDrop?: boolean;
	color: RandomColorType | undefined;
	cracked?: boolean;
	text: string;
	disabled?: boolean;
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
	text,
	disabled,
}) => (
	<div
		key={id}
		className={classnames(brickContainerStyles.brickCementSide, {
			[styles.dropBrick]: willDrop,
			[styles.smallBrick]: size === "small",
			[styles.hardShakeBrick]:
				currentBrick?.hardShake?.length &&
				currentBrick?.hardShake.includes(id),
				
			// [styles.dropBrick]: !willDrop,
			[styles.disabledBrick]: disabled,

		})}
	>
		<div
			style={
				{
					"--defaultBrickColor": color?.values[0],
					"--secondBrickColor": color?.values[1],
				} as CSSProp
			}
			className={classnames(styles.brick, {
				// [styles.dropBrick]: willDrop,
				[styles.crackedBrick]: cracked,
				[styles.currentBrick]: currentBrick?.id === id,
				[styles.disabledBrickInner]: disabled,

			})}
		>
			{!disabled && <div className={styles.brickShadow}></div>}
			<div className={classnames(styles.text)}>{text}</div>
			{cracked && color?.key === "normal" && (
				<LightCrack isSmall={size === "small"} />
			)}
			{cracked && color?.key === "dark" && (
				<DarkCrack isSmall={size === "small"} />
			)}
		</div>
	</div>
);

export default Brick;
