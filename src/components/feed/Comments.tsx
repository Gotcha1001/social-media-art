import Image from "next/image";
import prisma from "@/lib/client";
import CommentList from "./CommentList";

const Comments = async ({ postId }: { postId: number }) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId: String(postId),
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="">
      {/* WRITE */}
      <CommentList comments={comments} postId={postId} />
    </div>
  );
};

export default Comments;