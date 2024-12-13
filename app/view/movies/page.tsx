
import MoviesList from '@/app/ui/view/movies';

import Search from '@/app/ui/search';




export default async function MoviesPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  
  
  
    return (
      <div className="text-black">
      
      <Search placeholder="Search movies..." />
    
      <div className='text-white'>
        
        movies:
        <MoviesList query={query} currentPage={currentPage} />
     </div>
    </div>
      );

  }