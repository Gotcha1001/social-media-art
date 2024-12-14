"use client";

import { Story, User } from "@prisma/client";
import MotionWrapper from "./MotionWrapper";
import Image from "next/image";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import { addStory } from "@/lib/actions";

type StoryWithUser = Story & { user: User };

const StoryList = ({
  stories,
  userId,
}: {
  stories: StoryWithUser[];
  userId: string;
}) => {
  const [storyList, setStoryList] = useState(stories);
  const [img, setImg] = useState<{ secure_url: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { user } = useUser();

  const handleUploadSuccess = (result: any, widget: any) => {
    if (typeof result.info !== "string" && result.info?.secure_url) {
      setImg({ secure_url: result.info.secure_url });
      widget.close();
    }
  };

  const handleAddStory = async () => {
    if (!img?.secure_url || isUploading) return;

    setIsUploading(true);

    try {
      const optimisticStory = {
        id: `temp-${Math.random().toString()}`,
        img: img.secure_url,
        createdAt: new Date(Date.now()),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        userId: userId,
        user: {
          id: userId,
          username: "Sending...",
          avatar: user?.imageUrl || "/noAvatar.png",
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
      };

      // Optimistically add the story to the list
      setStoryList((prev) => [optimisticStory, ...prev]);

      // Actually add the story to the backend
      const createdStory = await addStory(img.secure_url);

      // Update the story list, replacing the optimistic story with the actual one
      setStoryList((prev) => {
        const updatedList = prev.filter(
          (story) => story.id !== optimisticStory.id
        );
        return createdStory ? [createdStory, ...updatedList] : updatedList;
      });

      // Reset image and uploading state
      setImg(null);
    } catch (error) {
      console.error("Failed to add story:", error);
      // Remove the optimistic story if upload fails
      setStoryList((prev) =>
        prev.filter((story) => !story.id.startsWith("temp-"))
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <CldUploadWidget uploadPreset="social" onSuccess={handleUploadSuccess}>
        {({ open }) => (
          <div className="flex flex-col items-center gap-2 cursor-pointer relative">
            <MotionWrapper>
              <div
                className="w-20 h-20 rounded-full ring-2 relative overflow-hidden"
                onClick={() => open()}
              >
                <Image
                  src={img?.secure_url || user?.imageUrl || "/noAvatar.png"}
                  alt="Image"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-6xl opacity-0 hover:opacity-100 transition-opacity">
                  +
                </div>
              </div>
            </MotionWrapper>

            {img ? (
              <button
                onClick={handleAddStory}
                disabled={isUploading}
                className={`text-xs p-1 rounded-lg text-white ${
                  isUploading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isUploading ? "Sending..." : "Send"}
              </button>
            ) : (
              <span className="font-medium">Add a Story</span>
            )}
          </div>
        )}
      </CldUploadWidget>

      {storyList.map((story) => (
        <MotionWrapper key={story.id}>
          <div className="flex flex-col items-center gap-2">
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden ring-2 ring-indigo-600">
              <Image
                src={story.img}
                alt="Story"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-medium text-center max-w-[80px] truncate">
              {story.user.username || story.user.name || "User"}
            </span>
          </div>
        </MotionWrapper>
      ))}
    </>
  );
};

export default StoryList;
