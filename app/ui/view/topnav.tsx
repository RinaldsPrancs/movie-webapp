import Link from 'next/link';
import NavLinks from '@/app/ui/view/nav-links';
import { signOut } from '@/auth';
export default function TopNav() {
  return (
    <div className="flex bg-white text-black w-full ">
        
      <Link
        className="w-[10%] justify-center flex items-center"
        href="/"
      >
            start page logo
            
      </Link>

      <div className="w-[90%] container mx-auto flex items-center justify-around p-4">
        <NavLinks />

        <form
         action={async () => {
          'use server';
          await signOut();
        }}>
          <button className="flex w-[100px] h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start">
            
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
      
    </div>
  );
}