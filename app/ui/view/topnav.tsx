import Link from "next/link";
import Image from "next/image";
import logo from "./logotv.png";
import NavLinks from "@/app/ui/view/nav-links";
import { signOut } from "@/auth";
export default function TopNav() {
  return (
    <div className="flex h-full bg-[#EDEADE] border-4 border-black text-black w-full ">
      <Link className="w-[10%] justify-center flex items-center" href="/">
        <Image
          src={logo}
          alt="Start Page Logo"
          className="h-full w-auto object-contain"
        />
      </Link>

      <div className="w-[90%] container mx-auto flex items-center justify-around p-4">
        <NavLinks />

        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="flex w-[100px] h-[48px]  border-2 border-black grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-bold hover:bg-[#c0b58c]  md:flex-none md:justify-start">
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
