import React from "react";

interface Game {
    name: string;
    picture: string;
    description: string;
    controls: string;
}

type Props = {
    game: Game;
};

const GameDisplayCard: React.FC<Props> = ({ game }) => {
    return (
        <main className="flex flex-col justify-between items-center p-4 border-2
                       border-black shadow-xl rounded-lg min-w-[300px] max-w-[300px] 
                       min-h-[400px] max-h-[400px] overflow-hidden">
            <h1 className="text-2xl pb-2 text-center">{game.name}</h1>
            <img
                src={game.picture}
                alt={`${game.name} Game Image`}
                className="object-cover w-full h-32"
                onError={(e) =>
                    (e.currentTarget.src = "https://placehold.co/320x180")
                }
            />
            <p className="text-sm mt-2 text-center">{game.description}</p>
            <p className="text-sm mt-2 text-center">Controls: {game.controls}</p>
        </main>
    );
};

export default GameDisplayCard;
