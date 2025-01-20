import { fetchFilteredMovies } from "@/app/lib/actions";
import Image from "next/image";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
};

export default async function MoviesList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  let movies: Movie[] = [];
  movies = await fetchFilteredMovies(query, currentPage);

  return (
    <div className="grid grid-cols-8 gap-5">
      {movies.map((movie) => (
        <div key={movie.id} >
          <Link href={`/view/review-movie/${movie.id}`}>
          <div className="border border-white">
          <Image
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              width={250}
              height={250}
              alt="Picture of the movie"
            />
            <p>{movie.title}</p>
            <p>
              <em>Year - {movie.release_date.substring(0, 4)}</em>
            </p>
            <p>Rating - {movie.vote_average}</p>
          </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
