import Feed from "@/components/feed/Feed";
import LeftMenu from "@/components/leftMenu/LeftMenu";
import RightMenu from "@/components/rightMenu/RightMenu";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import AvatarWithMotion from "@/components/AvatarWithMotion"; // Import the client-side wrapper

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
      <div className="w-full lg:w-[70%] xl:w-[50%] gradient-background2 p-2 rounded-lg">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col justify-center items-center">
            <div className="w-full h-64 relative">
              <Image
                src={user.cover || "/noCover.png"}
                fill
                alt="Cover image"
                className="object-cover"
              />
              <AvatarWithMotion
                src={user.avatar || "/noAvatar.png"}
                alt="User avatar"
                width={128}
                height={128}
              />
            </div>
            <h1 className="mt-20 mb-4 text-2xl text-white font-medium">
              {user.name && user.surname ? user.name + " " + user.surname : user.username}
            </h1>
            <div className="flex items-center justify-center gap-12 mb-4 text-indigo-500">
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.posts}</span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followers}</span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followings}</span>
                <span className="text-sm">Following</span>
              </div>
            </div>
          </div>
          <Feed username={user.username} />
        </div>
      </div>
      <div className="hidden lg:block w-[30%] gradient-background2 rounded-lg">
        <RightMenu user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
