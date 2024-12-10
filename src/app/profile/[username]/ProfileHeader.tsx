"use client";
import Image from "next/image";
import AvatarWithMotion from "@/components/AvatarWithMotion"; // Import the client-side wrapper
import MotionWrapperDelay from "@/components/MotionWrapperDelay";

interface ProfileHeaderProps {
  cover?: string;
  avatar?: string;
  name?: string;
  surname?: string;
  username: string;
  postsCount: number;
  followersCount: number;
  followingsCount: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  cover = "/noCover.png",
  avatar = "/noAvatar.png",
  name,
  surname,
  username,
  postsCount,
  followersCount,
  followingsCount,
}) => {
  return (
    <MotionWrapperDelay
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
      }}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-center items-center relative">
          <div className="w-full h-64 relative mb-12">
            <Image
              src={cover}
              fill
              alt="Cover image"
              className="object-cover"
            />
            {/* Updated to use AvatarWithMotion */}
            <AvatarWithMotion
              src={avatar}
              alt="User avatar"
              width={128}
              height={128}
            />
          </div>
          <h1 className="mt-12 mb-4 text-2xl text-white font-medium">
            {name && surname ? `${name} ${surname}` : username}
          </h1>
          <div className="flex items-center justify-center gap-8 mb-4 text-indigo-500">
            <div className="flex flex-col items-center">
              <span className="font-medium">{postsCount}</span>
              <span className="text-sm">Posts</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-medium">{followersCount}</span>
              <span className="text-sm">Followers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-medium">{followingsCount}</span>
              <span className="text-sm">Following</span>
            </div>
          </div>
        </div>
      </div>
    </MotionWrapperDelay>
  );
};

export default ProfileHeader;
