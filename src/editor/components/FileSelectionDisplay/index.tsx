import { FilesStateType } from "../FileSelectionContainer";
import styles from "./styles.module.css";

type FileSelectionDisplayProps = {
	files: FilesStateType;
	loadFile: (file: string) => void;
	onClickRemoveFile: (e: React.MouseEvent, file: string) => void;
};

const FileSelectionDisplay: React.FC<FileSelectionDisplayProps> = ({
	files,
	loadFile,
	onClickRemoveFile,
}) => (
	<section>
		<h1>Files</h1>
		<ul>
			<h3>Levels</h3>
			{files.levels.map((file, idx) => (
				<>
					<li key={idx}>
						<span
							className={styles.filename}
							onClick={() => loadFile(file)}
						>
							{file}
						</span>
						<button
							type="button"
							onClick={(e: React.MouseEvent) => {
								onClickRemoveFile(e, file);
							}}
						>
							Remove
						</button>
					</li>
				</>
			))}
		</ul>
		<ul>
			<h3>Worlds</h3>
			{files.worlds.map((file, idx) => (
				<>
					<li key={idx}>
						<span
							className={styles.filename}
							onClick={() => loadFile(file)}
						>
							{file}
						</span>
						<button
							type="button"
							onClick={(e: React.MouseEvent) =>
								onClickRemoveFile(e, file)
							}
						>
							Remove
						</button>
					</li>
				</>
			))}
		</ul>
	</section>
);

export default FileSelectionDisplay;
