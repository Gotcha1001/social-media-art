import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import ProfileCardView from "./ProfileCardView";

const ProfileCard = async () => {
  // Await the `auth()` function
  const { userId } = await auth();

  // Handle the case where `userId` is undefined
  if (!userId) {
    console.warn("No userId found");
    return null; // Return nothing or a placeholder component
  }

  // Fetch the user data
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  if (!user) return null;

  return (
    <ProfileCardView
      cover={user.cover || undefined} // Convert null to undefined
      avatar={user.avatar || undefined} // Convert null to undefined
      name={user.name || undefined} // Convert null to undefined
      surname={user.surname || undefined} // Convert null to undefined
      username={user.username} // Always required
      followers={user._count.followers} // Always required
    />
  );
};

export default ProfileCard;
