import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import StoryList from "./StoryList";

const Stories = async () => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) return null;

  const stories = await prisma.story.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      OR: [
        {
          user: {
            followers: {
              some: {
                followerId: currentUserId,
              },
            },
          },
        },
        {
          userId: currentUserId,
        },
      ],
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md overflow-scroll scrollbar-hide custom-scrollbar  text-sm">
      <div className="flex gap-8 w-max">
        {/* STORY */}

        <StoryList stories={stories} userId={currentUserId} />
      </div>
    </div>
  );
};

export default Stories;
