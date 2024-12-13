"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";
import { SelectedPage } from "@/lib/types";
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
import SearchBar from "./SearchBar";
import MotionWrapperDelay from "./MotionWrapperDelay";

const Navbar = () => {
  const pathname = usePathname();
  const { user, isLoaded, isSignedIn } = useUser();

  // More robust error handling for user creation
  useEffect(() => {
    const createUser = async () => {
      if (!isLoaded) return;

      if (isSignedIn && user) {
        try {
          console.log("Attempting to create user. User object:", user);

          const username =
            user.username ||
            user.fullName?.replace(/\s+/g, "_").toLowerCase() ||
            `user_${user.id.slice(0, 8)}`;

          const response = await fetch("/api/create-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              firstName: user.firstName,
              lastName: user.lastName,
              avatar: user.imageUrl,
              clerkUserId: user.id, // Include Clerk user ID for reference
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to create user");
          }

          console.log("User creation request sent successfully.");
        } catch (error) {
          console.error("Failed to create user:", error);
        }
      }
    };

    createUser();
  }, [isLoaded, isSignedIn, user]);

  // State to manage the currently selected page
  const [selectedPage, setSelectedPage] = useState<SelectedPage | undefined>(
    () => {
      const initialPage = pathname.split("/")[1];
      return initialPage ? (initialPage as SelectedPage) : undefined;
    }
  );

  // Defensive rendering to handle different loading states
  if (!isLoaded) {
    return (
      <div className="h-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 border-solid"></div>
      </div>
    );
  }

  return (
    <MotionWrapperDelay
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      variants={{
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 },
      }}
    >
      <div className="h-24 flex items-center justify-between mx-3">
        {/* LEFT: Logo */}
        <div className="md:hidden lg:block w-[20%]">
          <NavLink
            page="BandSocial"
            href="/"
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        </div>

        {/* CENTER: Navigation Links and Search */}
        <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
          {/* Navigation Links */}
          <div className="flex gap-6 text-slate-400">
            <NavLink
              page="HomePage"
              href="/"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            {isSignedIn && user && (
              <NavLink
                page="Profile"
                href={`/profile/${user.username || ""}`}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            )}
            <NavLink
              page="Friends"
              href="/friends"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <NavLink
              page="Stories"
              href="/stories"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <NavLink
              page="Find"
              href="/findfriends"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </div>

          {/* Search Bar */}
          <div className="ml-4 md:ml-8">
            <SearchBar />
          </div>
        </div>

        {/* RIGHT: Login/Logout and User Options */}
        <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
          {!isLoaded ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 border-solid"></div>
            </div>
          ) : isSignedIn ? (
            <div className="flex items-center gap-4 p-2 mr-3 sm:mr-3  md:mr-8 xl:mr-8 lg:mr-8">
              {/* Icons for friends, notifications, and messages */}
              <NavLink
                page="Friends"
                href="/friends"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
              {/* <div
                className={`cursor-pointer ${
                  pathname === "/notifications"
                    ? "text-indigo-600"
                    : "text-slate-400 hover:text-indigo-600"
                }`}
              >
                <Bell className="w-6 h-6" aria-label="Notifications" />
              </div>
              <div
                className={`cursor-pointer ${
                  pathname === "/messages"
                    ? "text-indigo-600"
                    : "text-slate-400 hover:text-indigo-600"
                }`}
              >
                <MessageCircle className="w-6 h-6" aria-label="Messages" />
              </div> */}
              {/* User Button */}
              <UserButton />
            </div>
          ) : (
            <div className="flex items-center gap-2 group">
              <LogIn
                className={`w-5 h-5 ${
                  pathname === "/sign-in"
                    ? "text-indigo-900"
                    : "text-teal-600 group-hover:text-indigo-900 transition-colors duration-200"
                }`}
                aria-label="Login"
              />
              <NavLink
                page="Sign-In"
                href="/sign-in"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </div>
          )}

          <MobileMenu />
        </div>
      </div>
    </MotionWrapperDelay>
  );
};

export default Navbar;
