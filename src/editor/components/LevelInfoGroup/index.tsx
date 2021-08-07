import { EditorDraftState } from "../Editor";
import styles from "./styles.module.css";

type LevelInfoGroupProps = {
	editorDraftState: EditorDraftState;
};

const LevelInfoGroup: React.FC<LevelInfoGroupProps> = ({
	editorDraftState,
}) => (
	<section className={styles.levelInfoGroup}>
		{console.log("Ed", editorDraftState)}
		<h1 className={styles.title}>{editorDraftState.type} editor</h1>
		<h2 className={styles.smallTitle}>
			World {editorDraftState.worldNumber} Level{" "}
			{editorDraftState.levelNumber} - {editorDraftState.name}
		</h2>
	</section>
);

export default LevelInfoGroup;
