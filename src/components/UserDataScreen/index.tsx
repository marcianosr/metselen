import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "react-use";
import React, { ChangeEvent, useState } from "react";
import { useGameState } from "../../providers/GameStateProvider";
import styles from "./styles.module.css";

type Level = {
	score: number;
};

type World = {
	score: number;
	levels: Level[];
};

export type SaveGameState = {
	id: string;
	username: string;
	worlds: World[];
};

const INITIAL_SAVE_GAME_DATA: SaveGameState = {
	id: uuidv4(),
	username: "",
	worlds: [
		{
			score: 0,
			levels: [
				{
					score: 0,
				},
			],
		},
	],
};

const UserDataScreen: React.FC = () => {
	const { updateGameState } = useGameState();
	const [saveGameState, setSaveGameState] = useLocalStorage<
		Partial<SaveGameState>
	>("saveGameState", INITIAL_SAVE_GAME_DATA);
	const [error, setError] = useState("");
	const [username, setUsername] = useState("");

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const onSubmit = () => {
		if (username.length < 2) {
			setError("Je naam is vast niet korter dan 2 letters!");
			return;
		}

		setSaveGameState({
			...saveGameState,
			username,
		});
		updateGameState("screen", { current: "levelSelection" });
	};

	return (
		<main>
			<h1 className={styles.gameTitle}>
				<span>M</span>
				<span>E</span>
				<span>T</span>
				<span>S</span>
				<span>E</span>
				<span>L</span>
				<span>E</span>
				<span>N</span>
			</h1>

			<section className={styles.formContainer}>
				<h2 className={styles.title}>Wat is je naam?</h2>

				<section className={styles.inputNameContainer}>
					<div>
						<div>{error}</div>

						<input
							type="text"
							name="username"
							value={username}
							className={classNames(styles.input, {
								[styles.error]: error,
							})}
							onChange={onChange}
						/>
					</div>
					<button
						onClick={onSubmit}
						type="button"
						className={styles.button}
					>
						<span className={styles.buttonText}>Verder</span>
					</button>
				</section>
			</section>
		</main>
	);
};

export default UserDataScreen;
