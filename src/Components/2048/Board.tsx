import React, { useState, useEffect, useCallback } from "react";
import Tile from "./Tile";

type Props = {};

const Board = (props: Props) => {
    const BOARD_SIZE = 4;
    const [board, setBoard] = useState<number[][]>(
        Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0))
    );

    useEffect(() => {
        initializeBoard();
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const initializeBoard = () => {
        const newBoard: number[][] = Array.from({ length: BOARD_SIZE }, () =>
            Array(BOARD_SIZE).fill(0)
        );
        addNewTile(newBoard);
        addNewTile(newBoard);
        setBoard(newBoard);
    };

    const addNewTile = (board: number[][]) => {
        const emptyTiles = [];
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                if (board[row][col] === 0) {
                    emptyTiles.push({ row, col });
                }
            }
        }
        if (emptyTiles.length === 0) return;
        const { row, col } =
            emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
    };

    const slideTiles = (board: number[][]): number[][] => {
        return board.map((row) => {
            const filteredRow = row.filter((cell) => cell !== 0);
            const mergedRow = [];
            let skip = false;
            for (let i = 0; i < filteredRow.length; i++) {
                if (skip) {
                    skip = false;
                    continue;
                }
                if (
                    i < filteredRow.length - 1 &&
                    filteredRow[i] === filteredRow[i + 1]
                ) {
                    mergedRow.push(filteredRow[i] * 2);
                    skip = true;
                } else {
                    mergedRow.push(filteredRow[i]);
                }
            }
            while (mergedRow.length < BOARD_SIZE) {
                mergedRow.push(0);
            }
            return mergedRow;
        });
    };

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
                    newBoard = transpose(newBoard);
                    newBoard = slideTiles(newBoard);
                    newBoard = transpose(newBoard);
                    break;
                case "ArrowDown":
                    newBoard = flipVertically(newBoard);
                    newBoard = transpose(newBoard);
                    newBoard = slideTiles(newBoard);
                    newBoard = transpose(newBoard);
                    newBoard = flipVertically(newBoard);

                    break;
                case "ArrowLeft":
                    newBoard = slideTiles(newBoard);
                    break;
                case "ArrowRight":
                    newBoard = flipHorizontally(newBoard);
                    newBoard = slideTiles(newBoard);
                    newBoard = flipHorizontally(newBoard);
                    break;
                default:
                    return prevBoard;
            }

            addNewTile(newBoard);
            return newBoard;
        });
    }, []);

    const transpose = (board: number[][]): number[][] => {
        return board[0].map((_, colIndex) => board.map((row) => row[colIndex]));
    };

    const flipHorizontally = (board: number[][]): number[][] => {
        return board.map((row) => [...row].reverse());
    };

    const flipVertically = (board: number[][]): number[][] => {
        return [...board].reverse();
    };

    return (
        <div className="bg-slate-400 p-[12px] sm:p-[16px] rounded-lg w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] relative">
            <ul className="relative w-full h-full">
                {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <li
                            key={`${rowIndex}-${colIndex}`}
                            className="absolute"
                            style={{
                                top: `${(rowIndex * 100) / BOARD_SIZE}%`,
                                left: `${(colIndex * 100) / BOARD_SIZE}%`,
                                padding: "6px", // Adjust based on your gap requirement
                            }}
                        >
                            <Tile cellValue={cell} />
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Board;
