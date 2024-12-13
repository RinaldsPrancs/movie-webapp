
import ShowList from '@/app/ui/view/shows'

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


  return (
    <div>
      <div className="text-black">
      <Search placeholder="Search tv-shows..." />
      </div>
      Shows:
      <ShowList query={query} currentPage={currentPage} />
    </div>
  );
};

