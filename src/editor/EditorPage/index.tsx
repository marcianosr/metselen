import { useState } from "react";
import EditorScreen from "../components/EditorScreen";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {
	EditorState,
	EditorStateProvider,
} from "../../providers/EditorStateProvider";
import { FilesStateProvider } from "../../providers/FilesStateProvider";

const EditorPage = () => {
	const [editorFileData, setEditorFileData] = useState<EditorState[]>([]); // current opened file
	const isLoaded = Object.keys(editorFileData).length > 0;

	return (
		<FilesStateProvider>
			<EditorStateProvider>
				<NavigationBar
					editorFileData={editorFileData}
					setEditorFileData={setEditorFileData}
				/>
				<EditorScreen isLoaded={isLoaded} />
			</EditorStateProvider>
		</FilesStateProvider>
	);
};

export default EditorPage;
