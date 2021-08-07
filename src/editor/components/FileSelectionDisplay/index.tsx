import { FilesStateType } from "../FileSelectionContainer";

type FileSelectionDisplayProps = {
	files: FilesStateType;
	loadFile: (file: string) => void;
};

const FileSelectionDisplay: React.FC<FileSelectionDisplayProps> = ({
	files,
	loadFile,
}) => (
	<section>
		<h1>Files</h1>
		<ul>
			<h3>Worlds</h3>
			{files.levels.map((file, idx) => (
				<li key={idx} onClick={() => loadFile(file)}>
					{file}
				</li>
			))}
		</ul>
		<ul>
			<h3>Levels</h3>
			{files.worlds.map((file, idx) => (
				<li key={idx} onClick={() => loadFile(file)}>
					{file}
				</li>
			))}
		</ul>
	</section>
);

export default FileSelectionDisplay;
