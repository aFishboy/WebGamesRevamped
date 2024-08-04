const BOARD_SIZE = 4;
let CURR_ID = 0;

interface BoardSlots {
    id: number;
    value: number;
}

export function addNewTile(boardSlot: BoardSlots[][]) {
    const emptyTiles = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (boardSlot[row][col].value === 0) {
                emptyTiles.push({ row, col });
            }
        }
    }
    if (emptyTiles.length === 0) return;
    const { row, col } =
        emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    boardSlot[row][col].value = Math.random() < 0.9 ? 2 : 4;
}

export function initializeBoard(): BoardSlots[][] {
    const newBoard: BoardSlots[][] = Array.from({ length: BOARD_SIZE }, () =>
        Array.from({ length: BOARD_SIZE }, () => ({
            id: CURR_ID++,
            value: 0,
        }))
    );
    addNewTile(newBoard);
    addNewTile(newBoard);
    return newBoard;
}

function slideTiles(boardSlot: BoardSlots[][]): BoardSlots[][] {
    return boardSlot.map((row) => {
        const filteredRow = row.filter((cell) => cell.value !== 0);
        const mergedRow = [];
        let skip = false;
        for (let i = 0; i < filteredRow.length; i++) {
            if (skip) {
                skip = false;
                continue;
            }
            if (
                i < filteredRow.length - 1 &&
                filteredRow[i].value === filteredRow[i + 1].value
            ) {
                mergedRow.push({
                    id: filteredRow[i].id,
                    value: filteredRow[i].value * 2,
                });
                skip = true;
            } else {
                mergedRow.push(filteredRow[i]);
            }
        }
        while (mergedRow.length < BOARD_SIZE) {
            mergedRow.push({ id: CURR_ID++, value: 0 });
        }
        return mergedRow;
    });
}

function slideTilesUp(boardSlot: BoardSlots[][]): BoardSlots[][] {
    return boardSlot.map((row) => {
        const filteredRow = row.filter((cell) => cell.value !== 0);
        const mergedRow = [];
        let skip = false;
        for (let i = 0; i < filteredRow.length; i++) {
            if (skip) {
                skip = false;
                continue;
            }
            if (
                i < filteredRow.length - 1 &&
                filteredRow[i].value === filteredRow[i + 1].value
            ) {
                mergedRow.push({
                    id: filteredRow[i].id,
                    value: filteredRow[i].value * 2,
                });
                skip = true;
            } else {
                mergedRow.push(filteredRow[i]);
            }
        }
        while (mergedRow.length < BOARD_SIZE) {
            mergedRow.push({ id: CURR_ID++, value: 0 });
        }
        return mergedRow;
    });
}

// // Fill the row with zeros to maintain BOARD_SIZE length
//         while (mergedRow.length < BOARD_SIZE) {
//             mergedRow.push({
//                 id: CURR_ID++,
//                 value: 0,
//                 row: horizontal ? row : mergedRow.length,
//                 col: horizontal ? mergedRow.length : row,
//             });
//         }

//         // Update the newBoard with the mergedRow values
//         mergedRow.forEach((tile, index) => {
//             newBoard = newBoard.map((t) =>
//                 t.row === row && t.col === index
//                     ? {
//                           ...tile,
//                           row: horizontal ? row : index,
//                           col: horizontal ? index : row,
//                       }
//                     : t
//             );
//         });

// // Reverse rows to simulate right slide, process them, then revert rows
// const reversedBoard = board.map((tile) => ({
//     ...tile,
//     col: BOARD_SIZE - 1 - tile.col,
// }));

// const slidBoard = slideTiles(reversedBoard);

// return slidBoard.map((tile) => ({
//     ...tile,
//     col: BOARD_SIZE - 1 - tile.col,
// }));

// function slideTiles(
//     board: BoardSlots[],
//     horizontal: boolean = true
// ): BoardSlots[] {
//     let newBoard = [...board];

//     for (let row = 0; row < BOARD_SIZE; row++) {
//         // Filter out the tiles in the current row
//         const currentRow = newBoard.filter((tile) =>
//             horizontal ? tile.row == row : tile.col === row
//         );
//         // Filter out non-zero tiles
//         const filteredRow = currentRow.filter((tile) => tile.value !== 0);
//         const mergedRow: BoardSlots[] = [];
//         let skip = false;

//         for (let i = 0; i < filteredRow.length; i++) {
//             if (skip) {
//                 skip = false;
//                 continue;
//             }

//             if (
//                 i < filteredRow.length - 1 &&
//                 filteredRow[i].value === filteredRow[i + 1].value
//             ) {
//                 mergedRow.push({
//                     ...filteredRow[i],
//                     value: filteredRow[i].value * 2,
//                 });
//                 skip = true;
//             } else {
//                 mergedRow.push(filteredRow[i]);
//             }
//         }

//         // Fill the row with zeros to maintain BOARD_SIZE length
//         while (mergedRow.length < BOARD_SIZE) {
//             mergedRow.push({
//                 id: CURR_ID++,
//                 value: 0,
//                 row: horizontal ? row : mergedRow.length,
//                 col: horizontal ? mergedRow.length : row,
//             });
//         }

//         // Update the newBoard with the mergedRow values
//         mergedRow.forEach((tile, index) => {
//             newBoard = newBoard.map((t) =>
//                 t.row === row && t.col === index
//                     ? {
//                           ...tile,
//                           row: horizontal ? row : index,
//                           col: horizontal ? index : row,
//                       }
//                     : t
//             );
//         });
//     }

//     console.log("🚀 ~ slideTiles ~ newBoard:", newBoard);
//     return newBoard;
// }

export function handleArrowUp(board: BoardSlots[][]): BoardSlots[][] {
    return transpose(slideTiles(transpose(board)));
}

export function handleArrowDown(board: BoardSlots[][]): BoardSlots[][] {
    return transpose(
        flipHorizontally(slideTiles(flipHorizontally(transpose(board))))
    );
}

export function handleArrowLeft(board: BoardSlots[][]): BoardSlots[][] {
    return slideTiles(board);
}

export function handleArrowRight(board: BoardSlots[][]): BoardSlots[][] {
    return flipHorizontally(slideTiles(flipHorizontally(board)));
}

function transpose(board: BoardSlots[][]): BoardSlots[][] {
    //transpose 2d array
    const newArray = [];
    for (let i = 0; i < board.length; i++) {
        newArray.push([]);
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            newArray[j].push(board[i][j]);
        }
    }
    console.log("🚀 ~ transpose ~ newArray:", newArray)

    return newArray;
}

//  return slidBoard.map((tile) => ({
//     ...tile,
//     col: BOARD_SIZE - 1 - tile.col,
// }));

// return board[0].map((_, colIndex) => board.map((row) => row[colIndex]));

const flipHorizontally = (board: BoardSlots[][]): BoardSlots[][] => {
    return board.map((row) => [...row].reverse());
};
