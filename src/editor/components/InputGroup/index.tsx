import React, { ChangeEvent } from "react";
import Input from "../Input";
import styles from "./styles.module.css";

type InputGroupProps = {
	label: string;
	value: number | string;
	type: "text" | "number" | "checkbox";
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputGroup: React.FC<InputGroupProps> = ({
	label,
	value,
	type,
	onChange,
}) => {
	return (
		<fieldset className={styles.inputContainer}>
			<label htmlFor={label}>{label}</label>
			<Input
				type={type}
				id={label}
				name={label}
				value={value}
				onChange={onChange}
			/>
		</fieldset>
	);
};

export default InputGroup;
