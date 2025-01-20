'use client';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';



export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
  
    const handleSearch = useDebouncedCallback((term) => {
  
      console.log(`Searching... ${term}`);
      const params = new URLSearchParams(searchParams);
  
      params.set('page', '1');
      if (term) {
        params.set('query', term);
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
    }, 300);
  
    return (
      <div className="flex justify-center items-center">
        <label className="sr-only">
          Search
        </label>
        <input
          className="w-[300px] min-w-[200px] rounded-full border border-gray-200 py-[9px] pl-10 text-sm placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
            
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
        
      </div>
    );
  }
  