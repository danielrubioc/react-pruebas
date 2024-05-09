import ImgDefault from "../src/assets/300x430.svg";
export default function CardMovie({ movie }) {
    return (
        <div className="flex flex-col justify-between">
            <img
                src={movie.poster === "N/A" ? ImgDefault : movie.poster}
                alt={movie.title}
                className="object-cover w-full rounded-md shadow-md border-radius"
            />
            <div className="p-4 text-center bg-white rounded-md shadow-md card height-100">
                <h3 className="text-lg font-bold text-center">{movie.title}</h3>
                <p className="text-sm text-center">{movie.year}</p>
            </div>
        </div>
    );
}
