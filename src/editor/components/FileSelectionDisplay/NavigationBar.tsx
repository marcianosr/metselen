import FileSelectionContainer from "../FileSelectionContainer";
import { ModeManager } from "../../../App";
import { LevelConfigStateProvider } from "../../../providers/LevelConfigProvider";

const NavigationBar = () => (
	<LevelConfigStateProvider>
		<ModeManager />
		<FileSelectionContainer />
	</LevelConfigStateProvider>
);

export default NavigationBar;
