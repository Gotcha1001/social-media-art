"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import MotionWrapper from "../MotionWrapper";
import { useAuth } from "@clerk/nextjs";
import { useOptimistic } from "react";
import { switchLike, getPostLikes, getCommentCount } from "@/lib/actions";

const PostInteraction = ({
  postId,
  initialLikes,
  commentNumber,
}: {
  postId: number;
  initialLikes: string[];
  commentNumber: number;
}) => {
  const { userId } = useAuth();

  const [likeState, setLikeState] = useState({
    likeCount: initialLikes.length,
    isLiked: userId ? initialLikes.includes(userId) : false,
  });

  const [commentCount, setCommentCount] = useState(commentNumber);

  // Memoized function to fetch likes
  const fetchLikes = useCallback(async () => {
    try {
      const likes = await getPostLikes(String(postId));
      setLikeState({
        likeCount: likes.length,
        isLiked: userId ? likes.includes(userId) : false,
      });
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  }, [postId, userId]);

  // Memoized function to fetch comment count
  const fetchCommentCount = useCallback(async () => {
    try {
      const count = await getCommentCount(String(postId));
      setCommentCount(count);
    } catch (error) {
      console.error("Error fetching comment count:", error);
    }
  }, [postId]);

  // Call functions to refresh data on component mount
  useEffect(() => {
    fetchLikes();
    fetchCommentCount();
  }, [fetchLikes, fetchCommentCount]);

  // Optimistic UI for likes
  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state) => ({
      likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
      isLiked: !state.isLiked,
    })
  );

  // Handle like button click
  const likeAction = async () => {
    switchOptimisticLike("");
    try {
      await switchLike(String(postId));
      fetchLikes(); // Refresh likes after toggling
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="flex items-center justify-between text-sm my-4">
      <div className="flex gap-8">
        {/* Like section */}
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <button onClick={likeAction}>
            <MotionWrapper>
              <Image
                src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
                alt="ICON"
                height={16}
                width={16}
                className="cursor-pointer"
              />
            </MotionWrapper>
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {optimisticLike.likeCount}
            <span className="hidden md:inline"> Likes</span>
          </span>
        </div>
        {/* Comment section */}
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <MotionWrapper>
            <Image
              src="/comment.png"
              alt="ICON"
              height={16}
              width={16}
              className="cursor-pointer"
            />
          </MotionWrapper>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {commentCount} <span className="hidden md:inline">Comments</span>
          </span>
        </div>
      </div>
      {/* Share section */}
      <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
        <MotionWrapper>
          <Image
            src="/share.png"
            alt="ICON"
            height={16}
            width={16}
            className="cursor-pointer"
          />
        </MotionWrapper>
        <span className="text-gray-300">|</span>
        <span className="text-gray-500">
          <span className="hidden md:inline">Share</span>
        </span>
      </div>
    </div>
  );
};

export default PostInteraction;
