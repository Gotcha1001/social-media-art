import Image from "next/image";

import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import MotionWrapper from "../MotionWrapper";

const ProfileCard = async () => {
  // Await the `auth()` function
  const { userId } = await auth();

  // Handle the case where `userId` is undefined
  if (!userId) {
    console.warn("No userId found");
    return null; // Return nothing or a placeholder component
  }

  // Fetch the user data
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include:{
      _count:{
        select:{
          followers:true
        }
      }
    }
  });

  // Log the user data for debugging
  console.log(user);

  if (!user) return null

  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6'>
      <div className="h-20 relative">
        <Image src={user.cover || "/noCover.png"} 
        alt="background" fill  className="rounded-md object-cover"  />

        <Image src={user.avatar || "/noAvatar.png"} 
        alt="profile" width={48} height={48} className="rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10 object-cover"  />
      </div>
      <div className="h-20 flex flex-col gap-2 items-center">
        <span className="font-semibold">{(user.name && user.surname) ? user.name + " " + user.surname : user.username}</span>
        <div className="flex items-center gap-4">
            <div className="flex">
            <Image src="https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=600" alt="icon" width={12} height={12} className="rounded-full w-3 h-3"  />
            <Image src="https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=600" alt="icon" width={12} height={12} className="rounded-full w-3 h-3"  />
            <Image src="https://images.pexels.com/photos/825904/pexels-photo-825904.jpeg?auto=compress&cs=tinysrgb&w=600" alt="icon" width={12} height={12} className="rounded-full w-3 h-3"  />
            </div>
            <span className="text-sm text-gray-500">{user._count.followers}</span>
        </div>
        <MotionWrapper>
            <button className="bg-indigo-600 text-white text-xs rounded-md p-2">My Profile</button>
        </MotionWrapper>
        
      </div>
    </div>
  );
};

export default ProfileCard;