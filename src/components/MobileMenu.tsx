"use client"; // Ensures this component runs on the client side

import Link from "next/link";
import { useState } from "react";
import { ClerkLoaded, useUser, SignedIn, SignedOut } from "@clerk/nextjs";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Use the `useUser` hook to get the current user (runs only on client-side)
  const { user } = useUser();

  // Function to close the menu
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden m-4">
      <div
        className="flex flex-col gap-[4.5px] cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div
          className={`w-6 h-1 bg-indigo-700 rounded-sm ${
            isOpen ? "rotate-45" : ""
          } origin-left ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-indigo-700 rounded-sm ${
            isOpen ? "opacity-0" : ""
          } ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-indigo-700 rounded-sm ${
            isOpen ? "-rotate-45" : ""
          } origin-left ease-in-out duration-500`}
        />
      </div>

      {isOpen && (
        <div className="absolute left-0 top-24 w-full h-[calc(100vh-96px)] gradient-background2 flex flex-col items-center justify-center gap-8 font-medium text-xl z-10">
          {/* Home link */}
          <Link className="text-white" href="/" onClick={closeMenu}>
            Home
          </Link>

          <ClerkLoaded>
            <SignedIn>
              {/* Profile link when the user is signed in */}
              <Link
                className="text-white"
                href={`/profile/${user?.username || ""}`}
                onClick={closeMenu}
              >
                Profile
              </Link>
            </SignedIn>

            <SignedOut>
              {/* Login link when the user is not signed in */}
              <Link className="text-white" href="/sign-in" onClick={closeMenu}>
                Login
              </Link>
            </SignedOut>
          </ClerkLoaded>

          {/* Additional links */}
          <Link className="text-white" href="/" onClick={closeMenu}>
            Friends
          </Link>
          <Link className="text-white" href="/" onClick={closeMenu}>
            Groups
          </Link>
          <Link className="text-white" href="/" onClick={closeMenu}>
            Stories
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
