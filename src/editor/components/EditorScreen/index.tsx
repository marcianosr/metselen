import Editor from "../Editor";

import styles from "./styles.module.css";

type EditorScreenProps = {};

const EditorScreen: React.FC<EditorScreenProps> = () => {
	return (
		<section className={styles.editorScreen}>
			<section className={styles.editorContainer}>
				<Editor />
			</section>
		</section>
	);
};

export default EditorScreen;
