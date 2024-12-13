"use client"
import { useEffect, useState } from "react";
import Image from 'next/image'

type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
};

interface MovieListProps {
  query: string;
  page: number;
}

export default function MovieList(
  { query, page }: MovieListProps
) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchMovies = async () => {
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=${page}`;
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`, 
          },
        };
  
        try {
          const response = await fetch(url, options);
          const json = await response.json();
          if (json.results) {
            setMovies(json.results);
          }
        } catch (err) {
          setError("Failed to fetch movie data.");
        } finally {
          setLoading(false);
        }
      };
      fetchMovies();
    }, []); 
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    return (
      <div>
        <h2>Movies:</h2>
        {movies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          <ul>
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
          </ul>
        )}
      </div>
    );
  };

