"use client";

import { Story, User } from "@prisma/client";
import MotionWrapper from "./MotionWrapper";
import Image from "next/image";
import { useOptimistic, useState } from "react";
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
  const [img, setImg] = useState<any>();

  const { user, isLoaded } = useUser();

  const [optimiticStories, addOptimisticStory] = useOptimistic(
    storyList,
    (state, value: StoryWithUser) => [value, ...state]
  );

  const add = async () => {
    if (!img?.secure_url) return;

    addOptimisticStory({
      id: Math.random().toString(), // Ensure that id is a string
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
    });

    try {
      const createdStory = await addStory(img.secure_url);
      setStoryList((prev) => [createdStory!, ...prev]);
      setImg(null);
    } catch (error) {}
  };

  return (
    <>
      <CldUploadWidget
        uploadPreset="social"
        onSuccess={(result, { widget }) => {
          if (typeof result.info !== "string" && result.info?.secure_url) {
            setImg({ secure_url: result.info.secure_url });
          }
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div className="flex flex-col items-center gap-2 cursor-pointer relative">
              <MotionWrapper>
                <Image
                  src={img?.secure_url || user?.imageUrl || "/noAvatar.png"}
                  alt="Image"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full ring-2 object-cover"
                  onClick={() => open()}
                />
              </MotionWrapper>
              {img ? (
                <form action={add}>
                  <button className="text-xs bg-indigo-600 p-1 rounded-lg text-white">
                    Send
                  </button>
                </form>
              ) : (
                <span className="font-medium">Add a Story</span>
              )}
              <div className="absolute text-6xl text-gray-200 top-1">+</div>
            </div>
          );
        }}
      </CldUploadWidget>
      {optimiticStories.map((story) => (
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
