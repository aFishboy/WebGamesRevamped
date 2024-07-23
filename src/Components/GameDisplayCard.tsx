import React from "react";

interface Game {
    name: string;
    url: string;
    description: string;
    controls: string;
}

type Props = {
    game: Game;
};

const GameDisplayCard: React.FC<Props> = ({ game }) => {
    return (
        <main className="flex flex-col justify-center items-center p-10 border-2 border-black shadow-xl rounded-lg w-[425px] h-[500px]">
            <h1 className="text-4xl">{game.name}</h1>
            <img
                src={game.url}
                alt={`${game.name} Game Image`}
                className="object-cover"
                onError={(e) => (e.currentTarget.src = "https://placehold.co/200x300")}
            />
            <p className="text-xl mt-4">{game.description}</p>
            <p className="text-xl mt-2">Controls: {game.controls}</p>
        </main>
    );
};

export default GameDisplayCard;
