"use client";
import Image from "next/image";
import MotionWrapper from "./MotionWrapper";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";

const AddPosts = () => {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>();

  if (!isLoaded) {
    return "Loading...";
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
            placeholder="Whats on your mind?"
            className="bg-slate-100 rounded-lg flex-1 p-2"
            name="desc"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className="">
            <MotionWrapper>
              <Image
                src="/emoji.png"
                alt="icon"
                height={20}
                width={20}
                className="w-5 h-5 cursor-pointer self-end"
              />
            </MotionWrapper>
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
                  <Image src="/addImage.png" alt="" height={20} width={20} />
                  Photo
                </div>
              </MotionWrapper>
            )}
          </CldUploadWidget>

          <MotionWrapper>
            <div className="flex items-center gap-2 cursor-pointer">
              <Image src="/addVideo.png" alt="" height={20} width={20} />
              Video
            </div>
          </MotionWrapper>

          <MotionWrapper>
            {" "}
            <div className="flex items-center gap-2 cursor-pointer">
              <Image src="/poll.png" alt="" height={20} width={20} />
              Poll
            </div>
          </MotionWrapper>

          <MotionWrapper>
            {" "}
            <div className="flex items-center gap-2 cursor-pointer">
              <Image src="/addEvent.png" alt="" height={20} width={20} />
              Event
            </div>
          </MotionWrapper>
        </div>
      </div>
    </div>
  );
};

export default AddPosts;