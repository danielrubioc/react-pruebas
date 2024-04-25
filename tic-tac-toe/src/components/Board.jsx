function Square({ value, onSquareClick }) {
    return (
        <button
            className={
                "h-20 p-5 text-4xl text-white border-2 border-none bg-purple-950 square d-inline hover:bg-purple-800 hover:text-white focus:outline-none {value ? 'cursor-not-allowed' : 'cursor-pointer'}"
            }
            onClick={onSquareClick}
            disabled={value}
        >
            {value}
        </button>
    );
}

function Board({ squares, handleClick }) {
    return (
        <>
            <div className="p-4 bg-purple-900 rounded-lg">
                <div className="grid grid-cols-3 gap-4">
                    {squares.map((value, index) => (
                        <Square
                            key={index}
                            value={value}
                            onSquareClick={() => handleClick(index)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Board;
