import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	useLevelConfigState,
	LevelConfigState,
} from "../../../providers/LevelConfigProvider";
import Grid from "../Grid";
import InputGroup from "../InputGroup";
import Inventory from "../Inventory";
import LevelInfoGroup from "../LevelInfoGroup";
import ConfirmSaveModal from "../ConfirmSaveModal";
import Button from "../../../components/Button";
import styles from "./styles.module.css";

export type LevelDraftState = LevelConfigState;

const Editor = () => {
	const { levelConfigState, updateLevelConfigStateMultiple } =
		useLevelConfigState();
	const [warningMessage, setWarningMessage] = useState("");
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [levelDraftState, setLevelDraftState] =
		useState<LevelDraftState>(levelConfigState);

	const [toggleInventories, setToggleInventories] = useState(false);
	const inventoriesAreShown = toggleInventories === true;

	// Load levels!
	useEffect(() => {
		setLevelDraftState(levelConfigState);
	}, [levelConfigState]);

	const confirmSave = async () => {
		axios
			.post("/check", { level: levelDraftState })
			.then((response) => {
				console.info(
					"%c%s",
					"background-color: green; color: #90de90",
					"✅ Succces /check endpoint: ",
					response
				);
				return response;
			})
			.catch((error) => {
				console.error("Error /check endpoint: ", error.response);
				if (error.response.status === 400) setShowErrorModal(true);
				setWarningMessage(
					`${error.response.data.message}. Do you want to overwrite this level data?`
				);
				return error.response.data;
			});
	};

	const saveLevel = () => {
		axios
			.post("/write", { level: levelDraftState })
			.then((response) => {
				console.info(
					"%c%s",
					"background-color: green; color: #90de90",
					"✅ Succes /write endpoint: ",
					response
				);
				setShowErrorModal(false);
				return response;
			})
			.catch((error) => {
				console.error("Error /write endpoint: ", error.response.data);
				return error.response.data;
			});

		updateLevelConfigStateMultiple({
			...levelConfigState,
			...levelDraftState,
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
			<LevelInfoGroup levelDraftState={levelDraftState} />
			<Grid
				levelDraftState={levelDraftState}
				setLevelDraftState={setLevelDraftState}
			/>
			{inventoriesAreShown && (
				<Inventory>
					<h1 className={styles.title}>Create level</h1>
					<InputGroup
						label="Level name"
						value={levelDraftState.name}
						type="text"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setLevelDraftState({
								...levelDraftState,
								name: e.target.value,
							})
						}
					/>
					<InputGroup
						label="Time"
						value={levelDraftState.time}
						type="number"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setLevelDraftState({
								...levelDraftState,
								time: parseInt(e.target.value),
							})
						}
					/>
					<InputGroup
						label="Is level unlocked"
						value={"isUnlocked"}
						type="checkbox"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setLevelDraftState({
								...levelDraftState,
								isUnlocked: false,
							})
						}
					/>
					<InputGroup
						label="Bricks needed to unlock"
						value={levelDraftState.bricksNeeded}
						type="number"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setLevelDraftState({
								...levelDraftState,
								bricksNeeded: parseInt(e.target.value),
							})
						}
					/>

					<div className={styles.inputGroup}>
						<InputGroup
							label="World"
							value={levelDraftState.worldNumber}
							type="number"
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) =>
								setLevelDraftState({
									...levelDraftState,
									worldNumber: parseInt(e.target.value),
								})
							}
						/>
						<InputGroup
							label="Level"
							value={levelDraftState.levelNumber}
							type="number"
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) =>
								setLevelDraftState({
									...levelDraftState,
									levelNumber: parseInt(e.target.value),
								})
							}
						/>
					</div>
					<Button variant="brick" onClick={() => confirmSave()}>
						Save level
					</Button>
				</Inventory>
			)}
			{showErrorModal && (
				<ConfirmSaveModal
					hideModal={() => setShowErrorModal(false)}
					saveLevel={saveLevel}
					warningMessage={warningMessage}
				/>
			)}
		</>
	);
};

export default Editor;
