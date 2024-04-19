import { User, SortBy } from "../types.d";

interface UsersTableProps {
    users: User[];
    changeColor: boolean;
    handleDelete: (email: string) => void;
    handleChangeSorting: (newSorting: SortBy) => void;
}

export function UsersTable({
    users,
    changeColor,
    handleDelete,
    handleChangeSorting,
}: UsersTableProps) {
    return (
        <>
            <p>Total de usuarios: {users.length}</p>
            <table className="users-table" width={100}>
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th
                            className="cursor-pionter"
                            onClick={() => handleChangeSorting(SortBy.Name)}
                        >
                            Nombre
                        </th>
                        <th
                            className="cursor-pionter"
                            onClick={() => handleChangeSorting(SortBy.Last)}
                        >
                            Apellido
                        </th>
                        <th>Email</th>
                        <th>Edad</th>
                        <th
                            className="cursor-pionter"
                            onClick={() => handleChangeSorting(SortBy.Country)}
                        >
                            País
                        </th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                        const color = changeColor ? "#f2f2f2" : "transparent";
                        const backgroundColor =
                            index % 2 === 0 ? color : "transparent";

                        return (
                            <tr key={user.email} style={{ backgroundColor }}>
                                <td>
                                    <img
                                        src={user.picture.thumbnail}
                                        alt={`${user.name.first} ${user.name.last}`}
                                    />
                                </td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.email}</td>
                                <td>{user.dob.age}</td>
                                <td>{user.location.country}</td>
                                <td>
                                    <button>Editar</button>
                                    <button
                                        onClick={() => handleDelete(user.email)}
                                    >
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
