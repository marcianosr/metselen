import axios from "axios";
import { useEffect, useState } from "react";
import { useLevelConfigState } from "../../../providers/LevelConfigProvider";
import EditorScreen from "../EditorScreen";
import FileSelectionDisplay from "../FileSelectionDisplay";
import styles from "./styles.module.css";

export type FilesStateType = {
	worlds: string[];
	levels: string[];
};

type FilesResponse = {
	files: string[];
};

const FileSelectionContainer: React.FC = () => {
	const { levelConfigState, updateLevelConfigStateMultiple } =
		useLevelConfigState();
	const [files, setFiles] = useState<FilesStateType>({
		worlds: [],
		levels: [],
	});
	const [levelData, setLevelData] = useState({});
	console.log(levelData);

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
		updateLevelConfigStateMultiple({
			...levelConfigState,
			...levelData,
		});
	}, [levelData]);

	const loadFile = (file: string) => {
		axios
			.post("/file", { file })
			.then((response) => {
				setLevelData(JSON.parse(response.data.level).data);
			})
			.catch((error) => console.log(error));
	};

	return (
		<section className={styles.fileSelection}>
			<FileSelectionDisplay files={files} loadFile={loadFile} />
			{Object.keys(levelData).length > 0 && <EditorScreen />}
		</section>
	);
};

export default FileSelectionContainer;
