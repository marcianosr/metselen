import { Dispatch, SetStateAction } from "react";
import FileSelectionContainer from "../FileSelectionContainer";
import { ModeManager } from "../../../App";
import { EditorState } from "../../../providers/EditorStateProvider";
import styles from "./styles.module.css";

type NavigationBarProps = {
	editorFileData: EditorState[];
	setEditorFileData: Dispatch<SetStateAction<EditorState[]>>;
};

const NavigationBar: React.FC<NavigationBarProps> = ({
	editorFileData,
	setEditorFileData,
}) => (
	<nav className={styles.navigation}>
		<ul className={styles.navigationList}>
			<li className={styles.navigationListItem}>
				<FileSelectionContainer
					editorFileData={editorFileData}
					setEditorFileData={setEditorFileData}
				/>
			</li>
			<li className={styles.navigationListItem}>
				<ModeManager />
			</li>
		</ul>
	</nav>
);

export default NavigationBar;
