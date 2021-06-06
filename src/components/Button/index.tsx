import React from "react";
import classNames from "classnames";
import styles from "./styles.module.css";

type ButtonProps = {
	onClick: () => void;
	variant: "brick";
	disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
	variant,
	onClick,
	disabled,
	children,
}) => {
	const classes = classNames(styles.button, {
		[styles[variant]]: variant,
	});

	return (
		<button
			onClick={onClick}
			type="button"
			className={classes}
			disabled={disabled}
		>
			<span className={styles.text}>{children}</span>
		</button>
	);
};

export default Button;
