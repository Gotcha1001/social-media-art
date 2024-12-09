import { auth } from "@clerk/nextjs/server";
import Post from "./Post";
import prisma from "@/lib/client";

const Feed = async ({ username }: { username?: string }) => {
  const { userId } = await auth();

  let posts: any[] = [];
  try {
    if (username) {
      posts = await prisma.post.findMany({
        where: {
          user: {
            username: username,
          },
        },
        include: {
          user: true,
          likes: {
            select: {
              userId: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    if (!username && userId) {
      const following = await prisma.follower.findMany({
        where: {
          followerId: userId,
        },
        select: {
          followingId: true,
        },
      });
      const followingIds = following.map((f) => f.followingId);
      const ids = [userId, ...followingIds];

      posts = await prisma.post.findMany({
        where: {
          userId: {
            in: ids,
          },
        },
        include: {
          user: true,
          likes: {
            select: {
              userId: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    // Check for posts with missing user data and filter them out
    posts = posts.filter((post) => post.user);

    if (posts.length === 0) {
      console.warn("No valid posts found or user data is missing.");
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return (
      <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
        <p>There was an error fetching posts. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      {posts.length
        ? posts.map((post) => <Post key={post.id} post={post} />)
        : "No posts found!"}
    </div>
  );
};

export default Feed;
