export type BrickType = {
	id: number;
	size: "default" | "small";
	willDrop: boolean;
	hardShake?: number[];
	color?: PinkSchemeBrickColors;
};


export enum PinkSchemeBrickColors {
	Normal = "#cd5c7c",
	Dark = "#9a5879",
	VeryDark = "#665776",
	Light = "#d76c80",
}
