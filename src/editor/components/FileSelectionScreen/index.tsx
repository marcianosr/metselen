import axios from "axios";
import { useEffect, useState } from "react";
import { useLevelConfigState } from "../../../providers/LevelConfigProvider";
import EditorScreen from "../EditorScreen";

type Files = {
	files: string[];
};

const FileSelectionScreen: React.FC = () => {
	const { levelConfigState, updateLevelConfigStateMultiple } =
		useLevelConfigState();
	const [files, setFiles] = useState<Files>({
		files: [],
	});
	const [levelData, setLevelData] = useState({});

	useEffect(() => {
		axios
			.get<Files>("/files")
			.then((response) => {
				setFiles(response.data);
			})
			.catch((error) => console.log(error));
	}, []);

	useEffect(() => {
		updateLevelConfigStateMultiple({
			...levelConfigState,
			...levelData,
		});
	}, [levelData]);

	const loadLevel = (file: string) => {
		axios
			.post("/file", { file })
			.then((response) => {
				setLevelData(JSON.parse(response.data.level).data);
			})
			.catch((error) => console.log(error));
	};

	return (
		<>
			<h1>Files</h1>
			<ul>
				{files.files.map((file, idx) => (
					<li key={idx} onClick={() => loadLevel(file)}>
						{file}
					</li>
				))}
				{Object.keys(levelData).length > 0 && <EditorScreen />}
			</ul>
		</>
	);
};

export default FileSelectionScreen;
