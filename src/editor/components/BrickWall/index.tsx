import { CSSProperties } from "react";

import styles from "./styles.module.css";
import { useLevelConfigState } from "../../../providers/LevelConfigProvider";
import { BrickRow } from "../../../components/BrickRowContainer";
import Brick from "../../../components/Brick";
import { TransparentBrick } from "../Brick";

// Getting a test layoout for now.
// This will be a file based on the edits of a user
// I now want to make a brick grid
//

export interface CSSVars extends CSSProperties {
	"--columns": number;
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
				{levelConfigState.layout.map((row: any, rowIdx: number) => {
					return (
						<>
							<BrickRow idx={rowIdx} row={row.order}>
								{row.bricks.map((brick: any, idx: number) => {
									return (
										<>
											<Brick
												key={idx}
												id={idx}
												size={brick.size}
												text={brick.size}
												color={{
													key: "1",
													values: [
														"#ff0000",
														"#ff00ff",
													],
												}}
											/>
										</>
									);
								})}
							</BrickRow>
						</>
					);
				})}
			</section>
		</>
	);
};

export default BrickWall;
