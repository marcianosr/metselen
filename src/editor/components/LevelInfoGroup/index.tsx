import { useLevelConfigState } from "../../../providers/LevelConfigProvider";
import styles from "./styles.module.css";

const LevelInfoGroup = () => {
    const {
        levelConfigState,
    } = useLevelConfigState();


    return (
        <section className={styles.levelInfoGroup}>
            <h1 className={styles.title}>Level editor</h1>
            <h2 className={styles.smallTitle}>Level {levelConfigState.level} - {levelConfigState.name}</h2>
        </section>
    )
}

export default LevelInfoGroup;