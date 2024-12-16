import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { FolderOpen, PenBox, MapPin } from "lucide-react";
import UserMenu from "./UserMenu";
import MotionWrapperDelay from "./MotionWrapperDelay";

const Header = () => {
  return (
    <MotionWrapperDelay
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 1 }}
      variants={{
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 },
      }}
    >
      <header className=" mx-auto gradient-background2">
        <nav className="py-6 px-4 flex justify-between items-center">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              alt="Logo"
              width={200}
              height={60}
              className="h-10 w-auto object-contain horizontal-rotate"
            />
          </Link>
          <div className="flex items-center gap-4">
            {/* Login and other things */}
            <SignedIn>
              <Link href="/allbands/placeholderGigs">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 group"
                >
                  <span className="text-white group-hover:text-black transition-colors duration-200">
                    <FolderOpen size={18} />
                  </span>
                  <span className="hidden md:inline text-white group-hover:text-black">
                    All Bands
                  </span>
                </Button>
              </Link>

              {/* Link to Gig Providers */}
              <Link href="/gig-providers/placeholder-slug">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 group"
                >
                  <span className="text-white group-hover:text-black transition-colors duration-200">
                    <MapPin size={18} />
                  </span>
                  <span className="hidden md:inline text-white group-hover:text-black">
                    Gig Providers
                  </span>
                </Button>
              </Link>
            </SignedIn>

            {/* Link to View Profile */}
            <Link href="/view-profile/slug-placeholder">
              <Button variant="band" className="flex items-center gap-2">
                <PenBox size={18} />
                <span className="hidden md:inline">View Profile</span>
              </Button>
            </Link>

            {/* Link to Design Profile */}
            <Link href="/profile">
              <Button variant="band" className="flex items-center gap-2">
                <PenBox size={18} />
                <span className="hidden md:inline">Design Profile</span>
              </Button>
            </Link>

            <SignedOut>
              <SignInButton forceRedirectUrl="/dashboard">
                <Button variant="outline">Login</Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserMenu />
            </SignedIn>
          </div>
        </nav>
      </header>
    </MotionWrapperDelay>
  );
};

export default Header;
