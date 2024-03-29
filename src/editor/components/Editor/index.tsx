import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import {
	useEditorState,
	EditorState,
} from "../../../providers/EditorStateProvider";
import Grid from "../Grid";
import Inventory from "../Inventory";
import LevelInfoGroup from "../LevelInfoGroup";
import ConfirmSaveModal from "../ConfirmSaveModal";
import Button from "../../../components/Button";
import styles from "./styles.module.css";
import LevelInventory from "../Inventory/LevelInventory";
import WorldInventory from "../Inventory/WorldInventory";
import {
	useFilesState,
	FilesState,
} from "../../../providers/FilesStateProvider";

export type EditorDraftState = EditorState;

const Editor = () => {
	const { editorState, updateEditorStateMultiple } = useEditorState();
	const [warningMessage, setWarningMessage] = useState("");
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [editorDraftState, setEditorDraftState] =
		useState<EditorDraftState>(editorState);
	const { filesState, updateFilesStateMultiple } = useFilesState();

	const [toggleInventories, setToggleInventories] = useState(false);
	const inventoriesAreShown = toggleInventories === true;
	const isLevelOrWorld =
		editorDraftState.type !== "level" ? "level" : "world";

	// Load levels!
	useEffect(() => {
		setEditorDraftState(editorState);
	}, [editorState]);

	const confirmSave = async () => {
		axios
			.post("/check", { data: editorDraftState })
			.then((response) => {
				console.info(
					"%c%s",
					"background-color: green; color: #90de90",
					"✅ Succces /check endpoint: ",
					response
				);

				const type = `${
					response.data.filename.split("-")[0]
				}s` as keyof FilesState;

				updateFilesStateMultiple({
					...filesState,
					[type]: [...filesState[type], response.data.filename],
				});
				return response;
			})
			.catch((error) => {
				console.error("Error /check endpoint: ", error.response);
				if (error.response.status === 400) setShowConfirmModal(true);
				setWarningMessage(
					`${error.response.data.message}. Do you want to overwrite this level data?`
				);
				return error.response.data;
			});
	};

	const switchTo = () =>
		setEditorDraftState({
			...editorDraftState,
			type: isLevelOrWorld,
		});

	const saveLevel = () => {
		axios
			.post("/write", { data: editorDraftState })
			.then((response) => {
				console.info(
					"%c%s",
					"background-color: green; color: #90de90",
					"✅ Succes /write endpoint: ",
					response
				);
				setShowConfirmModal(false);
				return response;
			})
			.catch((error) => {
				console.error("Error /write endpoint: ", error.response.data);
				return error.response.data;
			});

		updateEditorStateMultiple({
			...editorState,
			...editorDraftState,
		});
	};

	useEffect(() => {
		const handleHKeyPress = (e: KeyboardEvent): boolean | void =>
			e.key === "h" && setToggleInventories(!toggleInventories);

		window.addEventListener("keydown", handleHKeyPress);

		return () => window.removeEventListener("keydown", handleHKeyPress);
	});

	return (
		<>
			<LevelInfoGroup editorDraftState={editorDraftState} />
			<Grid
				editorDraftState={editorDraftState}
				setEditorDraftState={setEditorDraftState}
			/>
			{inventoriesAreShown && (
				<Inventory>
					<h1 className={styles.title}>
						Create {editorDraftState.type}
					</h1>
					<button type="button" onClick={switchTo}>
						Switch to {isLevelOrWorld}
					</button>
					{editorDraftState.type === "level" && (
						<LevelInventory
							editorDraftState={editorDraftState}
							setEditorDraftState={setEditorDraftState}
						/>
					)}

					{editorDraftState.type === "world" && (
						<WorldInventory
							editorDraftState={editorDraftState}
							setEditorDraftState={setEditorDraftState}
						/>
					)}
					<Button variant="brick" onClick={() => confirmSave()}>
						Save level
					</Button>
				</Inventory>
			)}

			{showConfirmModal &&
				createPortal(
					<ConfirmSaveModal
						hideModal={() => setShowConfirmModal(false)}
						confirm={saveLevel}
						warningMessage={warningMessage}
					/>,
					document.body
				)}
		</>
	);
};

export default Editor;
