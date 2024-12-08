import { ThumbsDown, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MotionWrapper from "../MotionWrapper";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import FriendRequestList from "./FriendRequestList";


const FriendRequests = async () => {

  const {userId} = await auth()

  if (!userId) return null;

  const requests = await prisma.followRequest.findMany({
    where: {
      receiverId: userId,
      senderId: {
        not: userId, // Exclude requests sent by the logged-in user
      },
    },
    include: {
      sender: true,
    },
  });

  if (requests.length === 0 ) return null;


  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500 rounded-lg text-sm">
          Friend Requests
        </span>
        <Link href="/" className="text-indigo-600 text-xs">
          See All
        </Link>
      </div>
      {/* USER*/}
      <FriendRequestList requests={requests} />
      
    </div>
  );
};

export default FriendRequests;
