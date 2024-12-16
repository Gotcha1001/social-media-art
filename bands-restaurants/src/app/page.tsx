import FeatureMotionWrapper from "@/components/FeatureMotionWrapper";
import MotionWrapperDelay from "@/components/MotionWrapperDelay";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpenIcon,
  ChevronRightIcon,
  Music,
  Music3,
  MusicIcon,
  SparklesIcon,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Home Reflections",
};

const features = [
  {
    icon: BookOpenIcon,
    title: "Band Name",
    description:
      "Discover the latest hits and performances from your favorite band.",
  },
  {
    icon: SparklesIcon,
    title: "Featured Performances",
    description:
      "Enjoy exclusive live performances from bands around the world.",
  },
  {
    icon: Music,
    title: "Private Sessions",
    description:
      "Access special private sessions and behind-the-scenes content from the bands.",
  },
];

export default function Home() {
  return (
    <div className="realtive container mx-auto px-4 pt-16 pb-16">
      {/* Header Section */}
      <MotionWrapperDelay
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-wide mb-6 gradient-title">
            Your Space to Find Gigs. <br /> Your Journey Begins Here...
          </h1>
          <p className="text-lg md:text-xl text-indigo-800 mb-8">
            Upload your Profile, your past gig images, videos, and create a
            masterpiece Profile for Gig Providers to scout you out
          </p>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-800 via-transparent to-transparent pointer-events-none z-10" />
            <div className="bg-white rounded-2xl p-4 max-full mx-auto">
              <div className=" pb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MusicIcon className="h-5 w-5 text-indigo-600" />
                  <span className="text-indigo-900 font-medium">
                    Today&rsquo;s Entry
                  </span>
                </div>
                {/* 3 other icons */}
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-indigo-300" />
                  <div className="h-3 w-3 rounded-full bg-indigo-400" />
                  <div className="h-3 w-3 rounded-full bg-indigo-500" />
                </div>
              </div>
              {/* Daily Prompts */}
              <div className="space-y-4 p-4">
                <h3 className="text-xl font-semibold text-indigo-900">
                  DAILY INSPIRATIONAL SECRETS
                </h3>
                <Skeleton className="h-4 bg-indigo-200 rounded w-3/4" />
                <Skeleton className="h-4 bg-indigo-200 rounded w-full" />
                <Skeleton className="h-4 bg-indigo-200 rounded w-2/4" />
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Link href="/profile">
              <Button
                variant="band"
                className="px-8 py-6 rounded-full items-center gap-2"
              >
                Start Creating Your Place{" "}
                <ChevronRightIcon className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="#features">
              <Button
                variant="band"
                className="px-8 py-6 rounded-full border-indigo-600 text-indigo-200 hover:bg-indigo-800"
              >
                Learn More <ChevronRightIcon className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </MotionWrapperDelay>
      {/* Card of the feature bands */}
      <section
        id="features"
        className="mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <FeatureMotionWrapper key={feature.title} index={index}>
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-indigo-200 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-xl text-indigo-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-indigo-700">{feature.description}</p>
              </CardContent>
            </Card>
          </FeatureMotionWrapper>
        ))}
      </section>

      {/* Rich gig viewer and createive section  */}
      <div className="space-y-24 mt-24">
        <div className="grid md:grid-cols-2 gap-12">
          <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className="space-y-6">
              <div className="h-12 w-12 bg-indigo-200 rounded-full flex items-center justify-center">
                <MusicIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-indigo-700">
                Rich Band Profile Editor
              </h3>
              <p className="text-lg text-indigo-700">
                Express yourself fully with our amazing Profile Creator:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-indigo-400" />
                  <span className="">
                    Upload images, videos to share your bands creative art and
                    expression
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-indigo-400" />
                  <span className="">Embeded Links</span>
                </li>
              </ul>
            </div>
          </MotionWrapperDelay>
          {/* right side */}

          <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className="space-y-4 bg-white rounded-2xl shadow-xl p-4 border border-indigo-100">
              <div className="flex gap-2 mb-6">
                <div className="h-8 w-8 rounded-full bg-indigo-300" />
                <div className="h-8 w-8 rounded-full bg-indigo-400" />
                <div className="h-8 w-8 rounded-full bg-indigo-500" />
              </div>
              <div className="h-4 bg-indigo-200 rounded w-3/4" />
              <div className="h-4 bg-indigo-300 rounded w-full" />
              <div className="h-4 bg-indigo-400 rounded w-2/3" />
              <div className="h-4 bg-indigo-500 rounded w-1/4" />
            </div>
          </MotionWrapperDelay>
        </div>

        {/* second section for the features */}

        <div className="grid md:grid-cols-2 gap-12">
          {/* left side */}
          <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className="space-y-4 bg-white rounded-2xl shadow-xl p-4 border border-indigo-100">
              <div className="h-40 bg-gradient-to-t from-indigo-200 to-indigo-50 rounded-lg"></div>
              <div className="flex justify-between">
                <div className="h-4 w-16 bg-indigo-200 rounded" />
                <div className="h-4 w-16 bg-indigo-200 rounded" />
                <div className="h-4 w-16 bg-indigo-200 rounded" />
              </div>
            </div>
          </MotionWrapperDelay>
          {/* right side */}
          <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className="space-y-6">
              <div className="h-12 w-12 bg-indigo-200 rounded-full flex items-center justify-center">
                <Music3 className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-indigo-700">
                Music Creativity
              </h3>
              <p className="text-lg text-indigo-700">
                Share your creative emotions through your musical compositions
                and profile images:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-indigo-400" />
                  <span className="">
                    Visualize your creative juices and musical compositions
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-indigo-400" />
                  <span className="">
                    Each note is a creation of the universe within
                  </span>
                </li>
              </ul>
            </div>
          </MotionWrapperDelay>
        </div>
      </div>
    </div>
  );
}
