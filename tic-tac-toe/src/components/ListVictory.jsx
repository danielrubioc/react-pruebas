function ListVictory({ victories, clearVictories }) {
    return (
        <>
            <div className="flex justify-center mb-4">
                <button onClick={clearVictories} className="btn btn-primary">
                    Limpiar tablero
                </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="max-w-sm overflow-hidden rounded shadow-lg">
                    <div className="px-6 py-4">
                        <div className="mb-2 text-xl font-bold">Jugador X</div>
                        <p className="text-base text-gray-700">
                            Victorias: {victories.X}
                        </p>
                    </div>
                </div>

                <div className="max-w-sm overflow-hidden rounded shadow-lg">
                    <div className="px-6 py-4">
                        <div className="mb-2 text-xl font-bold">Empates</div>
                        <p className="text-base text-gray-700">{victories.E}</p>
                    </div>
                </div>
                <div className="max-w-sm overflow-hidden rounded shadow-lg">
                    <div className="px-6 py-4">
                        <div className="mb-2 text-xl font-bold">Jugador O</div>
                        <p className="text-base text-gray-700">
                            Victorias: {victories.O}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListVictory;
