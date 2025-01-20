'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/view'},
  {
    name: 'Movies', href: '/view/movies'
  },
  { name: 'TV-Shows', href: '/view/tv-shows'},
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex w-[100px] h-[48px] grow items-center flex justify-center border-2 border-black gap-2 rounded-md bg-gray-50 p-3 text-sm font-bold hover:bg-[#c0b58c] md:flex-none md:justify-start ',
              {
                'bg-[#c0b58c]': pathname === link.href,
              },
            )}
            >
            <p className="hidden md:block">{link.name}</p>
         
          </Link>
        );
      })}
    </>
  );
}
