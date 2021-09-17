import React, { ChangeEvent } from "react";
import styles from "./styles.module.css";

type InputProps = {
	label: string;
	type: "number" | "text" | "checkbox" | "radio";
	id?: string;
	name?: string;
	value: number | string;
	checked?: boolean;
	onChange: (value: ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
	label,
	type,
	id,
	name,
	value,
	checked,
	onChange,
}) => (
	<div className={styles.inputContainer}>
		<label htmlFor={label}>{label}</label>
		<input
			type={type}
			id={id}
			name={name}
			value={value}
			checked={checked}
			onChange={onChange}
		/>
	</div>
);

export default Input;
