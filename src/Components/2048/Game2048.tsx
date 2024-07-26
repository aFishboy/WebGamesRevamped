import React from "react";
import Board from "./Board";

type Props = {};

const Game2048 = (props: Props) => {
    return (
        <main className="flex flex-col items-center justify-center">
            <h1 className="text-8xl font-bold text-blue-500 pb-5">2048</h1>
            <Board />
        </main>
    );
};

export default Game2048;
