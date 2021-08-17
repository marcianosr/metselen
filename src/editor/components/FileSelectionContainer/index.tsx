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
				setEditorFileData(JSON.parse(response.data.file).data);
			})
			.catch((error) => console.log(error));
	};

	const removeFile = (_: React.MouseEvent, file: string) => {
		axios
			.post("/remove", { fileToBeDeleted: file })
			.then((response) => {
				const type = `${file.split("-")[0]}s`;
				// TODO: https://stackoverflow.com/questions/32968332/how-do-i-prevent-the-error-index-signature-of-object-type-implicitly-has-an-an
				const updateFilelist = (files as any)[type].filter(
					(f: string) => f !== file
				);

				setFiles({ ...files, [type]: updateFilelist });
			})
			.catch((error) => console.log(error));
	};

	return (
		<section className={styles.fileSelection}>
			<FileSelectionDisplay
				files={files}
				loadFile={loadFile}
				removeFile={removeFile}
			/>
		</section>
	);
};

export default FileSelectionContainer;
