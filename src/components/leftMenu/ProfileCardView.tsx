"use client";

import Image from "next/image";
import MotionWrapper from "../MotionWrapper";
import Link from "next/link";
import MotionWrapperDelay from "../MotionWrapperDelay";

interface ProfileCardViewProps {
  cover?: string; // Optional string for the cover image URL
  avatar?: string; // Optional string for the avatar image URL
  name?: string; // Optional string for the user's first name
  surname?: string; // Optional string for the user's last name
  username: string; // Required string for the username
  followers: number; // Required number of followers
}

const ProfileCardView: React.FC<ProfileCardViewProps> = ({
  cover,
  avatar,
  name,
  surname,
  username,
  followers,
}) => {
  return (
    <MotionWrapperDelay
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 1 }}
      variants={{
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 },
      }}
    >
      <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
        <div className="h-20 relative">
          <Image
            src={cover || "/noCover.png"}
            alt="background"
            fill
            className="rounded-md object-cover"
          />
          <Image
            src={avatar || "/noAvatar.png"}
            alt="profile"
            width={48}
            height={48}
            className="rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10 object-cover"
          />
        </div>
        <div className="h-20 flex flex-col gap-2 items-center">
          <span className="font-semibold">
            {name && surname ? `${name} ${surname}` : username}
          </span>
          <div className="flex items-center gap-4">
            <div className="flex">
              <Image
                src="https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="icon"
                width={12}
                height={12}
                className="rounded-full w-3 h-3"
              />
              <Image
                src="https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="icon"
                width={12}
                height={12}
                className="rounded-full w-3 h-3"
              />
              <Image
                src="https://images.pexels.com/photos/825904/pexels-photo-825904.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="icon"
                width={12}
                height={12}
                className="rounded-full w-3 h-3"
              />
            </div>
            <span className="text-sm text-gray-500">{followers}</span>
          </div>
          <MotionWrapper>
            <Link href={`/profile/${username || ""}`}>
              <button className="bg-indigo-600 text-white text-xs rounded-md p-2">
                My Profile
              </button>
            </Link>
          </MotionWrapper>
        </div>
      </div>
    </MotionWrapperDelay>
  );
};

export default ProfileCardView;
