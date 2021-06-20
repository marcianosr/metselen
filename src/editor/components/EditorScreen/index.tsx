import { LevelConfigStateProvider } from "../../../providers/LevelConfigProvider";
import Editor from "../Editor";

import styles from "./styles.module.css";

const EditorScreen = () => {
	return (
		<LevelConfigStateProvider>
			<section className={styles.editorScreen}>
				<section className={styles.editorContainer}>
					<Editor />
				</section>
			</section>
		</LevelConfigStateProvider>
	);
};

export default EditorScreen;
