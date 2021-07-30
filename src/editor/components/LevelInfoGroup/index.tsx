import { LevelDraftState } from "../Editor";
import styles from "./styles.module.css";

type LevelInfoGroupProps = {
    levelDraftState: LevelDraftState;
}

const LevelInfoGroup: React.FC<LevelInfoGroupProps> = ({ levelDraftState }) => (
    <section className={styles.levelInfoGroup}>
        <h1 className={styles.title}>Level editor</h1>
        <h2 className={styles.smallTitle}>World {levelDraftState.worldNumber} Level {levelDraftState.levelNumber} - {levelDraftState.name}</h2>
    </section>
)


export default LevelInfoGroup;