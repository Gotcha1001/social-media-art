"use client";

import Image from "next/image";
import MotionWrapper from "../MotionWrapper";
import { useUser } from "@clerk/nextjs";
import { useOptimistic, useState, useEffect } from "react";
import { addComment } from "@/lib/actions";
import { switchCommentLike, getCommentLikes } from "@/lib/actions"; // Add this import
import { Comment, User } from "@prisma/client";

type CommentWithUser = Comment & {
  user: User;
  _count?: { likes: number }; // Add likes count
};

const CommentList = ({
  comments,
  postId,
}: {
  comments: CommentWithUser[];
  postId: string;
}) => {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");
  const [likeStates, setLikeStates] = useState<{
    [commentId: string]: {
      likeCount: number;
      isLiked: boolean;
    };
  }>({});

  // Fetch likes for all comments on component mount
  useEffect(() => {
    const fetchCommentLikes = async () => {
      const likesStates: {
        [commentId: string]: {
          likeCount: number;
          isLiked: boolean;
        };
      } = {};

      for (const comment of commentState) {
        try {
          const likes = await getCommentLikes(comment.id);
          likesStates[comment.id] = {
            likeCount: likes.length,
            isLiked: user ? likes.includes(user.id) : false,
          };
        } catch (error) {
          console.error(
            `Error fetching likes for comment ${comment.id}:`,
            error
          );
          likesStates[comment.id] = {
            likeCount: comment._count?.likes || 0,
            isLiked: false,
          };
        }
      }

      setLikeStates(likesStates);
    };

    if (commentState.length > 0) {
      fetchCommentLikes();
    }
  }, [commentState, user]);

  const add = async () => {
    if (!user || !desc) return;

    addOptimisticComment({
      id: postId,
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
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
      const createdComment = await addComment(postId, desc);
      setCommentState((prev) => [createdComment, ...prev]);
      setDesc(""); // Clear input after successful comment
    } catch (err) {
      console.error(err);
    }
  };

  // Handle comment like action
  const handleCommentLike = async (commentId: string) => {
    // Optimistically update the like state
    setLikeStates((prev) => ({
      ...prev,
      [commentId]: {
        likeCount: prev[commentId]?.isLiked
          ? prev[commentId].likeCount - 1
          : prev[commentId].likeCount + 1,
        isLiked: !prev[commentId]?.isLiked,
      },
    }));

    try {
      await switchCommentLike(commentId);
      // Refetch likes to ensure consistency
      const likes = await getCommentLikes(commentId);
      setLikeStates((prev) => ({
        ...prev,
        [commentId]: {
          likeCount: likes.length,
          isLiked: user ? likes.includes(user.id) : false,
        },
      }));
    } catch (error) {
      console.error("Error toggling comment like:", error);
      // Revert optimistic update on error
      setLikeStates((prev) => ({
        ...prev,
        [commentId]: {
          likeCount: prev[commentId]?.likeCount || 0,
          isLiked: prev[commentId]?.isLiked || false,
        },
      }));
    }
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
              className="bg-transparent outline-none flex-1 border border-1 hover:border-indigo-400 p-2 rounded-lg"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <MotionWrapper>
              <button
                type="submit" // Make the button trigger the form submit
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 ml-2"
              >
                Add Comment
              </button>
            </MotionWrapper>
          </form>
        </div>
      )}

      {/* Comments Section */}
      {optimisticComments.map((comment) => (
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
                    <button onClick={() => handleCommentLike(comment.id)}>
                      <Image
                        src={
                          likeStates[comment.id]?.isLiked
                            ? "/liked.png"
                            : "/like.png"
                        }
                        alt="Like Icon"
                        height={12}
                        width={12}
                        className="cursor-pointer"
                      />
                    </button>
                  </MotionWrapper>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500">
                    {likeStates[comment.id]?.likeCount || 0} Likes
                  </span>
                </div>
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
