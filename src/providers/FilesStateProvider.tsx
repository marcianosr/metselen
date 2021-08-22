import React, { createContext, useState } from "react";

export type FilesState = {
	worlds: string[];
	levels: string[];
};

// T represents a key of the FilesState Type
// FilesState[Action] resolves to a type value.
//
// FilesState[Action]: isGameFinished (key) that belongs to FilesState type. This is adding constraints, so you won't accidently update an unknown object.
type FilesStateUpdater = <Action extends keyof FilesState>(
	key: Action,
	value: FilesState[Action]
) => void;
type FilesStateMultipleUpdater = (state: Partial<FilesState>) => void;

type FilesStateContextState = {
	filesState: FilesState;
	setFilesState: (levelState: FilesState) => void;
	updateFilesState: FilesStateUpdater;
	updateFilesStateMultiple: FilesStateMultipleUpdater;
};

type FilesStateProps = {};

const INITIAL_FILE_STATE: FilesState = {
	worlds: [],
	levels: [],
};

export const FilesStateContext = createContext<FilesStateContextState>({
	filesState: INITIAL_FILE_STATE,
	setFilesState: () => {},
	updateFilesState: () => {},
	updateFilesStateMultiple: () => {},
});

export const FilesStateProvider: React.FC<FilesStateProps> = ({ children }) => {
	const [filesState, setFilesState] =
		useState<FilesState>(INITIAL_FILE_STATE);

	const updateFilesState: FilesStateUpdater = (key, value) => {
		setFilesState({
			...filesState,
			[key]: value,
		});
	};

	const updateFilesStateMultiple: FilesStateMultipleUpdater = (state) => {
		setFilesState({
			...filesState,
			...state,
		});
	};

	return (
		<FilesStateContext.Provider
			value={{
				filesState,
				setFilesState,
				updateFilesState,
				updateFilesStateMultiple,
			}}
		>
			{children}
		</FilesStateContext.Provider>
	);
};

export const useFilesState = (): FilesStateContextState =>
	React.useContext(FilesStateContext);
