import Pagination from '@/app/ui/view/pagination';
import ShowList from '@/app/ui/view/shows'
import { fetchShowPages } from '@/app/lib/actions';
import Search from '@/app/ui/search';


export default async function ShowsPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: number;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchShowPages(query);

  return (
    <div>
      <div className="text-black">
      <Search placeholder="Search tv-shows..." />
      </div>
      <div>
      <Pagination totalPages={totalPages} />
      </div>
      Shows:
      <ShowList query={query} currentPage={currentPage} />
      <div>
      <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

