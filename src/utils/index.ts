import { BrickType } from "../types/Bricks";

export const toBrickIds = (mapping: BrickType[][]) =>
	mapping.map((bricks) => bricks.map((brick) => brick.id));

export const flattenBricksArray = <B>(mapping: B[][]): B[] =>
	mapping.flatMap((row: B[]) => row);

export const neighbours = (currentId: number, mapping: number[][]) => {
	//////////////////////////////////
	//
	// Example description to understand what's happening for future me:
	// 	[
	//		[1, 2, 3, 4, 5],  => (r0)(c0, c1, c2, c3, c4)
	// 		[6, 7, 8]		  => (r1)(c0, c1, c2)
	// 	]
	//
	// currentId 8
	//
	//////////////////////////////////
	//
	// The row index of the found id.
	// The mapping now consists of 2 rows, so it will either be 0 or 1.
	const idxRow = findIndexRow(currentId, mapping);
	// The column index inside a row of the found id
	// The mapping consists of a max of 5 elements for the first row, and 3 for the second row.
	//
	// currentId 8 can be found on: row: 1 - column: 2.
	const idxColumn = findIndexColumn(currentId, mapping);

	let neighbourRanges = [
		[0, 1], // left
		[0, -1], // right
		[-1, 0], // bottom
		[-1, -1], // diagonal right bottom,
	];

	//
	return (
		neighbourRanges
			.filter(([rowRange, columnRange]) => {
				// Filter edges of the mapping.
				// Only apply the neighbourRanges which are valid.
				return (
					// 0 + 1 > 0
					rowRange + idxRow >= 0 &&
					// 0 + 1 < 2
					rowRange + idxRow < mapping.length &&
					// 1 + 2 > 0
					columnRange + idxColumn >= 0 &&
					// 1 + 2 < 5
					columnRange + idxColumn < mapping[idxRow].length
				);
			})
			// Find positions in mapping with neighbour definition and index of the found id
			.map(([rowRange, columnRange]) => {
				return mapping[rowRange + idxRow][columnRange + idxColumn];
			})
	);
};

export const findIndexRow = (currentId: number, mapping: number[][]) => {
	return mapping.findIndex((rows: number[]) =>
		rows.find((cell: number) => cell === currentId)
	);
};

export const findIndexColumn = (currentId: number, mapping: number[][]) => {
	const row = findIndexRow(currentId, mapping);
	return mapping[row].findIndex((cell: number) => cell === currentId);
};
