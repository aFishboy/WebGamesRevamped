const BOARD_SIZE = 4;

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

export function initializeBoard(
    tileIdCounterRef: React.MutableRefObject<number>
): BoardSlots[][] {
    const newBoard = Array.from({ length: BOARD_SIZE }, () =>
        Array.from({ length: BOARD_SIZE }, () => ({
            id: tileIdCounterRef.current++, // Use ref value
            value: 0,
        }))
    );
    addNewTile(newBoard);
    addNewTile(newBoard);
    return newBoard;
}

function slideTiles(boardSlot: BoardSlots[][]): BoardSlots[][] {
    return boardSlot.map((row) => {
        const mergeOccurred = Array(row.length).fill(false);

        for (let i = 1; i < row.length; i++) {
            if (row[i].value === 0) continue;

            let j = i;
            while (j > 0 && row[j - 1].value === 0) {
                j--;
            }

            if (
                j > 0 &&
                row[j - 1].value === row[i].value &&
                !mergeOccurred[j - 1]
            ) {
                // Merge tiles
                row[j - 1].value *= 2;
                row[i].value = 0;
                mergeOccurred[j - 1] = true;
            } else if (j !== i) {
                // Shift tile
                [row[j], row[i]] = [row[i], row[j]]; // Swap tiles including IDs and values
            }
        }

        return row;
    });
}

export function handleArrow(prevBoard: BoardSlots[][], key: string) {
    let board: BoardSlots[][] = prevBoard.map((row) => [...row]);

    switch (key) {
        case "ArrowUp":
            board = handleArrowUp(board);
            break;
        case "ArrowDown":
            board = handleArrowDown(board);
            break;
        case "ArrowLeft":
            board = handleArrowLeft(board);
            break;
        case "ArrowRight":
            board = handleArrowRight(board);
            break;
        default:
            return prevBoard;
    }
    return board;
}

function handleArrowUp(board: BoardSlots[][]): BoardSlots[][] {
    return transpose(slideTiles(transpose(board)));
}

function handleArrowDown(board: BoardSlots[][]): BoardSlots[][] {
    return transpose(
        flipHorizontally(slideTiles(flipHorizontally(transpose(board))))
    );
}

function handleArrowLeft(board: BoardSlots[][]): BoardSlots[][] {
    return slideTiles(board);
}

function handleArrowRight(board: BoardSlots[][]): BoardSlots[][] {
    return flipHorizontally(slideTiles(flipHorizontally(board)));
}

function transpose(board: BoardSlots[][]): BoardSlots[][] {
    return board[0].map((_, colIndex) => board.map((row) => row[colIndex]));
}

const flipHorizontally = (board: BoardSlots[][]): BoardSlots[][] => {
    return board.map((row) => [...row].reverse());
};
