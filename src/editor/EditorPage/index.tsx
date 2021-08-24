import { useState } from "react";
import EditorScreen from "../components/EditorScreen";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {
	EditorState,
	EditorStateProvider,
} from "../../providers/EditorStateProvider";
import { FilesStateProvider } from "../../providers/FilesStateProvider";
import styles from "./styles.module.css";

const EditorPage = () => {
	const [editorFileData, setEditorFileData] = useState<EditorState[]>([]); // current opened file
	const [showEditor, setShowEditor] = useState(false);

	return (
		<FilesStateProvider>
			<EditorStateProvider>
				<NavigationBar
					editorFileData={editorFileData}
					setEditorFileData={setEditorFileData}
					setShowEditor={setShowEditor}
				/>
				{!showEditor && (
					<h1 className={styles.title}>
						Create a new file or load saved files
					</h1>
				)}
				{showEditor && <EditorScreen />}
			</EditorStateProvider>
		</FilesStateProvider>
	);
};

export default EditorPage;
