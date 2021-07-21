import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLevelConfigState, LevelConfigState } from "../../../providers/LevelConfigProvider";
import Grid from "../Grid";
import InputGroup from "../InputGroup";
import Inventory from "../Inventory";
import LevelInfoGroup from "../LevelInfoGroup";
import ConfirmSaveModal from "../ConfirmSaveModal";
import Button from "../../../components/Button";

type LevelDraftState = LevelConfigState;

const Editor = () => {
	const {
		levelConfigState,
		updateLevelConfigStateMultiple
	} = useLevelConfigState();
	const [warningMessage, setWarningMessage] = useState("");
	const [showErrorModal, setShowErrorModal] = useState(false)

	const [levelDraft, setLevelDraft] = React.useState<LevelDraftState>(
		levelConfigState
	);

	const confirmSave = async () => {
		axios.post("/check", { level: levelDraft, }).then(response => {
			console.info('%c%s', 'background-color: green; color: #90de90', "✅ Succces /check endpoint: ", response);
			return response;
		}).catch((error) => {
			console.error("Error /check endpoint: ", error.response);
			if (error.response.status === 400) setShowErrorModal(true);
			setWarningMessage(`${error.response.data.message}. Do you want to overwrite this level data?`);
			return error.response.data
		});
	}

	const saveLevel = () => {
		axios.post("/write", { level: levelDraft, }).then(response => {
			console.info('%c%s', 'background-color: green; color: #90de90', "✅ Succes /write endpoint: ", response);
			setShowErrorModal(false);
			return response;
		}).catch((error) => {
			console.error("Error /write endpoint: ", error.response.data);
			return error.response.data
		});

		updateLevelConfigStateMultiple({
			...levelConfigState,
			...levelDraft
		});
	}

	return (
		<>
			<LevelInfoGroup />
			<Grid levelDraft={levelDraft} setLevelDraft={setLevelDraft} />
			{/* <Inventory direction="horizontal">
				<BrickInventory />
			</Inventory> */}
			<Inventory>
				<InputGroup
					label="Level name"
					value={levelDraft.name}
					type="text"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setLevelDraft({
							...levelDraft,
							name: e.target.value
						})
					}
				/>
				<InputGroup
					label="Time"
					value={levelDraft.time}
					type="number"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setLevelDraft({
							...levelDraft,
							time: parseInt(e.target.value)
						})
					}
				/>

				<Button variant="brick" onClick={() => confirmSave()}>Save level</Button>

			</Inventory>
			{showErrorModal && <ConfirmSaveModal hideModal={() => setShowErrorModal(false)} saveLevel={saveLevel} warningMessage={warningMessage} />}

		</>
	);
};

export default Editor;
