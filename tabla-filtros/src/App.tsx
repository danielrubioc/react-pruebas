import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { User, SortBy } from "./types.d";
import { UsersTable } from "./components/UsersTable";

function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [changeColor, setChangeColor] = useState(false);
    const [sorting, setSorting] = useState<SortBy>(SortBy.None);
    const [searchCountry, setSearchCountry] = useState("");
    const originalUsers = useRef<User[]>([]);

    const toggleColor = () => {
        setChangeColor(!changeColor);
    };

    const toggleCountry = () => {
        const newSortingValue =
            sorting === SortBy.None ? SortBy.Country : SortBy.None;
        setSorting(newSortingValue);
    };

    const toggleRestore = () => {
        setUsers(originalUsers.current);
    };

    const handleDelete = (email: string) => {
        const filteredUsers = users.filter((user) => user.email !== email);
        setUsers(filteredUsers);
    };

    const handleChangeSorting = (newSorting: SortBy) => {
        setSorting(newSorting);
    };

    const searchByCountry = useMemo(() => {
        if (!searchCountry) return users;

        return users.filter((user) =>
            user.location.country
                .toLowerCase()
                .includes(searchCountry.toLowerCase())
        );
    }, [searchCountry, users]);

    const orderByCountry = useMemo(() => {
        console.log("orderByCountry");

        if (sorting === SortBy.None) return searchByCountry;

        const compareProperties: Record<string, (a: User, b: User) => number> =
            {
                [SortBy.Country]: (a, b) =>
                    a.location.country.localeCompare(b.location.country),
                [SortBy.Name]: (a, b) =>
                    a.name.first.localeCompare(b.name.first),
                [SortBy.Last]: (a, b) => a.name.last.localeCompare(b.name.last),
            };

        return [...searchByCountry].sort(compareProperties[sorting]);
    }, [sorting, searchByCountry]);

    useEffect(() => {
        fetch("https://randomuser.me/api/?results=100")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.results);
                originalUsers.current = data.results;
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <h2>Filtros</h2>

            <header>
                <button onClick={toggleColor}>Cambiar color</button>
                <button onClick={toggleCountry}>Ordenar por país</button>
                <button onClick={toggleRestore}>Restaurar Usurios</button>
                <input
                    type="text"
                    placeholder="Buscar por país"
                    value={searchCountry}
                    onChange={(e) => setSearchCountry(e.target.value)}
                />
            </header>
            <UsersTable
                users={orderByCountry}
                changeColor={changeColor}
                handleDelete={handleDelete}
                handleChangeSorting={handleChangeSorting}
            />
        </>
    );
}

export default App;
