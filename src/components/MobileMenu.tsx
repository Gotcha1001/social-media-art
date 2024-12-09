"use client";

import { useState } from "react";
import { ClerkLoaded, useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import NavLink from "@/components/NavLink"; // Adjust path as necessary
import { SelectedPage } from "@/lib/types";
import SearchBar from "./SearchBar";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<SelectedPage | undefined>();
  const { user } = useUser();

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleSearchSubmit = () => {
    // Close the menu when a search is performed
    closeMenu();
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
          <SearchBar onSearchSubmit={handleSearchSubmit} />
          <NavLink
            page="Home"
            href="/"
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            onClose={closeMenu} // Pass closeMenu here
          />

          <ClerkLoaded>
            <SignedIn>
              <NavLink
                page="Profile"
                href={`/profile/${user?.username || ""}`}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                onClose={closeMenu} // Pass closeMenu here
              />
            </SignedIn>
            <SignedOut>
              <NavLink
                page="Sign In"
                href="/sign-in"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                onClose={closeMenu} // Pass closeMenu here
              />
            </SignedOut>
          </ClerkLoaded>

          <NavLink
            page="Friends"
            href="/friends"
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            onClose={closeMenu} // Pass closeMenu here
          />
          <NavLink
            page="Groups"
            href="/groups"
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            onClose={closeMenu} // Pass closeMenu here
          />
          <NavLink
            page="Stories"
            href="/stories"
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            onClose={closeMenu} // Pass closeMenu here
          />
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
