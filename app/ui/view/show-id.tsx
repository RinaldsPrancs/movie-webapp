import { fetchShowByID } from "@/app/lib/actions";
import Image from "next/image";
import logo from "./logotv.png";
type Creator = {
  id: number;
  name: string;
};

type Show = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  backdrop_path: string;
  first_air_date: string;
  created_by: Creator[];
  number_of_seasons: number;
  original_language: string;
};

export default async function ShowByID(id: { id: string }) {
  let show: Show;
  show = await fetchShowByID(id);

  return (
    <div className="h-full grid grid-cols-[35%,65%] gap-x-4">
      {/* Box 1 */}
      <div className="h-full">
        <div className="h-[65%] relative">
          <Image
            src={show.backdrop_path
              ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
              : logo}
            alt="Picture of the author"
            className="object-cover"
            fill
          />
        </div>
        <div className="h-[35%]">
          <p>Creators:</p>
          {show.created_by.map((creator) => (
            <div key={creator.id}>{creator.name}</div>
          ))}
        </div>
      </div>
      {/* Box 2 */}
      <div className="h-full ">
        <div className=" h-[15%] font-bold">
          {show.name} ({show.first_air_date.substring(0, 4)})
        </div>

        <div className="h-[43%] w-full overflow-hidden text-ellipsis line-clamp-6">
          Overview: <br></br>
          {show.overview}
        </div>

        <div className="h-[15%]">Rating: {show.vote_average}</div>

        <div className="h-[15%]">Seasons: {show.number_of_seasons}</div>
        <div>Language: {show.original_language}</div>
      </div>
    </div>
  );
}
