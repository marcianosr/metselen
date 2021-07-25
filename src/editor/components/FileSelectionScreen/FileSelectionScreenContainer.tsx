import FileSelectionScreen from "."
import { LevelConfigStateProvider } from "../../../providers/LevelConfigProvider";

const FileSelectionScreenContainer = () => (
    <LevelConfigStateProvider>
        <FileSelectionScreen />
    </LevelConfigStateProvider>
)

export default FileSelectionScreenContainer;