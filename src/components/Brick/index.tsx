import React, { CSSProperties } from "react";
import classnames from "classnames";
import { BrickType, RandomColorType } from "../../types/Bricks";
import { LightCrack, DarkCrack } from "./Cracks";
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
	x?: number;
	y?: number;
};


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
	x, y
}) => (
	<div
		key={id}
		onClick={onClick}
		style={
			{
				"--x": x,
				"--y": y,
			} as CSSProperties
		}
		className={classnames(styles.brickContainer, [styles[`${size}`]], {
			[styles.dropBrick]: willDrop,
			[styles.hardShakeBrick]:
				currentBrick?.hardShake?.length &&
				currentBrick?.hardShake.includes(id),

			// [styles.dropBrick]: !willDrop,

			[styles.disabledBrick]: disabled,
			[styles.lastBrick]: isLastBrick,
		})}
	>
		<div
			style={
				{
					"--defaultBrickColor": color?.values[0],
					"--secondBrickColor": color?.values[1],
				} as CSSProperties
			}
			className={classnames(styles.brick, {
				// [styles.dropBrick]: willDrop,
				[styles.crackedBrick]: cracked,
				[styles.currentBrick]: currentBrick?.id === id,
				[styles.disabledBrickInner]: disabled,
				[styles.lastBrickInner]: isLastBrick,
				[styles.brickIsClickable]: onClick,
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
