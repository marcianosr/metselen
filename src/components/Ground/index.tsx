import styles from "./styles.module.css";
import Grass from "../Grass";

const Ground = () => (
	<div className={styles.ground}>
		<div className={styles.grassContainer}>
			<Grass />
		</div>
	</div>
);

export default Ground;
