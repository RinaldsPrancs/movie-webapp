import { fetchFilteredShows,redirectToEdit } from '@/app/lib/actions';
import Image from 'next/image'
import Link from 'next/link';

type Show = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  first_air_date:string;
};


export default async function ShowList( 
{query, currentPage}:
{query: string; currentPage: number;}
  ) 
  {
    let shows : Show[] = [];
    shows = await fetchFilteredShows(query, currentPage);
    // shows = shows
     // Ensure release_date exists
    // .sort((a, b) => {
    //   const yearA = parseInt(a.first_air_date.split('-')[0], 10);
    //   const yearB = parseInt(b.first_air_date.split('-')[0], 10);
    //   return yearA - yearB; // Sort in ascending order
    // });
    return (

      <div className='grid grid-cols-8 gap-5'>
        
         {shows.map((show) => (
          
          <div key = {show.id} >
            <Link href={`/adote/${show.id}`}>
 <Image
                                          src={`https://image.tmdb.org/t/p/original${show.poster_path}`}
                                          width={250}
                                          height={250}
                                          alt="Picture of the author"
                                        />
                        <p>{show.name}</p>
                        <p>
                          <em>Year - {show.first_air_date.substring(0, 4)}</em>
                        </p>
                        <p>
                          Rating - {show.vote_average}
                        </p>
                        </Link>
          </div>
          
                    ))}
     </div>
      );
  }