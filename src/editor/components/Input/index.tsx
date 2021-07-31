import React, { ChangeEvent } from "react";

type InputProps = {
	type: "number" | "text" | "checkbox";
	id: string;
	name: string;
	value: number | string;
	onChange: (value: ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ type, id, name, value, onChange }) => (
	<input type={type} id={id} name={name} value={value} onChange={onChange} />
);

export default Input;
