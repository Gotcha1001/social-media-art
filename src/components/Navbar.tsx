"use client"; // Ensure this file runs client-side

import Link from "next/link";
import MobileMenu from "./MobileMenu";
import {
  Home,
  Users,
  Book,
  Bell,
  MessageCircle,
  LogIn,
  Search,
} from "lucide-react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const Navbar = () => {
  // Use the `useUser` hook to get the current user (runs only client-side)
  const { user } = useUser();

  return (
    <div className="h-24 flex items-center justify-between mx-3">
      {/* LEFT */}
      <div className="md:hidden lg:block w-[20%]">
        <Link href="/" className="font-bold text-xl text-indigo-900 p-2">
          BandSocial
        </Link>
      </div>

      {/* CENTER */}
      <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
        {/* LINKS */}
        <div className="flex gap-6 text-slate-400">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-indigo-600"
          >
            <Home className="w-4 h-4" />
            <span>HomePage</span>
          </Link>

          {/* New Profile Link */}
          <ClerkLoaded>
            <Link
              href={`/profile/${user?.username || ""}`}
              className="flex items-center gap-2 hover:text-indigo-600"
            >
              <Users className="w-4 h-4" />
              <span>Profile</span>
            </Link>
          </ClerkLoaded>

          <Link
            href="/"
            className="flex items-center gap-2 hover:text-indigo-600"
          >
            <Users className="w-4 h-4" />
            <span>Friends</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-indigo-600"
          >
            <Book className="w-4 h-4" />
            <span>Stories</span>
          </Link>
        </div>

        {/* Search bar */}
        <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl ">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none"
          />
          <Search width={14} height={14} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <ClerkLoading>
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 border-solid"></div>
          </div>
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            <div className="flex items-center gap-4 p-2">
              {/* User icons */}
              <div className="cursor-pointer">
                <Users
                  className="w-6 h-6 text-slate-400 hover:text-indigo-600"
                  aria-label="Friends"
                />
              </div>
              <div>
                <Bell
                  className="w-6 h-6 text-slate-400 hover:text-indigo-600"
                  aria-label="Notifications"
                />
              </div>
              <div>
                <MessageCircle
                  className="w-6 h-6 text-slate-400 hover:text-indigo-600"
                  aria-label="Messages"
                />
              </div>
              {/* User button */}
              <UserButton />
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-2 group">
              <LogIn
                className="w-5 h-5 text-teal-600 group-hover:text-indigo-900 transition-colors duration-200"
                aria-label="Login"
              />
              <Link
                className="text-teal-600 group-hover:text-indigo-900 transition-colors duration-200 text-sm"
                href="/sign-in"
              >
                Login/Register
              </Link>
            </div>
          </SignedOut>
        </ClerkLoaded>

        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
