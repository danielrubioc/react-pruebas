import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board.jsx";
import ListVictory from "./components/ListVictory.jsx";
import Dialog from "./components/Dialog.jsx";
import ListHistory from "./components/ListHistory.jsx";
// canvas-confetti
import confetti from "canvas-confetti";

function App() {
    const [count, setCount] = useState(
        JSON.parse(window.localStorage.getItem("count")) || 0
    );
    const [squares, setSquares] = useState(
        JSON.parse(window.localStorage.getItem("board")) || Array(9).fill(null)
    );
    const [history, setHistory] = useState(
        JSON.parse(window.localStorage.getItem("history")) || [
            Array(9).fill(null),
        ]
    );
    const [xIsNext, setXIsNext] = useState(
        JSON.parse(window.localStorage.getItem("xIsNext")) || true
    );

    const [winner, setWinner] = useState("");
    const [open, setOpen] = useState(false);

    const [victories, setVictories] = useState(
        JSON.parse(window.localStorage.getItem("victories")) || {
            X: 0,
            O: 0,
            E: 0,
        }
    );

    const toggleModal = () => {
        setOpen(!open);
    };

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return squares[a];
            }
        }
        return null;
    };

    const handlePlay = (nextSquares) => {
        setCount(count + 1);
        setHistory([...history, nextSquares]);
        window.localStorage.setItem(
            "history",
            JSON.stringify([...history, nextSquares])
        );
        window.localStorage.setItem("count", count + 1);
    };

    const goToJump = (step) => {
        if (step === history[0]) {
            handleRestart();
            return;
        }
        setSquares(step);
        setXIsNext(history.indexOf(step) % 2 === 0);
    };

    const handleClick = (i) => {
        if (squares[i] || winner || calculateWinner(squares)) {
            return;
        }

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }

        setSquares(nextSquares);
        setXIsNext(!xIsNext);
        handlePlay(nextSquares);

        window.localStorage.setItem("board", JSON.stringify(nextSquares));
        window.localStorage.setItem("xIsNext", !xIsNext);
    };

    const handleRestart = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        setCount(0);
        setHistory([Array(9).fill(null)]);
        setWinner("");
        window.localStorage.removeItem("history");
        window.localStorage.removeItem("board");
        window.localStorage.removeItem("xIsNext");
        window.localStorage.removeItem("count");
    };

    const clearVictories = () => {
        setVictories({ X: 0, O: 0, E: 0 });
        window.localStorage.removeItem("victories");
    };

    useEffect(() => {
        if (calculateWinner(squares) && !winner) {
            const newVictories = { ...victories };
            setVictories({
                ...newVictories,
                [calculateWinner(squares)]:
                    newVictories[calculateWinner(squares)] + 1,
            });
            localStorage.setItem(
                "victories",
                JSON.stringify({
                    ...newVictories,
                    [calculateWinner(squares)]:
                        newVictories[calculateWinner(squares)] + 1,
                })
            );
            setOpen(true);
            setWinner("Ganador: " + calculateWinner(squares));
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }

        if (count === 9 && !winner) {
            setVictories({ ...victories, E: victories.E + 1 });
            setOpen(true);
            setWinner("Empate");
            localStorage.setItem(
                "victories",
                JSON.stringify({ ...victories, E: victories.E + 1 })
            );
        }
    }, [winner, squares, count]);

    return (
        <>
            <div className="container max-w-5xl p-4 mx-auto w-100">
                <h1 className="mb-4 text-3xl font-bold underline">
                    Tic-Tac-Toe
                </h1>
                <p className="w-3/4 mx-auto mb-5">
                    Basado en el tutorial de{" "}
                    <a
                        href="https://react.dev/learn/tutorial-tic-tac-toe"
                        target="_blank"
                        rel="noreferrer"
                    >
                        React.dev.
                    </a>
                    <br />
                    Se ha agregado la funcionalidad de contar los movimientos y
                    reiniciar el juego. Ademas se ha agregado un contador de
                    victorias para cada jugador incluyendo empates.
                </p>

                <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                    <div className="">
                        <div className="count">
                            <h3 className="mb-4 text-xl font-semibold text-gray-800">
                                {count > 0
                                    ? "Movimiento: " + count
                                    : "Sin movimientos"}
                            </h3>
                        </div>
                        <Board squares={squares} handleClick={handleClick} />
                    </div>
                    <div className="p-4 overflow-y-auto bg-gray-100 rounded-lg h-96 scroll-smooth">
                        <ListHistory history={history} onClick={goToJump} />
                    </div>
                </div>
                <ListVictory
                    victories={victories}
                    clearVictories={clearVictories}
                />

                <Dialog
                    open={open}
                    onClose={toggleModal}
                    restart={handleRestart}
                >
                    {winner}
                </Dialog>
            </div>
        </>
    );
}

export default App;
