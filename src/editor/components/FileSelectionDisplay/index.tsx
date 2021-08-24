import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { FilesState } from "../../../providers/FilesStateProvider";
import styles from "./styles.module.css";

type FileSelectionDisplayProps = {
	files: FilesState;
	loadFile: (file: string) => void;
	onClickRemoveFile: (e: React.MouseEvent, file: string) => void;
	setShowEditor: Dispatch<SetStateAction<boolean>>;
};

const FileSelectionDisplay: React.FC<FileSelectionDisplayProps> = ({
	files,
	loadFile,
	onClickRemoveFile,
	setShowEditor,
}) => {
	const [showFileList, setShowFileList] = useState(false);
	const toggleFileDisplay = () => setShowFileList(!showFileList);
	const setupEmptyEditor = () => setShowEditor(true);

	return (
		<section>
			<button onClick={toggleFileDisplay}>Files</button>
			<button onClick={setupEmptyEditor}>Create new</button>
			{showFileList && (
				<div className={styles.fileSelectionDisplay}>
					<section className={styles.fileSelectionDisplayContainer}>
						<button
							className={styles.close}
							onClick={toggleFileDisplay}
						>
							Close
						</button>
						<ul>
							<h3>Levels</h3>
							{files.levels.map((file, idx) => (
								<Fragment key={idx}>
									<li>
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
								</Fragment>
							))}
						</ul>
						<ul>
							<h3>Worlds</h3>
							{files.worlds.map((file, idx) => (
								<Fragment key={idx}>
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
								</Fragment>
							))}
						</ul>
					</section>
				</div>
			)}
		</section>
	);
};
export default FileSelectionDisplay;
