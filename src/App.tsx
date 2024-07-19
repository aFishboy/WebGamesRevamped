import React from "react";
import "./App.css";
import { games } from "./constants/data";
import GameDisplayCard from "./Components/GameDisplayCard";
import { Link } from "react-router-dom";

const App: React.FC = () => {
    return (
        <main className="flex flex-col justify-center items-center min-h-screen p-4">
            <h1 className="text-4xl py-5">Welcome to the Home Page</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-1 w-full max-w-6xl">
                {games.map((game) => (
                    <li key={game.name} className="flex justify-center">
                        <Link to={`/${game.name}`} className="block">
                            <GameDisplayCard game={game} />
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default App;
