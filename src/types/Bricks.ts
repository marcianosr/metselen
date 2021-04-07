export type BrickType = {
	id: number;
	size: "default" | "small";
	willDrop: boolean;
	hardShake?: number[];
	color?: any;
};

export enum PinkSchemeBrickColors {
	Normal = "#cd5c7c",
	Dark = "#9a5879",
	VeryDark = "#665776",
	Light = "#d76c80",
}

// Make generic in future
type ColorScheme = {
	normal: string[];
	dark: string[];
};

export const pinkSchemeColors: ColorScheme = {
	normal: ["#e66465", "#cd5c7c"],
	dark: ["#9a5879", "#d76c80"],
};
