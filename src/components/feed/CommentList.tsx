"use client";

import Image from "next/image";
import MotionWrapper from "../MotionWrapper";

import { useUser } from "@clerk/nextjs";
import { useOptimistic, useState } from "react";
import { addComment } from "@/lib/actions";
import { Comment, User } from "@prisma/client";

type CommentWithUser = Comment & { user: User };

const CommentList = ({
  comments,
  postId,
}: {
  comments: CommentWithUser[];
  postId: number;
}) => {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");

  const add = async () => {
    if (!user || !desc) return;

    addOptimisticComment({
      id: Math.random().toString(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId.toString(),
      user: {
        id: user.id,
        username: "Sending Please Wait...",
        avatar: user.imageUrl || "/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });
    try {
      const createdComment = await addComment(postId.toString(), desc);

      setCommentState((prev) => [createdComment, ...prev]);
    } catch (err) {}
  };

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentWithUser) => [value, ...state]
  );

  return (
    <>
      {user && (
        <div className="flex items-center gap-4">
          <MotionWrapper>
            <Image
              src={user.imageUrl || "/noAvatar.png"}
              alt="comments"
              height={32}
              width={32}
              className="w-8 h-8 rounded-full"
            />
          </MotionWrapper>
          <form
            action={add}
            className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
          >
            <input
              type="text"
              placeholder="Write a comment..."
              className="bg-transparent outline-none flex-1"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <MotionWrapper>
              <Image
                src="/emoji.png"
                alt="emoji"
                width={16}
                height={16}
                className="cursor-pointer"
              />
            </MotionWrapper>
          </form>
        </div>
      )}

      {/* Comments Section */}
      {commentState.map((comment) => (
        <div className="mt-6" key={comment.id}>
          {/* Single Comment */}
          <div className="flex gap-4 justify-between">
            {/* Avatar */}
            <MotionWrapper>
              <Image
                src={comment.user.avatar || "/noAvatar.png"}
                alt="comments"
                height={40}
                width={40}
                className="w-10 h-10 rounded-full"
              />
            </MotionWrapper>

            {/* Description */}
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-medium">
                {comment.user.name && comment.user.surname
                  ? comment.user.name + " " + comment.user.surname
                  : comment.user.username}
              </span>
              <p>{comment.desc}</p>
              <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                <div className="flex items-center gap-4">
                  <MotionWrapper>
                    <Image src="/like.png" alt="Icon" height={12} width={12} />
                  </MotionWrapper>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500">0 Likes</span>
                </div>
                <div>Reply</div>
              </div>
            </div>

            {/* More Options Icon */}
            <Image
              src="/more.png"
              alt="Icon"
              height={16}
              width={16}
              className="cursor-pointer w-4 h-4"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentList;
