import { User } from "@prisma/client";

import Birthdays from "./Birthdays";
import FriendRequests from "./FriendRequests";

import { Suspense } from "react";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import Ad from "../Ad";

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
    </div>
  );
};

export default RightMenu;
