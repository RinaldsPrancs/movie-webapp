import { fetchFilteredShows } from '@/app/lib/actions';
import Image from 'next/image'

type Show = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
};


export default async function ShowList( 
{query, currentPage}:
{query: string; currentPage: number;}
  ) 
  {
    let movies : Show[] = [];
    movies = await fetchFilteredShows(query, currentPage);

    return (

      <div>
         {movies.map((movie) => (
             <li key={movie.id}>
                        <Image
                                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                          width={250}
                                          height={250}
                                          alt="Picture of the author"
                                        />
                        <strong>{movie.title}</strong>
                        <p>{movie.id}</p>
                        <p>{movie.overview}</p>
                        <p>
                          <em>Release Date: {movie.release_date}</em>
                        </p>
                        <p>
                          rating: {movie.vote_average}
                        </p>
                      </li>
                    ))}
     </div>
      );
  }