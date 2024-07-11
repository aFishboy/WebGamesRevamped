import retroArcade from "../assets/images/retroArcade.png";
const Nav = () => {
    const gameNames: string[] = ["2048", "Pong", "Hangman", "Sudoku"];

    return (
        <header>
            <nav className="flex justify-between items-center">
                <a href="/" className="flex items-center space-x-4">
                    {/* Image by pngtree.com */}
                    <img src={retroArcade} alt="Logo" className="w-auto h-32" />
                    <h1 className="p-5 text-4xl font-bold">Game Arcade</h1>
                </a>
                <ul className="flex space-x-10 ml-10">
                    {gameNames.map((gameName, index) => (
                        <li key={index} className="px-10 text-4xl">{gameName}</li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Nav;
