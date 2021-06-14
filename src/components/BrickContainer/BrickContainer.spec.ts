import BrickContainer, { BrickType } from ".";
import { toBrickIds, neighbours } from "../../utils";

describe("BrickContainer component tests", () => {
	it("should not be able to shake other bricks when there is nothing to shake", () => {
		const mapping: BrickType[][] = [
			[{ id: 1, size: "medium", willDrop: true }],
		];

		const currentBrick = 1;
		const bricksidsMappingToIds = toBrickIds(mapping);

		const result = neighbours(currentBrick, bricksidsMappingToIds);

		expect(result).toEqual([]);
	});
	it("should shake the brick #1 when brick the current brick is #2", () => {
		const mapping: BrickType[][] = [
			[
				{ id: 1, size: "medium", willDrop: true },
				{ id: 2, size: "medium", willDrop: true },
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
				{ id: 1, size: "medium", willDrop: true },
				{ id: 2, size: "medium", willDrop: true },
				{ id: 3, size: "medium", willDrop: true },
				{ id: 4, size: "medium", willDrop: true },
				{ id: 5, size: "medium", willDrop: true },
			],
			[
				{ id: 6, size: "medium", willDrop: true },
				{ id: 7, size: "medium", willDrop: true },
				{ id: 8, size: "medium", willDrop: true },
			],
		];

		const currentBrick = 8;
		const bricksidsMappingToIds = toBrickIds(mapping);

		const result = neighbours(currentBrick, bricksidsMappingToIds);

		expect(result).toEqual([7, 3, 2]);
	});
});
