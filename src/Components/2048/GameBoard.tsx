import React, { useState, useEffect } from "react";
import Tile from "./Tile";

type Props = {};

const Game2048 = (props: Props) => {
    const BOARD_SIZE = 4;
    const [board, setBoard] = useState<number[][]>([]);

    useEffect(() => {
        initializeBoard();
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

    return (
        <main className="flex flex-col items-center justify-center">
            <h1 className="text-8xl font-bold text-blue-500 pb-5">2048</h1>
            <div className=" bg-slate-400 p-[12px] sm:p-[16px] rounded-lg w-[300px] h-[300px] sm:w-[500px] sm:h-[500px]">
                <div className="grid grid-cols-4 gap-[12px] sm:gap-[16px]">
                    {board.map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                            <Tile
                                key={`${rowIndex}-${colIndex}`}
                                cellValue={cell}
                            />
                        ))
                    )}
                </div>
            </div>
        </main>
    );
};

export default Game2048;
