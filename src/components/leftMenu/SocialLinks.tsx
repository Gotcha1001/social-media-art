"use client";
import Link from "next/link";
import MotionWrapper from "../MotionWrapper";
import Image from "next/image";
import MotionWrapperDelay from "../MotionWrapperDelay";

export default function SocialLinks() {
  return (
    <MotionWrapperDelay
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      variants={{
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <div className="p-4 bg-white rounded-lg shadow-md text-sm text-gray-500 flex flex-col gap-2">
        {/* First LINK */}
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-indigo-600 hover:text-white"
        >
          <MotionWrapper>
            <Image src="/posts.png" alt="posts" width={20} height={20} />
          </MotionWrapper>
          <span>My Posts</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-indigo-600 hover:text-white"
        >
          <MotionWrapper>
            <Image src="/activity.png" alt="posts" width={20} height={20} />
          </MotionWrapper>
          <span>Activity</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-indigo-600 hover:text-white"
        >
          <MotionWrapper>
            <Image src="/market.png" alt="posts" width={20} height={20} />
          </MotionWrapper>
          <span>Market Place</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-indigo-600 hover:text-white"
        >
          <MotionWrapper>
            <Image src="/events.png" alt="posts" width={20} height={20} />
          </MotionWrapper>
          <span>Events</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-indigo-600 hover:text-white"
        >
          <MotionWrapper>
            <Image src="/albums.png" alt="posts" width={20} height={20} />
          </MotionWrapper>
          <span>Albums</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-indigo-600 hover:text-white"
        >
          <MotionWrapper>
            <Image src="/videos.png" alt="posts" width={20} height={20} />
          </MotionWrapper>
          <span>Videos</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-indigo-600 hover:text-white"
        >
          <MotionWrapper>
            <Image src="/news.png" alt="posts" width={20} height={20} />
          </MotionWrapper>
          <span>News</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-indigo-600 hover:text-white"
        >
          <MotionWrapper>
            <Image src="/courses.png" alt="posts" width={20} height={20} />
          </MotionWrapper>
          <span>Courses</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-indigo-600 hover:text-white"
        >
          <MotionWrapper>
            <Image src="/lists.png" alt="posts" width={20} height={20} />
          </MotionWrapper>
          <span>Lists</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-indigo-600 hover:text-white"
        >
          <MotionWrapper>
            <Image src="/settings.png" alt="posts" width={20} height={20} />
          </MotionWrapper>
          <span>Settings</span>
        </Link>
      </div>
    </MotionWrapperDelay>
  );
}
