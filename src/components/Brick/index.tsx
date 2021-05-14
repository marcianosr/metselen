import React, { CSSProperties } from "react";
import classnames from "classnames";
import { BrickType, RandomColorType } from "../../types/Bricks";
import { LightCrack, DarkCrack } from "./Cracks";
import styles from "../BrickContainer/styles.module.css";
import typographyStyles from "../../typography.module.css";

type BrickProps = {
	id: number;
	currentBrick?: BrickType;
	size: string;
	willDrop: boolean;
	color: RandomColorType | undefined;
	cracked?: boolean;
	sum: string;
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
	sum
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
					"--defaultBrickColor": color?.values[0],
					"--secondBrickColor": color?.values[1],
				} as CSSProp
			}
			className={classnames(styles.brick, {
				// [styles.dropBrick]: willDrop,
				[styles.crackedBrick]: cracked,
				[styles.currentBrick]: currentBrick?.id === id,
			})}
		>
			<div className={styles.brickShadow}></div>
			<div className={classnames(typographyStyles.defaultText, styles.sum)}>{sum}</div>
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
