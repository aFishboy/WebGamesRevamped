const BOARD_SIZE = 4;
let CURR_ID = 0;

interface BoardSlots {
    id: number;
    value: number;
    row: number;
    col: number;
}

export function addNewTile(board: BoardSlots[]) {
    const emptyTiles = board.filter((tile) => tile.value === 0);
    if (emptyTiles.length === 0) return;
    const newTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    newTile.value = Math.random() < 0.9 ? 2 : 4;
}

export function initializeBoard(): BoardSlots[] {
    const newBoard: BoardSlots[] = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            newBoard.push({
                id: CURR_ID++,
                value: 0,
                row,
                col,
            });
        }
    }
    addNewTile(newBoard);
    addNewTile(newBoard);
    return newBoard;
}

function slideTiles(board: BoardSlots[]): BoardSlots[] {
    let newBoard = [...board];

    for (let row = 0; row < BOARD_SIZE; row++) {
        // Filter out the tiles in the current row
        const currentRow = newBoard.filter((tile) => tile.row === row);
        // Filter out non-zero tiles
        const filteredRow = currentRow.filter((tile) => tile.value !== 0);
        const mergedRow: BoardSlots[] = [];
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
                    ...filteredRow[i],
                    value: filteredRow[i].value * 2,
                });
                skip = true;
            } else {
                mergedRow.push(filteredRow[i]);
            }
        }

        // Fill the row with zeros to maintain BOARD_SIZE length
        while (mergedRow.length < BOARD_SIZE) {
            mergedRow.push({
                id: CURR_ID++,
                value: 0,
                row,
                col: mergedRow.length,
            });
        }

        // Update the newBoard with the mergedRow values
        mergedRow.forEach((tile, index) => {
            newBoard = newBoard.map((t) =>
                t.row === row && t.col === index
                    ? { ...tile, col: index }
                    : t
            );
        });
    }

    console.log("🚀 ~ slideTiles ~ newBoard:", newBoard);
    return newBoard;
}

export function handleArrowUp(board: BoardSlots[]): BoardSlots[] {
    const newBoard = [...board];
    for (let col = 0; col < BOARD_SIZE; col++) {
        const currentCol = newBoard.filter((tile) => tile.col === col);
        const filteredCol = currentCol.filter((tile) => tile.value !== 0);
        const mergedCol = [];
        let skip = false;
        for (let i = 0; i < filteredCol.length; i++) {
            if (skip) {
                skip = false;
                continue;
            }
            if (
                i < filteredCol.length - 1 &&
                filteredCol[i].value === filteredCol[i + 1].value
            ) {
                mergedCol.push({
                    ...filteredCol[i],
                    value: filteredCol[i].value * 2,
                });
                skip = true;
            } else {
                mergedCol.push(filteredCol[i]);
            }
        }
        while (mergedCol.length < BOARD_SIZE) {
            mergedCol.push({
                id: CURR_ID++,
                value: 0,
                row: mergedCol.length,
                col,
            });
        }
        mergedCol.forEach((tile, index) => {
            tile.row = index;
        });
    }
    return newBoard;
}

export function handleArrowDown(board: BoardSlots[]): BoardSlots[] {
    const newBoard = [...board];
    for (let col = 0; col < BOARD_SIZE; col++) {
        const currentCol = newBoard.filter((tile) => tile.col === col);
        const filteredCol = currentCol.filter((tile) => tile.value !== 0);
        const mergedCol = [];
        let skip = false;
        for (let i = filteredCol.length - 1; i >= 0; i--) {
            if (skip) {
                skip = false;
                continue;
            }
            if (i > 0 && filteredCol[i].value === filteredCol[i - 1].value) {
                mergedCol.unshift({
                    ...filteredCol[i],
                    value: filteredCol[i].value * 2,
                });
                skip = true;
            } else {
                mergedCol.unshift(filteredCol[i]);
            }
        }
        while (mergedCol.length < BOARD_SIZE) {
            mergedCol.unshift({
                id: CURR_ID++,
                value: 0,
                row: BOARD_SIZE - mergedCol.length - 1,
                col,
            });
        }
        mergedCol.forEach((tile, index) => {
            tile.row = BOARD_SIZE - mergedCol.length + index;
        });
    }
    return newBoard;
}

export function handleArrowLeft(board: BoardSlots[]): BoardSlots[] {
    return slideTiles(board);
}

export function handleArrowRight(board: BoardSlots[]): BoardSlots[] {
    const newBoard = [...board];
    for (let row = 0; row < BOARD_SIZE; row++) {
        const currentRow = newBoard.filter((tile) => tile.row === row);
        const filteredRow = currentRow.filter((tile) => tile.value !== 0);
        const mergedRow = [];
        let skip = false;
        for (let i = filteredRow.length - 1; i >= 0; i--) {
            if (skip) {
                skip = false;
                continue;
            }
            if (i > 0 && filteredRow[i].value === filteredRow[i - 1].value) {
                mergedRow.unshift({
                    ...filteredRow[i],
                    value: filteredRow[i].value * 2,
                });
                skip = true;
            } else {
                mergedRow.unshift(filteredRow[i]);
            }
        }
        while (mergedRow.length < BOARD_SIZE) {
            mergedRow.unshift({
                id: CURR_ID++,
                value: 0,
                row,
                col: BOARD_SIZE - mergedRow.length - 1,
            });
        }
        mergedRow.forEach((tile, index) => {
            tile.col = BOARD_SIZE - mergedRow.length + index;
        });
    }
    return newBoard;
}
