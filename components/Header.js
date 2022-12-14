import Image from "next/image";
import React from "react";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";

import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  return (
    <div className="shadow-sm border-b-1 bg-white sticky top-0 z-50">
      <div className="flex justify-between bg-white max-w-6xl mx-5 lg:mx-auto ">
        {/* left */}
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid w-24 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className="relative lg:hidden w-8  flex-shrink-0 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* Middle - search field*/}
        <div className="max-w-xs ">
          <div className="relative mt-1 p-3 rounded-md ">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm
           border-gray-300 focus:ring-black focus:border-black rounded-md  "
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => router.push("/")} className="navbtn" />
          <MenuIcon className="md:hidden hidden" />

          {session ? (
            <>
              <div className="relative navbtn">
                <PaperAirplaneIcon className="navbtn rotate-45" />
                <div
                  className="absolute -top-1 -right-2 text-xs w-5 h-5
            bg-red-500 rounded-full flex items-center justify-center  animate-pulse text-white"
                >
                  3
                </div>
              </div>

              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className=" h-7 w-7 md:h-6 md:inline-flex
        cursor-pointer hover:scale-125
        transition-all duration-150 ease-out"
              />
              <UserGroupIcon className="navbtn" />
              <HeartIcon className="navbtn" />
              <img
                onClick={signOut}
                src={session.user.image}
                alt="picture"
                className="h-8 rounded-full cursor-pointer"
              />
            </>
          ) : (
            <button className="text-xs md:text-sm" onClick={signIn}>
              SignIn
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
