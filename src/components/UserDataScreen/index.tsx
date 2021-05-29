import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import React, { ChangeEvent, useState } from "react";
import { useGameState } from "../../providers/GameStateProvider";
import styles from "./styles.module.css";

const UserDataScreen: React.FC = () => {
	const { updateGameState } = useGameState();
	const [user, setUser] = useState({
		id: uuidv4(),
		name: "",
		scores: {
			bricks: 0,
			levels: [],
		},
	});
	const [error, setError] = useState("");

	const onChange = (e: ChangeEvent<HTMLInputElement>) =>
		setUser({ ...user, name: e.target.value });

	const onSubmit = () => {
		if (user.name.length < 2) {
			setError("Je naam is vast niet korter dan 2 letters!");
			return;
		}

		localStorage.setItem("user", JSON.stringify(user));
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
							value={user.name}
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
