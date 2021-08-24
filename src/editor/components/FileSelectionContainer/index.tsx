import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
	EditorState,
	useEditorState,
} from "../../../providers/EditorStateProvider";
import { useFilesState } from "../../../providers/FilesStateProvider";
import ConfirmSaveModal from "../ConfirmSaveModal";
import FileSelectionDisplay from "../FileSelectionDisplay";
import styles from "./styles.module.css";

type FilesResponse = {
	files: string[];
};

type FileSelectionContainerProps = {
	editorFileData: EditorState[];
	setEditorFileData: Dispatch<SetStateAction<EditorState[]>>;
	setShowEditor: Dispatch<SetStateAction<boolean>>;
};

const FileSelectionContainer: React.FC<FileSelectionContainerProps> = ({
	editorFileData,
	setEditorFileData,
	setShowEditor,
}) => {
	const { editorState, updateEditorStateMultiple } = useEditorState();
	const { filesState, updateFilesStateMultiple } = useFilesState();

	const [showWarningModal, setShowWarningModal] = useState(false);
	const [fileToRemove, setFileToRemove] = useState("");

	const getLevels = () => axios.get<FilesResponse>("/files/levels");
	const getWorlds = () => axios.get<FilesResponse>("/files/worlds");

	useEffect(() => {
		Promise.all([getLevels(), getWorlds()]).then((response) => {
			updateFilesStateMultiple({
				levels: response.map((res) => res.data.files)[0],
				worlds: response.map((res) => res.data.files)[1],
			});
		});
	}, []);

	useEffect(() => {
		updateEditorStateMultiple({
			...editorState,
			...editorFileData,
		});
	}, [editorFileData]);

	const loadFile = (file: string) => {
		axios
			.post("/file", { file })
			.then((response) => {
				setEditorFileData(JSON.parse(response.data.file).data);
				setShowEditor(true);
			})
			.catch((error) => console.log("Error loading file...", error));
	};

	const onClickRemoveFile = (_: React.MouseEvent, file: string) => {
		setFileToRemove(file);
		setShowWarningModal(true);
	};

	const confirmRemoveFile = () => {
		axios
			.post("/remove", { fileToRemove })
			.then((response) => {
				const type = `${fileToRemove.split("-")[0]}s`;

				// TODO: https://stackoverflow.com/questions/32968332/how-do-i-prevent-the-error-index-signature-of-object-type-implicitly-has-an-an
				const updateFilelist = (filesState as any)[type].filter(
					(f: string) => f !== fileToRemove
				);
				setShowWarningModal(false);
				updateFilesStateMultiple({
					...filesState,
					[type]: updateFilelist,
				});
			})
			.catch((error) => console.log(error));
	};

	return (
		<section className={styles.fileSelection}>
			<FileSelectionDisplay
				files={filesState}
				loadFile={loadFile}
				onClickRemoveFile={onClickRemoveFile}
				setShowEditor={setShowEditor}
			/>
			{showWarningModal && (
				<ConfirmSaveModal
					hideModal={() => setShowWarningModal(false)}
					confirm={confirmRemoveFile}
					warningMessage={
						"Are you sure you want to delete this file?"
					}
				/>
			)}
		</section>
	);
};

export default FileSelectionContainer;
