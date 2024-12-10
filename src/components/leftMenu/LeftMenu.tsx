import ProfileCard from "./ProfileCard";
import Ad from "../Ad";
import SocialLinks from "./SocialLinks";

const LeftMenu = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className="flex flex-col gap-6 p-2">
      {type === "home" && <ProfileCard />}
      <SocialLinks />

      <Ad size="sm" />
    </div>
  );
};

export default LeftMenu;
