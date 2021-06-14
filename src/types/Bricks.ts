export type BrickType = {
	id: number;
	size: "verySmall" | "small" | "medium" | "large" | "veryLarge";
	willDrop?: boolean;
	hardShake?: number[];
	color?: RandomColorType;
	cracked?: boolean;
};

// Make generic in future
type ColorScheme = {
	normal: string[];
	dark: string[];
};

export const pinkSchemeColors: ColorScheme = {
	normal: ["#D76C80", "#D76C80"],
	dark: ["#DF597A", "#DF597A"],
};

export type RandomColorType = {
	key: string;
	values: string[];
};
