import BrickContainer, { BrickType } from ".";
import { toBrickIds, neighbours } from "../../utils";

describe("BrickContainer component tests", () => {
	it("should not be able to shake other bricks when there is nothing to shake", () => {
		const mapping: BrickType[][] = [
			[{ id: 1, size: "default", willDrop: true }],
		];

		const currentBrick = 1;
		const bricksidsMappingToIds = toBrickIds(mapping);

		const result = neighbours(currentBrick, bricksidsMappingToIds);

		expect(result).toEqual([]);
	});
	it("should shake the brick #1 when brick the current brick is #2", () => {
		const mapping: BrickType[][] = [
			[
				{ id: 1, size: "default", willDrop: true },
				{ id: 2, size: "default", willDrop: true },
			],
		];

		const currentBrick = 2;
		const bricksidsMappingToIds = toBrickIds(mapping);

		const result = neighbours(currentBrick, bricksidsMappingToIds);

		expect(result).toEqual([1]);
	});
	it("should shake the brick #7, #3 and #2 when brick the current brick is #8", () => {
		const mapping: BrickType[][] = [
			[
				{ id: 1, size: "default", willDrop: true },
				{ id: 2, size: "default", willDrop: true },
				{ id: 3, size: "default", willDrop: true },
				{ id: 4, size: "default", willDrop: true },
				{ id: 5, size: "default", willDrop: true },
			],
			[
				{ id: 6, size: "default", willDrop: true },
				{ id: 7, size: "default", willDrop: true },
				{ id: 8, size: "default", willDrop: true },
			],
		];

		const currentBrick = 8;
		const bricksidsMappingToIds = toBrickIds(mapping);

		const result = neighbours(currentBrick, bricksidsMappingToIds);

		expect(result).toEqual([7, 3, 2]);
	});
});
