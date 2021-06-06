import React from "react";
import styles from "./styles.module.css";

type ModalProps = {
	onClickBackdrop?: () => void;
};

const Modal: React.FC<ModalProps> = ({ onClickBackdrop, children }) => (
	<>
		<div className={styles.backdrop} onClick={onClickBackdrop}></div>
		<div className={styles.modalContainer}>
			<div className={styles.modalInner}>{children}</div>
		</div>
	</>
);

export default Modal;
