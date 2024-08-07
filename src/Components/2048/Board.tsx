import { useState, useEffect, useCallback, useRef } from "react";
import Tile from "./Tile";
import { addNewTile, handleArrow, initializeBoard } from "./BoardContext";

const Board = () => {
    interface BoardSlots {
        id: number;
        value: number;
    }

    const tileIdCounterRef = useRef(0); // Use ref to keep track of tile ID counter
    const [board, setBoard] = useState<BoardSlots[][]>(
        initializeBoard(tileIdCounterRef)
    );

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

            const board: BoardSlots[][] = handleArrow(prevBoard, event.key);

            addNewTile(board);

            return board;
        });
    }, []);

    let tileCounter = 0;
    board.forEach(row => {
        row.forEach((tile) => {
            if (tile.value != 0) tileCounter++
        })
    }) 
    console.log(tileCounter);
    
    
    return (
        <div className="bg-slate-400 p-[12px] sm:p-[16px] rounded-lg w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] relative">
            <div className="relative w-full h-full">
                {board.flatMap((row, rowIndex) =>
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
