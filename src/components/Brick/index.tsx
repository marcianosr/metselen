import React, { CSSProperties, Dispatch, SetStateAction } from "react";
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
	isLastBrick?: boolean;
	onClick?: () => void;
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
	isLastBrick,
	onClick,
}) => (
	<div
		key={id}
		onClick={onClick}
		className={classnames(
			brickContainerStyles.brickCementSide,
			styles.brickContainer,
			{
				[styles.dropBrick]: willDrop,
				[styles.smallBrick]: size === "small",
				[styles.hardShakeBrick]:
					currentBrick?.hardShake?.length &&
					currentBrick?.hardShake.includes(id),

				// [styles.dropBrick]: !willDrop,

				[styles.disabledBrick]: disabled,
				[styles.largeBrick]: size === "large",
				[styles.lastBrick]: isLastBrick,
			}
		)}
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
				[styles.lastBrickInner]: isLastBrick,
			})}
		>
			{!disabled && !isLastBrick && (
				<div className={styles.brickShadow}></div>
			)}
			{cracked && color?.key === "normal" && (
				<LightCrack isSmall={size === "small"} />
			)}
			{cracked && color?.key === "dark" && (
				<DarkCrack isSmall={size === "small"} />
			)}
			<div className={styles.text}>{text}</div>
		</div>
	</div>
);

export default Brick;
