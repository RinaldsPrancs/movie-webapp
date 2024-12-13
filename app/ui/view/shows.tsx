import { fetchFilteredShows } from '@/app/lib/actions';
import Image from 'next/image'

type Show = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
  first_air_date:string;
};


export default async function ShowList( 
{query, currentPage}:
{query: string; currentPage: number;}
  ) 
  {
    let shows : Show[] = [];
    shows = await fetchFilteredShows(query, currentPage);
    const index = 30;
    return (

      <div className='grid grid-cols-8 gap-5'>
        
         {shows.map((show) => (
          
          <div key = {show.id} className='bg-gradient-to-r from-cyan-500 to-blue-500'>
 <Image
                                          src={`https://image.tmdb.org/t/p/original${show.poster_path}`}
                                          width={250}
                                          height={250}
                                          alt="Picture of the author"
                                        />
                        <p>{show.name}</p>
                        {/* <p>{show.id}</p> */}
                        {/* <p>{show.overview}</p> */}
                        <p>
                          <em>Year - {show.first_air_date.substring(0, 4)}</em>
                        </p>
                        <p>
                          Rating - {show.vote_average}
                        </p>

          </div>
                    ))}
     </div>
      );
  }