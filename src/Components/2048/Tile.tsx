import React from "react";
import { tileColors } from "../../constants/data";

type Props = { cellValue: number; row: number; col: number };

const Tile = (props: Props) => {
    const BOARD_SIZE = 4;

    function calcBGColor(num: number) {
        const colorIndex = num === 0 ? 0 : Math.log2(num);
        const bgHexCode = tileColors[colorIndex];
        return bgHexCode;
    }

    const style: React.CSSProperties = {
        top: `${(props.row * 100) / BOARD_SIZE}%`,
        left: `${(props.col * 100) / BOARD_SIZE}%`,
        transition: "all 0.5s ease",
    };

    return (
        <div
            style={style}
            className={`absolute w-[60px] h-[60px] sm:w-[105px] sm:h-[105px] flex
                items-center justify-center border border-gray-800 rounded-md ${calcBGColor(
                    props.cellValue
                )}`}
        >
            {props.cellValue !== 0 ? props.cellValue : ""}
        </div>
    );
};

export default Tile;
