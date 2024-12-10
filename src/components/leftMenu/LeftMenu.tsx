import ProfileCard from "./ProfileCard";
import Ad from "../Ad";
import SocialLinks from "./SocialLinks";
import AdSeven from "../AdSeven";
import AdEight from "../AdEight";
import AdNine from "../AdNine";
import AdTen from "../AddTen";
import AdEleven from "../AdEleven";

const LeftMenu = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className="flex flex-col gap-6 p-2">
      {type === "home" && <ProfileCard />}
      <SocialLinks />

      <Ad size="sm" />
      <AdSeven size="lg" />
      <AdEight size="md" />
      <AdNine size="lg" />
      <AdTen size="lg" />
      <AdEleven size="sm" />
    </div>
  );
};

export default LeftMenu;
