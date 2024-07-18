import { Link } from "react-router-dom";
import retroArcade from "../assets/images/retroArcade.png";
const Nav = () => {
    const gameNames: string[] = ["2048", "Pong", "Hangman", "Sudoku"];

    return (
        <header className=" w-full">
            <nav className="flex justify-between items-center">
                <Link to="/" className="flex justify-between pr-10">
                    {/* Image by pngtree.com */}
                    <img src={retroArcade} alt="Logo" className="w-auto h-32 pl-5" />
                    <h1 className="p-5 text-4xl font-bold">Game Arcade</h1>
                </Link>
                <ul className="flex">
                    {gameNames.map((gameName, index) => (
                        <Link to={gameName} key={index} className="px-10 text-4xl">{gameName}</Link>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Nav;
