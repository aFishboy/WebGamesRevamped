import { useEffect, useState } from "react";
import { tileColors } from "../../constants/data";

type Props = { cellValue: number; row: number; col: number; id: number };

const Tile = (props: Props) => {
    const BOARD_SIZE = 4;

    useEffect(()=>{
        console.log(`Tile with id: ${props.id} and cellValue: ${props.cellValue} mounted at time ${new Date().toLocaleTimeString()}`)
        return ()=>{console.log(`Tile with id: ${props.id} and cellValue: ${props.cellValue} unmounted at time ${new Date().toLocaleTimeString()}`)}
      })
    
    // Define position state outside of useEffect
    // const [position, setPosition] = useState({ top: 0, left: 0 });

    // useEffect(() => {
    //     // Compute new position based on props
    //     const newTop = (props.row * 100) / BOARD_SIZE;
    //     const newLeft = (props.col * 100) / BOARD_SIZE;
        
    //     // Update position state
    //     setPosition({ top: newTop, left: newLeft });
    // }, [props.row, props.col]); // Depend on row and col to trigger effect

    const calcBGColor = (num: number) => {
        const colorIndex = num === 0 ? 0 : Math.log2(num);
        return tileColors[colorIndex];
    };

    const style: React.CSSProperties = {
        top: `${(props.row * 100) / BOARD_SIZE}%`,
        left: `${(props.col * 100) / BOARD_SIZE}%`,
        transition: "all 0.5s ease",
        position: "absolute",
    };

    return (
        <div
            style={style}
            className={`w-[60px] h-[60px] sm:w-[105px] sm:h-[105px] flex
                items-center justify-center border border-gray-800 rounded-md ${calcBGColor(
                    props.cellValue
                )}`}
        >
            {props.cellValue !== 0 ? props.cellValue : ""}
        </div>
    );
};

export default Tile;
