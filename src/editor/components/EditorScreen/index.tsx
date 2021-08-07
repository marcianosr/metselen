import Editor from "../Editor";

import styles from "./styles.module.css";

type EditorScreenProps = {
	isLoaded: boolean;
};

const EditorScreen: React.FC<EditorScreenProps> = ({ isLoaded }) => {
	return (
		<section className={styles.editorScreen}>
			<section className={styles.editorContainer}>
				{isLoaded && <Editor />}
			</section>
		</section>
	);
};

export default EditorScreen;
