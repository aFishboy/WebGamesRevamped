import { useState, useEffect, useCallback, useRef } from "react";
import Tile from "./Tile";
import { addNewTile, handleArrow, initializeBoard } from "./BoardContext";

const Board = () => {
    interface BoardSlots {
        id: number;
        value: number;
    }

    const tileIdCounterRef = useRef(0);
    const [board, setBoard] = useState<BoardSlots[][]>(
        initializeBoard(tileIdCounterRef)
    );
    const [isCooldown, setIsCooldown] = useState(false);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (
                !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
                    event.key
                )
            ) {
                return;
            }
            event.preventDefault();

            if (isCooldown) {
                return;
            }

            setIsCooldown(true);
            setBoard((prevBoard) => {
                const newBoard = handleArrow(prevBoard, event.key);
                setTimeout(() => {
                    addNewTile(newBoard);
                    setBoard([...newBoard]);
                    setIsCooldown(false);
                }, 300);

                return newBoard;
            });
        },
        [isCooldown]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className="bg-slate-400 p-[12px] sm:p-[16px] rounded-lg w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] relative">
            <div className="relative w-full h-full">
                {board.flatMap((row, rowIndex) =>
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
