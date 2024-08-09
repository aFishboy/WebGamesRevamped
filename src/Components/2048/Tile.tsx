import { useEffect, useState } from "react";
import { tileColors } from "../../constants/data";

type Props = {
    cellValue: number;
    row: number;
    col: number;
};

const Tile = ({ cellValue, row, col }: Props) => {
    const BOARD_SIZE = 4;
    const [isNew, setIsNew] = useState(true);

    const calcBGColor = (num: number) => {
        const colorIndex = num === 0 ? 0 : Math.log2(num);
        return tileColors[colorIndex];
    };

    useEffect(() => {
        
        const timer = setTimeout(() => {
            setIsNew(false);
        }, 20); 

        return () => clearTimeout(timer);
    }, []);

    const style: React.CSSProperties = {
        top: `${(row * 100) / BOARD_SIZE}%`,
        left: `${(col * 100) / BOARD_SIZE}%`,
        transition: "transform 0.2s ease, top 0.4s ease, left 0.4s ease",
        position: "absolute",
        transform: isNew ? "scale(0)" : "scale(1)",
    };

    return (
        <div
            style={style}
            className={`w-[60px] h-[60px] sm:w-[105px] sm:h-[105px] flex
                items-center justify-center border border-gray-800 rounded-md ${calcBGColor(
                    cellValue
                )}`}
        >
            {cellValue !== 0 ? cellValue : ""}
        </div>
    );
};

export default Tile;
