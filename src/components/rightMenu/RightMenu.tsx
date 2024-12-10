import { User } from "@prisma/client";

import Birthdays from "./Birthdays";
import FriendRequests from "./FriendRequests";

import { Suspense } from "react";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import Ad from "../Ad";
import AdTwo from "../AdTwo";
import AdThree from "../AdThree";
import AdFour from "../AdFour";
import AdFive from "../AdFive";
import AdSix from "../AdSix";

const RightMenu = ({ user }: { user?: User }) => {
  return (
    <div className="flex flex-col gap-6 p-2">
      {user ? (
        <>
          <Suspense fallback="Loading...">
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback="Loading...">
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}
      <FriendRequests />
      <Birthdays />
      <Ad size="md" />
      <AdTwo size="md" />
      <AdThree size="md" />
      <AdFour size="md" />
      <AdFive size="lg" />
      <AdSix size="sm" />
    </div>
  );
};

export default RightMenu;
