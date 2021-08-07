import { useState } from "react";
import EditorScreen from "../components/EditorScreen";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {
	EditorState,
	EditorStateProvider,
} from "../../providers/EditorStateProvider";

const EditorPage = () => {
	const [editorFileData, setEditorFileData] = useState<EditorState[]>([]);
	const isLoaded = Object.keys(editorFileData).length > 0;

	return (
		<EditorStateProvider>
			<NavigationBar
				editorFileData={editorFileData}
				setEditorFileData={setEditorFileData}
			/>
			<EditorScreen isLoaded={isLoaded} />
		</EditorStateProvider>
	);
};

export default EditorPage;
