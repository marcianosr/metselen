import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
	EditorState,
	useEditorState,
} from "../../../providers/EditorStateProvider";
import FileSelectionDisplay from "../FileSelectionDisplay";
import styles from "./styles.module.css";

export type FilesStateType = {
	worlds: string[];
	levels: string[];
};

type FilesResponse = {
	files: string[];
};

type FileSelectionContainerProps = {
	editorFileData: EditorState[];
	setEditorFileData: Dispatch<SetStateAction<EditorState[]>>;
};

const FileSelectionContainer: React.FC<FileSelectionContainerProps> = ({
	editorFileData,
	setEditorFileData,
}) => {
	const { editorState, updateEditorStateMultiple } = useEditorState();
	const [files, setFiles] = useState<FilesStateType>({
		worlds: [],
		levels: [],
	});

	const getLevels = () => axios.get<FilesResponse>("/files/levels");
	const getWorlds = () => axios.get<FilesResponse>("/files/worlds");

	useEffect(() => {
		Promise.all([getLevels(), getWorlds()]).then((response) => {
			console.log(response);
			setFiles({
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
				setEditorFileData(JSON.parse(response.data.level).data);
			})
			.catch((error) => console.log(error));
	};

	return (
		<section className={styles.fileSelection}>
			<FileSelectionDisplay files={files} loadFile={loadFile} />
		</section>
	);
};

export default FileSelectionContainer;
