import MoviesList from '@/app/ui/view/movies';
import Search from '@/app/ui/search';
import { fetchMoviePages } from '@/app/lib/actions';
import Pagination from '@/app/ui/view/pagination';

export default async function MoviesPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchMoviePages(query);
  
  
    return (
       <div className='my-1 space-y-4 text-white'>
            <div className="text-black">
            <Search placeholder="Search movies..." />
            </div>
            <div className='flex justify-center items-center'>
            <Pagination totalPages={totalPages} />
            </div>
            <MoviesList query={query} currentPage={currentPage} />
            <div className='flex justify-center items-center'>
            <Pagination totalPages={totalPages} />
            </div>
          </div>
      );

  }