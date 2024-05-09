import { useState, useEffect, useRef } from "react";

export function useSearch() {
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const isFirstInput = useRef(true);

    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = search === "";
            return;
        }

        if (search === "") {
            setError("Debes ingresar un texto para buscar");
            return;
        }

        if (search.match(/^\d+$/)) {
            setError("Debes ingresar un texto válido");
            return;
        }

        if (search.length < 3) {
            setError("Debes ingresar al menos 3 caracteres");
            return;
        }

        setError(null);
    }, [search]);

    return { search, setSearch, error };
}
