import { Dispatch, SetStateAction } from "react";
import FileSelectionContainer from "../FileSelectionContainer";
import { ModeManager } from "../../../App";
import { EditorState } from "../../../providers/EditorStateProvider";

type NavigationBarProps = {
	editorFileData: EditorState[];
	setEditorFileData: Dispatch<SetStateAction<EditorState[]>>;
};

const NavigationBar: React.FC<NavigationBarProps> = ({
	editorFileData,
	setEditorFileData,
}) => (
	<>
		<ModeManager />
		<FileSelectionContainer
			editorFileData={editorFileData}
			setEditorFileData={setEditorFileData}
		/>
	</>
);

export default NavigationBar;
