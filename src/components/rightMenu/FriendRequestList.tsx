"use client";

import Image from "next/image";
import MotionWrapper from "../MotionWrapper";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { FollowRequest, User } from "@prisma/client";
import { useOptimistic, useState } from "react";
import { acceptFollowRequest, declineFollowRequest } from "@/lib/actions";
import MotionWrapperDelay from "../MotionWrapperDelay";

type RequestWithUser = FollowRequest & {
  sender: User;
};

const FriendRequestList = ({ requests }: { requests: RequestWithUser[] }) => {
  const [requestState, setRequestState] = useState(requests);

  const accept = async (requestId: string, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await acceptFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {}
  };

  const decline = async (requestId: string, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await declineFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {}
  };

  const [optimisticRequest, removeOptimisticRequest] = useOptimistic(
    requestState,
    (state, value: string) => state.filter((req) => req.id !== value)
  );

  return (
    <div className="">
      {optimisticRequest.map((request) => (
        <MotionWrapperDelay
          key={request.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MotionWrapper>
                <Image
                  src={request.sender.avatar || "noAvatar.png"}
                  alt="user"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </MotionWrapper>

              <span className="font-semibold">
                {request.sender.name && request.sender.surname
                  ? request.sender.name + " " + request.sender.surname
                  : request.sender.username}
              </span>
            </div>
            <div className="flex gap-3 justify-end">
              <form action={() => accept(request.id, request.sender.id)}>
                <button>
                  <MotionWrapper>
                    <ThumbsUp
                      size={20}
                      className="text-purple-500 cursor-pointer"
                    />
                  </MotionWrapper>
                </button>
              </form>
              <form action={() => decline(request.id, request.sender.id)}>
                <button>
                  <MotionWrapper>
                    <ThumbsDown
                      size={20}
                      className="text-gray-500 cursor-pointer"
                    />
                  </MotionWrapper>
                </button>
              </form>
            </div>
          </div>
        </MotionWrapperDelay>
      ))}
    </div>
  );
};

export default FriendRequestList;
