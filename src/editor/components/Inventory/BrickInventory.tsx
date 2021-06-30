import React from "react";
import { BrickType, pinkSchemeColors, BrickSizes } from "../../../types/Bricks";
import Brick from "../../../components/Brick";

import styles from "./styles.module.css";
import Modal from "../../../components/Modal";
import classNames from "classnames";

const brickTypes: BrickType[] = [
	{
		id: 1,
		size: "verySmall",
		color: {
			key: "1",
			values: [...pinkSchemeColors.normal],
		},
	},
	{
		id: 2,
		size: "small",
		color: {
			key: "1",
			values: [...pinkSchemeColors.normal],
		},
	},
	{
		id: 3,
		size: "medium",
		color: {
			key: "1",
			values: [...pinkSchemeColors.normal],
		},
	},
	{
		id: 4,
		size: "large",
		color: {
			key: "1",
			values: [...pinkSchemeColors.normal],
		},
	},
	{
		id: 5,
		size: "veryLarge",
		color: {
			key: "1",
			values: [...pinkSchemeColors.normal],
		},
	},
];

type BrickInventoryProps = {
	selectedSize: BrickSizes;
	setSelectedSize: (size: BrickSizes) => void;
	setShowInventory: (show: boolean) => void
};

const BrickInventory: React.FC<BrickInventoryProps> = ({ selectedSize, setSelectedSize, setShowInventory }) => {
	const hideInventory = () => setShowInventory(false);

	return (
		<Modal onClickBackdrop={hideInventory}>
			<section className={styles.modalContainer}>
				<ul className={styles.brickInventoryContainer}>
					{brickTypes.map((brick: BrickType) => (
						<li onClick={() => {
							setSelectedSize(brick.size);
							hideInventory();
						}} className={classNames(styles.listItem, {
							[styles.selected]:
								brick.size === selectedSize
						})}>
							<Brick
								id={brick.id}
								color={brick?.color}
								size={brick.size}
							/>
							<span className={styles.brickSizeText}>{brick.size}</span>
						</li>
					))}
				</ul>
			</section>

		</Modal>

	);
};

export default BrickInventory;
