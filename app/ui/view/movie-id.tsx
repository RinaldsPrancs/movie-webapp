import { fetchMovieByID } from "@/app/lib/actions";
import Image from "next/image";

type Creator = {
  id: number;
  name: string;
};

type Movie = {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  backdrop_path: string;
  release_date: string;
  production_companies: Creator[];
  original_language: string;
};

export default async function MovieByID(id: { id: string }) {
  let movie: Movie;
  movie = await fetchMovieByID(id);

  return (
    <div className="h-full grid grid-cols-[35%,65%] gap-x-4">
      {/* Box 1 */}
      <div className="h-full">
        <div className="h-[65%] relative">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt="Picture of the author"
            layout="fill"
          />
        </div>
        <div className="h-[35%]">
          <p>Creators:</p>
          {movie.production_companies.map((creator) => (
            <div key={creator.id}>{creator.name}</div>
          ))}
        </div>
      </div>
      {/* Box 2 */}
      <div className="h-full ">
        <div className=" h-[15%] font-bold">
          {movie.title} ({movie.release_date.substring(0, 4)})
        </div>

        <div className="h-[40%] w-full overflow-hidden text-ellipsis line-clamp-5">
          Overview: <br></br>
          {movie.overview}
        </div>

        <div className="h-[15%]">Rating: {movie.vote_average}</div>

        
        <div>Language: {movie.original_language}</div>
      </div>
    </div>
  );
}
