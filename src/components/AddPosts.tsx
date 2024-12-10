"use client";
import Image from "next/image";
import MotionWrapper from "./MotionWrapper";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";
import { PhotoIcon } from "@heroicons/react/20/solid";

const AddPosts = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>();

  if (!isLoaded) {
    return "Loading...";
  }

  if (!isSignedIn) {
    // Display a message if not signed in
    return (
      <div className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center justify-center text-sm">
        <p className="text-gray-500">Please sign in to add a post.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* AVATAR */}
      <MotionWrapper>
        <Image
          src={user?.imageUrl || "/noAvatar.png"}
          alt=""
          height={48}
          width={48}
          className="w-12 h-12 object-cover rounded-full"
        />
      </MotionWrapper>

      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form
          action={(formData) => addPost(formData, img?.secure_url || "")}
          className="flex gap-4"
        >
          <textarea
            placeholder="What's on your mind?"
            className=" rounded-lg flex-1 p-2 resize-none border hover:border-indigo-500"
            name="desc"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className="flex flex-col justify-end">
            <AddPostButton />
          </div>
        </form>

        {/* POST OPTIONS */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <CldUploadWidget
            uploadPreset="social"
            onSuccess={(result, { widget }) => {
              if (typeof result.info !== "string" && result.info?.secure_url) {
                setImg({ secure_url: result.info.secure_url });
              }
              widget.close();
            }}
          >
            {({ open }) => (
              <MotionWrapper>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => open()}
                >
                  <PhotoIcon
                    className="text-indigo-600"
                    height={20}
                    width={20}
                  />
                  Photo
                </div>
              </MotionWrapper>
            )}
          </CldUploadWidget>
        </div>
      </div>
    </div>
  );
};

export default AddPosts;
