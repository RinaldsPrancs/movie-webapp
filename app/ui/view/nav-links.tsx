"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState, MouseEvent } from "react";

const links = [
  { name: "Home", href: "/view" },
  {
    name: "Movies",
    href: "/view/movies",
  },
  { name: "TV-Shows", href: "/view/tv-shows" },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);


  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, linkHref: string) => {
    // Only prevent the default navigation if the page is still navigating or the same page is being clicked
    if (isNavigating || pathname === linkHref) {
      e.preventDefault();
      return;
    }
    setIsNavigating(true);
    setTimeout(() => {
      setIsNavigating(false); // Allow navigation after 500ms delay
    }, 500);
  };

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            rel="nofollow"
            onClick={(e) => handleLinkClick(e, link.href)}
            className={clsx(
              "flex w-[100px] h-[48px] grow items-center flex justify-center border-2 border-black gap-2 rounded-md p-3 text-sm font-bold hover:bg-[#c0b58c] md:flex-none md:justify-start ",
              pathname === link.href ? "bg-[#c0b58c]" : "bg-gray-50"
            )}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
