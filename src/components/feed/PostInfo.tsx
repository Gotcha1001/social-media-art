"use client";

import { deletePost } from "@/lib/actions";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useState } from "react";

const PostInfo = ({ postId }: { postId: string }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deletePost(postId); // Assuming deletePost is an async function
      toast.success("Post deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete the post.");
    }
  };

  return (
    <div className="relative">
      <Image
        src="/more.png"
        alt="ICON"
        height={16}
        width={16}
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer"
      />
      {open && (
        <div className="absolute top-4 right-0 bg-white w-32 p-4 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-30">
          <button className="text-left cursor-pointer hover:text-gray-600">
            View
          </button>
          <button className="text-left cursor-pointer hover:text-gray-600">
            Re-post
          </button>
          <button
            type="button"
            className="text-left text-red-600 hover:text-red-800 cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
