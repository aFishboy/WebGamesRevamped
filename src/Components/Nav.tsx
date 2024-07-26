import { NavLink } from "react-router-dom";
import retroArcade from "../assets/images/retroArcade.png";
import { games } from "../constants/data";

const Nav = () => {
    return (
        <header className=" w-full">
            <nav className="flex justify-between items-center">
                <NavLink to="/" className="flex justify-between pr-10">
                    {/* Image by pngtree.com */}
                    <img src={retroArcade} alt="Logo" className="w-auto h-32 pl-5" />
                    <h1 className="p-5 text-4xl font-bold">Game Arcade</h1>
                </NavLink>
                <ul className="flex">
                    {games.map((game) => (
                        <NavLink to={`/${game.name}`} key={game.name} className="px-10 text-4xl">{game.name}</NavLink>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Nav;
