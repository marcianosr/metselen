import React from "react";
import styles from "./styles.module.css";

type ModalProps = {
	hideModal?: (id: number | null) => void;
};
const Modal: React.FC<ModalProps> = ({ hideModal, children }) => (
	<>
		<div
			className={styles.backdrop}
			onClick={() => hideModal && hideModal(null)}
		></div>
		<div className={styles.modal}>{children}</div>
	</>
);

export default Modal;
