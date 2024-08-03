import React, { useState, useEffect, useCallback } from "react";
import Tile from "./Tile";
import {
    initializeBoard,
    handleArrowDown,
    handleArrowLeft,
    handleArrowRight,
    handleArrowUp,
    addNewTile,
} from "./BoardContext";

const Board = () => {
    interface BoardSlots {
        id: number;
        value: number;
    }

    const [board, setBoard] = useState<BoardSlots[][]>(initializeBoard());

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
            addNewTile(newBoard);
            console.log("\n\n");
            newBoard.forEach((row) => {
                let rowString = "";
                row.forEach((cell) => {
                    rowString += `${cell.id} ${cell.value}   `; // Add a space for separation between cells
                });
                console.log(rowString.trim()); // Log the entire row and trim trailing spaces
            });
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
