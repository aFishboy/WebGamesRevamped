import React from "react";
import "./App.css";
import { games } from "./constants/data";
import GameDisplayCard from "./Components/GameDisplayCard";
import { Link } from "react-router-dom";

const App: React.FC = () => {
    return (
        <main className="flex flex-col justify-center items-center min-h-screen px-16">
            <h1 className="text-4xl py-5">Welcome to the Home Page</h1>
            <ul className="flex flex-wrap justify-center items-center gap-5 md:gap-20">
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
