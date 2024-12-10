import Image from "next/image";
import Comments from "./Comments";
import MotionWrapper from "../MotionWrapper";
import { Post as PostType, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";
import { Suspense } from "react";
import PostInfo from "./PostInfo";
import { auth } from "@clerk/nextjs/server";
import MotionImageAll from "../MotionImageAll";

type FeedPostType = PostType & { user: User } & {
  likes: [{ userId: string }];
} & { _count: { comments: number } };

const Post = async ({ post }: { post: FeedPostType }) => {
  const { userId } = await auth();

  return (
    <div className="flex flex-col gap-4">
      {/* USER DIV */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <MotionWrapper>
            <Image
              src={post.user.avatar || "/noAvatar.png"}
              alt="User"
              height={40}
              width={40}
              className="w-10 h-10 rounded-full"
            />
          </MotionWrapper>

          <span className="font-medium">
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username}
          </span>
        </div>
        {userId === post.user.id && <PostInfo postId={post.id} />}
      </div>
      {/* DESCRIPTION DIV */}
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-96 flex justify-center items-center">
          {" "}
          {/* Centering container */}
          {post.img && (
            <MotionImageAll
              src={post.img}
              alt="Post Image"
              width={600} // Adjust width as needed
              height={400} // Adjust height as needed
              className="w-full min-h-96"
            />
          )}
        </div>
        <p>{post.desc}</p>
      </div>
      {/* INTERACTION DIV */}
      <Suspense fallback="Loading...">
        <PostInteraction
          commentNumber={post._count.comments}
          initialLikes={post.likes.map((like) => like.userId)} // Changed from likes to initialLikes
          postId={Number(post.id)}
        />
      </Suspense>
      <Suspense fallback="Loading...">
        <Comments postId={Number(post.id)} />
      </Suspense>
    </div>
  );
};

export default Post;
