import { useState, useEffect, useCallback, useRef } from "react";
import Tile from "./Tile";

const Board = () => {
    const BOARD_SIZE = 4;

    interface BoardSlots {
        id: number;
        value: number;
    }

    const tileIdCounterRef = useRef(0); // Use ref to keep track of tile ID counter
    const [board, setBoard] = useState<BoardSlots[][]>(initializeBoard);

    function addNewTile(boardSlot: BoardSlots[][]) {
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

    function initializeBoard(): BoardSlots[][] {
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
            const filteredRow = row.filter((cell) => cell.value !== 0);
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
                        id: tileIdCounterRef.current++, // Use ref value
                        value: filteredRow[i].value * 2,
                    });
                    skip = true;
                } else {
                    mergedRow.push(filteredRow[i]);
                }
            }
            while (mergedRow.length < BOARD_SIZE) {
                mergedRow.push({ id: tileIdCounterRef.current++, value: 0 });
            }
            return mergedRow;
        });
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

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        setBoard((prevBoard) => {
            if (
                ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
                    event.key
                )
            ) {
                event.preventDefault();
            }
            let newBoard = prevBoard.map((row) => [...row]);

            switch (event.key) {
                case "ArrowUp":
                    newBoard = handleArrowUp(newBoard);
                    break;
                case "ArrowDown":
                    newBoard = handleArrowDown(newBoard);
                    break;
                case "ArrowLeft":
                    newBoard = handleArrowLeft(newBoard);
                    break;
                case "ArrowRight":
                    newBoard = handleArrowRight(newBoard);
                    break;
                default:
                    return prevBoard;
            }

            // addNewTile(newBoard);

            return newBoard;
        });
    }, []);

    return (
        <div className="bg-slate-400 p-[12px] sm:p-[16px] rounded-lg w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] relative">
            <div className="relative w-full h-full">
                {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) =>
                        cell.value !== 0 ? (
                            <Tile
                                key={cell.id}
                                id={cell.id}
                                cellValue={cell.value}
                                row={rowIndex}
                                col={colIndex}
                            />
                        ) : null
                    )
                )}
            </div>
        </div>
    );
};

export default Board;
