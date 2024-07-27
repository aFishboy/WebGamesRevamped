import React from "react";
import { tileColors } from "../../constants/data";

type Props = { cellValue: number};

const Tile = (props: Props) => {
    function calcBGColor(num: number) {
        const colorIndex = num === 0 ? 0 : Math.log2(num);
        const bgHexCode = tileColors[colorIndex];
        return bgHexCode;
    }

    return (
        <div
            className={`w-[60px] h-[60px] sm:w-[105px] sm:h-[105px] flex items-center justify-center border border-gray-800 rounded-md ${calcBGColor(
                props.cellValue
            )}`}
        >
            {props.cellValue !== 0 ? props.cellValue : ""}
        </div>
    );
};

export default Tile;
