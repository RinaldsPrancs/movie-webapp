
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
       <div>
            <div className="text-black">
            <Search placeholder="Search tv-shows..." />
            </div>
            <div>
            <Pagination totalPages={totalPages} />
            </div>
            Shows:
            <MoviesList query={query} currentPage={currentPage} />
            <div>
            <Pagination totalPages={totalPages} />
            </div>
          </div>
      );

  }