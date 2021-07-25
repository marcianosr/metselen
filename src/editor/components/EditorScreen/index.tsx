import Editor from "../Editor";

import styles from "./styles.module.css";

const EditorScreen = () => (
	<section className={styles.editorScreen}>
		<section className={styles.editorContainer}>
			<Editor />
		</section>
	</section>
);

export default EditorScreen;
