import React, { ChangeEvent, useState } from "react";
import styles from "./styles.module.css";

const UserDataScreen = () => {
	const [name, setName] = useState("");

	const onChange = (e: ChangeEvent<HTMLInputElement>) =>
		setName(e.target.value);

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
					<input
						type="text"
						name="username"
						value={name}
						className={styles.input}
						onChange={onChange}
					/>
					<div className={styles.line} />

					<button type="button" className={styles.button}>
						<span className={styles.buttonText}>Verder</span>
					</button>
				</section>
			</section>
		</main>
	);
};

export default UserDataScreen;
