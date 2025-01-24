import { fetchFilteredShows } from "@/app/lib/actions";
import Image from "next/image";
import Link from "next/link";
import logo from "./logotv.png";
type Show = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  first_air_date: string;
};

export default async function ShowList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  let shows: Show[] = [];
  shows = await fetchFilteredShows(query, currentPage);

  return (
    <div className="grid grid-cols-8 gap-5">
      {shows.map((show) => (
        <div key={show.id}>
          <Link href={`/view/review/${show.id}`}>
            <Image
              src={show.poster_path
                ? `https://image.tmdb.org/t/p/original${show.poster_path}`
                : logo}
              width={250}
              height={250}
              alt="Picture of the tv-show"
            />
            <p>{show.name}</p>
            <p>
              <em>Year - {show.first_air_date.substring(0, 4)}</em>
            </p>
            <p>Rating - {show.vote_average}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
