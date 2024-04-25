function ListHistory({ history, onClick }) {
    return (
        <div className="list-history">
            {history.map((step, move) => {
                return (
                    <div key={move} className="mb-4">
                        {move === 0 ? (
                            <button
                                onClick={() => onClick(step)}
                                className="top-0 right-0 btn btn-secondary "
                            >
                                {move
                                    ? "Ir al movimiento #" + move
                                    : "Comenzar de nuevo"}
                            </button>
                        ) : (
                            <button
                                onClick={() => onClick(step)}
                                className="btn btn-secondary"
                            >
                                {move
                                    ? "Ir al movimiento #" + move
                                    : "Comenzar de nuevo"}
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default ListHistory;
