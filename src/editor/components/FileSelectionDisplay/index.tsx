import { FilesStateType } from "../FileSelectionContainer";

type FileSelectionDisplayProps = {
	files: FilesStateType;
	loadFile: (file: string) => void;
	removeFile: (e: React.MouseEvent, file: string) => void;
};

const FileSelectionDisplay: React.FC<FileSelectionDisplayProps> = ({
	files,
	loadFile,
	removeFile,
}) => (
	<section>
		<h1>Files</h1>
		<ul>
			<h3>Levels</h3>
			{files.levels.map((file, idx) => (
				<>
					<li key={idx} onClick={() => loadFile(file)}>
						<span>{file}</span>
					</li>
					<button
						type="button"
						onClick={(e: React.MouseEvent) => removeFile(e, file)}
					>
						Remove
					</button>
				</>
			))}
		</ul>
		<ul>
			<h3>Worlds</h3>
			{files.worlds.map((file, idx) => (
				<>
					<li key={idx} onClick={() => loadFile(file)}>
						<span>{file}</span>
					</li>
					<button
						type="button"
						onClick={(e: React.MouseEvent) => removeFile(e, file)}
					>
						Remove
					</button>
				</>
			))}
		</ul>
	</section>
);

export default FileSelectionDisplay;
