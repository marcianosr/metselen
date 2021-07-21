import React from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import styles from "./styles.module.css";

type ConfirmSaveModalProps = {
    warningMessage: string;
    hideModal: () => void
    saveLevel: () => void
}

const ConfirmSaveModal: React.FC<ConfirmSaveModalProps> = ({ saveLevel, hideModal, warningMessage }) => (
    <Modal onClickBackdrop={() => { }}>
        <section className={styles.modalContainer}>
            <h1>{warningMessage}</h1>
            <div className={styles.buttonContainer}>
                <Button variant="brick" onClick={saveLevel}>Yes</Button>
                <Button variant="brick" onClick={hideModal}>no</Button>
            </div>
        </section>
    </Modal>
);

export default ConfirmSaveModal;