import Link from 'next/link';
import {auth} from '@/auth';
export default async function Home() {
  const session = await auth();
  const user = session?.user?.name;
  return (
    
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      Start rating your favourite movies {user}!
      <div>
        
        <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> 
          </Link>
      </div>
      <div>

        
      </div>
      </main>
      
    </div>
  );
}
