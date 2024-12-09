import { usePathname } from "next/navigation";
import Link from "next/link";
import { SelectedPage } from "@/lib/types";

type Props = {
  page: string;
  href: string;
  selectedPage?: SelectedPage;
  setSelectedPage?: (value: SelectedPage) => void;
  onClose?: () => void; // Add the onClose prop
};

const NavLink = ({
  page,
  href,
  selectedPage,
  setSelectedPage,
  onClose,
}: Props) => {
  const pathname = usePathname();
  const lowerCasePage = page.toLowerCase().replace(/ /g, "");
  const isActive =
    pathname === href ||
    (selectedPage && selectedPage === (lowerCasePage as SelectedPage));

  return (
    <Link
      href={href}
      className={`${
        isActive ? "text-indigo-500" : "text-gray-300"
      } transition duration-500 hover:text-teal-300 ${
        isActive ? "font-semibold" : ""
      }`}
      onClick={() => {
        if (setSelectedPage) setSelectedPage(lowerCasePage as SelectedPage);
        if (onClose) onClose(); // Close the menu
      }}
    >
      {page}
    </Link>
  );
};

export default NavLink;
