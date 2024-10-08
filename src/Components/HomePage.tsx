import React from 'react'
import { games } from "../constants/data";
import GameDisplayCard from "./GameDisplayCard";
import { NavLink } from "react-router-dom";
type Props = {}

const HomePage = (props: Props) => {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen px-16">
            <h1 className="text-4xl py-5">Welcome to the Home Page</h1>
            <ul className="flex flex-wrap justify-center items-center gap-5 md:gap-20">
                {games.map((game) => (
                    <li key={game.name} className="flex justify-center">
                        <NavLink to={`/${game.name}`} className="block">
                            <GameDisplayCard game={game} />
                        </NavLink>
                    </li>
                ))}
            </ul>
        </main>
  )
}

export default HomePage