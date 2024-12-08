"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import toast from "react-hot-toast";
import UpdateButton from "./UpdateButton";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cover, setCover] = useState<{ secure_url?: string }>({});
  const [loading, setLoading] = useState(false); // New loading state

  const router = useRouter()
  
  const handleClose = () => {
    setOpen(false);
  };



  const handleSubmit = async (formData: FormData) => {
    setLoading(true); // Start loading

    try {
      await updateProfile({ formData, cover: cover.secure_url || "" });
      handleClose(); // Close modal on successful update
      setLoading(false); // Stop loading
      toast.success("Profile has been updated!");
      router.refresh()
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error(err instanceof Error ? err.message : "Something went wrong!");
    }
  };

  return (
    <div className="">
      <span
        className="text-indigo-600 text-xs cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Update
      </span>
      {open && (
        <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission behavior
              const formData = new FormData(e.target as HTMLFormElement); // Cast e.target to HTMLFormElement
              handleSubmit(formData); // Pass form data and the cover URL
            }}
            className="p-12 gradient-background2 rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative"
          >
            {/* TITLE */}
            <h1 className="text-white text-2xl">Update Profile</h1>
            <div className="mt-4 text-sm text-gray-200 ">
              Use the Navbar profile to change the avatar or username
            </div>
            {/* COVER PICTURE UPLOAD */}

            <CldUploadWidget
              uploadPreset="social"
              onSuccess={(result) => {
                // Check if result.info is an object and not a string
                if (
                  typeof result.info !== "string" &&
                  result.info?.secure_url
                ) {
                  setCover({ secure_url: result.info.secure_url });
                }
              }}
            >
              {({ open }) => (
                <div
                  className="flex flex-col gap-4 my-4"
                  onClick={() => open()}
                >
                  <label htmlFor="" className="text-white">
                    Cover Picture
                  </label>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Image
                      src={user.cover || "/noCover.png"}
                      alt="cover image"
                      width={48}
                      height={32}
                      className="w-16 h-12 rounded-md object-cover"
                    />
                    <span className="text-sm underline text-purple-600">
                      Change
                    </span>
                  </div>
                </div>
              )}
            </CldUploadWidget>

            {/* Error message */}
            {error && <div className="text-red-500">{error}</div>}
            {/* Loading state */}
            {loading && <div className="text-white">Updating...</div>}

            {/*WRAPPER  */}
            <div className="flex flex-wrap gap-4">
              {/* INPUT */}
              <div className="flex-1 min-w-[45%] flex flex-col gap-1">
                <label htmlFor="" className="text-xs text-indigo-600">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder={user.name || "John"}
                  className="ring-1 ring-gray-400 p-[13px] rounded-md text-sm"
                  name="name"
                />
              </div>

              {/* INPUT */}
              <div className="flex-1 min-w-[45%] flex flex-col gap-1">
                <label htmlFor="" className="text-xs text-indigo-600">
                  Surname
                </label>
                <input
                  type="text"
                  placeholder={user.surname || "Doe"}
                  className="ring-1 ring-gray-400 p-[13px] rounded-md text-sm"
                  name="surname"
                />
              </div>

              {/* INPUT */}
              <div className="flex-1 min-w-[45%] flex flex-col gap-1">
                <label htmlFor="" className="text-xs text-indigo-600">
                  Description
                </label>
                <input
                  type="text"
                  placeholder={user.description || "Life is Beautiful"}
                  className="ring-1 ring-gray-400 p-[13px] rounded-md text-sm"
                  name="description"
                />
              </div>

              {/* INPUT */}
              <div className="flex-1 min-w-[45%] flex flex-col gap-1">
                <label htmlFor="" className="text-xs text-indigo-600">
                  City
                </label>
                <input
                  type="text"
                  placeholder={user.city || "New York"}
                  className="ring-1 ring-gray-400 p-[13px] rounded-md text-sm"
                  name="city"
                />
              </div>

              {/* INPUT */}
              <div className="flex-1 min-w-[45%] flex flex-col gap-1">
                <label htmlFor="" className="text-xs text-indigo-600">
                  School
                </label>
                <input
                  type="text"
                  placeholder={user.school || "York High School"}
                  className="ring-1 ring-gray-400 p-[13px] rounded-md text-sm"
                  name="school"
                />
              </div>

              {/* INPUT */}
              <div className="flex-1 min-w-[45%] flex flex-col gap-1">
                <label htmlFor="" className="text-xs text-indigo-600">
                  Work
                </label>
                <input
                  type="text"
                  placeholder={user.work || "Discovery Health"}
                  className="ring-1 ring-gray-400 p-[13px] rounded-md text-sm"
                  name="work"
                />
              </div>

              {/* INPUT */}
              <div className="flex-1 min-w-[45%] flex flex-col gap-1">
                <label htmlFor="" className="text-xs text-indigo-600">
                  Website
                </label>
                <input
                  type="text"
                  placeholder={user.website || "JohnEnterprise.com"}
                  className="ring-1 ring-gray-400 p-[13px] rounded-md text-sm"
                  name="website"
                />
              </div>
            </div>
              <UpdateButton />

            <div
              className="absolute text-xl right-3 top-3 cursor-pointer text-white"
              onClick={handleClose}
            >
              X
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
