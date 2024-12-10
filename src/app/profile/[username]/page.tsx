import Feed from "@/components/feed/Feed";
import LeftMenu from "@/components/leftMenu/LeftMenu";
import RightMenu from "@/components/rightMenu/RightMenu";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import AvatarWithMotion from "@/components/AvatarWithMotion";
import ProfileHeader from "./ProfileHeader";
const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const username = params.username;

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });

  if (!user) return notFound();

  const { userId: currentUserId } = await auth();

  let isBlocked;

  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId,
      },
    });
    if (res) isBlocked = true;
  } else {
    isBlocked = false;
  }
  if (isBlocked) return notFound();

  return (
    <div className="flex gap-4 pt-2 px-2">
      <div className="hidden xl:block w-[20%] gradient-background2 rounded-lg">
        <LeftMenu type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%] mx-auto gradient-background2 p-4 rounded-lg">
        <ProfileHeader
          cover={user.cover || undefined}
          avatar={user.avatar || undefined}
          name={user.name || undefined}
          surname={user.surname || undefined}
          username={user.username}
          postsCount={user._count.posts}
          followersCount={user._count.followers}
          followingsCount={user._count.followings}
        />
        <Feed username={user.username} />
      </div>
      <div className="hidden lg:block w-[30%] gradient-background2 rounded-lg">
        <RightMenu user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
