import DislikeIcon from "@/app/icons/(dashboard)/DislikeIcon";
import LikeIcon from "@/app/icons/(dashboard)/LikeIcon";
import LoveIcon from "@/app/icons/(dashboard)/LoveIcon";
import ThreeDot from "@/app/icons/(dashboard)/ThreeDot";
import { Button } from "@/components/core";
import Image from "next/image";
import React, { useState } from "react";

// Type definitions

interface Liker {
  id: number;
  avatar: string;
  name: string;
}
interface DiveActivity {
  id: number;
  name: string;
  avatar: string;
  isOnline: boolean;
  location: string;
  time: string;
  maxDepth: string;
  timeIn: string;
  timeOut: string;
  bottomTime: string;
  image: string;
  likes: number;
  hugs: number;
  likers: Liker[];

}

const diveActivities: DiveActivity[] = [
  {
    id: 1,
    name: "Anaya Jacobson",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    isOnline: true,
    location: "Maria la Gorda, Guanahacabibes, Cuba",
    time: "Today",
    maxDepth: "5.3 ft",
    timeIn: "4:22 PM",
    timeOut: "5:55 PM",
    bottomTime: "1h 33m",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
    likes: 22,
    hugs: 26,
    likers: [
      {
        id: 2,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        name: "Timothy Blackwell",
      },
      {
        id: 3,
        avatar:
          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=40&h=40&fit=crop&crop=face",
        name: "Lena Hoffman",
      },
      {
        id: 4,
        avatar:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face",
        name: "Marcos Bennett",
      },
      {
        id: 4,
        avatar:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face",
        name: "Marcos Bennett",
      },
      {
        id: 4,
        avatar:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face",
        name: "Marcos Bennett",
      },
    ],
  },
  {
    id: 1,
    name: "Anaya Jacobson",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    isOnline: true,
    location: "Maria la Gorda, Guanahacabibes, Cuba",
    time: "Today",
    maxDepth: "5.3 ft",
    timeIn: "4:22 PM",
    timeOut: "5:55 PM",
    bottomTime: "1h 33m",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
    likes: 22,
    hugs: 26,
    likers: [
      {
        id: 2,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        name: "Timothy Blackwell",
      },
      {
        id: 3,
        avatar:
          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=40&h=40&fit=crop&crop=face",
        name: "Lena Hoffman",
      },
      {
        id: 4,
        avatar:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face",
        name: "Marcos Bennett",
      },
      {
        id: 4,
        avatar:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face",
        name: "Marcos Bennett",
      },
      {
        id: 4,
        avatar:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face",
        name: "Marcos Bennett",
      },
    ],
  },
  // Add other activities here...
];


const DiveActivityCard = () => {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [huggedPosts, setHuggedPosts] = useState<Set<number>>(new Set());
  const [thumbsUpPosts, setThumbsUpPosts] = useState<Set<number>>(new Set());





   const toggleReaction = (activityId: number, setter: React.Dispatch<React.SetStateAction<Set<number>>>) => {
    setter((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(activityId)) {
        newSet.delete(activityId);
      } else {
        newSet.add(activityId);
      }
      return newSet;
    });
  };



  return (
  <div className="w-full mt-[10px] bg-white dark:bg-gray-900 transition-colors duration-200">
  {diveActivities?.map((activity) => (
    <div key={activity.id} className="bg-white dark:bg-gray-800 w-full mb-6 rounded-2xl shadow-sm dark:shadow-gray-700/20 transition-colors duration-200">
      {/* User Profile Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-start gap-3 w-full">
          <div className="relative xl:size-[3.4375rem] shrink-0 size-8 rounded-full overflow-hidden bg-[#F7931D] flex items-center justify-center ">
            {activity?.avatar ? (
              <Image
                alt="img"
                src={activity?.avatar}
                className="object-cover"
                fill
              />
            ) : (
              <span className="text-white text-xl font-semibold font-archivo">
                {activity?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .slice(0, 1)
                  .join("")
                  .toUpperCase()}
              </span>
            )}
          </div>

          <div className="w-full  flex-1">
            <div className="w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm transition-colors duration-200">
                    {activity.name}
                  </h3>
                  {activity.isOnline && (
                    <div className="bg-[#ECFDF3] dark:bg-green-900/30 rounded-2xl gap-x-[.4375rem] px-4 flex items-center  py-[.2188rem] transition-colors duration-200">
                      <div className="size-[6px] rounded-full bg-[#12B76A]" />
                      <p className="text-sm font-medium font-archivo text-[#027A48] dark:text-green-400">
                        Online
                      </p>
                    </div>
                  )}
                </div>
                <Button className="p-0 bg-transparent dark:text-gray-300 hover:dark:text-gray-100 transition-colors duration-200">
                  <ThreeDot/>
                </Button>
              </div>

              {/* Location and Time */}
              <div className="flex items-center gap-1 mt-1">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 9.18347C17.7426 9.18347 18.75 8.17611 18.75 6.93347C18.75 5.69083 17.7426 4.68347 16.5 4.68347C15.2574 4.68347 14.25 5.69083 14.25 6.93347C14.25 8.17611 15.2574 9.18347 16.5 9.18347Z"
                    stroke="#78828A"
                    className="dark:stroke-gray-400 transition-colors duration-200"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.75 18.3344C10.5 12.7385 13.5 23.6285 20.25 18.0326"
                    stroke="#78828A"
                    className="dark:stroke-gray-400 transition-colors duration-200"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.75 14.5844C10.5 8.98849 13.5 19.8785 20.25 14.2826"
                    stroke="#78828A"
                    className="dark:stroke-gray-400 transition-colors duration-200"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.7731 15.7066L12.3862 10.3197C10.6985 8.63187 8.40941 7.68358 6.0225 7.68347H3.75"
                    stroke="#78828A"
                    className="dark:stroke-gray-400 transition-colors duration-200"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.49609 12.9372L11.1477 9.28564"
                    stroke="#78828A"
                    className="dark:stroke-gray-400 transition-colors duration-200"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="text-gray-500 dark:text-gray-400 text-xs transition-colors duration-200">{activity.time}</span>
                <span className="text-gray-400 dark:text-gray-500 transition-colors duration-200">•</span>
                <span className="text-gray-500 dark:text-gray-400 text-xs transition-colors duration-200">
                  {activity.location}
                </span>
              </div>
            </div>
            
            {/* Dive Stats Bar */}
            <div className="mt-4">
              <div className="text-black dark:text-gray-100 rounded-lg py-2 relative transition-colors duration-200">
                {/* Stats Row */}
                <div className="flex  flex-wrap lg:gap-[3.125rem] gap-4 items-start sm:items-center mt-2 text-xs">
                  
                  <div className="flex flex-col gap-y-2">
                    <div className="opacity-80 dark:opacity-70">Max Depth</div>
                    <div className="font-semibold text-lg">{activity.maxDepth}</div>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <div className="opacity-80 dark:opacity-70">Time in</div>
                    <div className="font-semibold text-lg">{activity.timeIn}</div>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <div className="opacity-80 dark:opacity-70">Time out</div>
                    <div className="font-semibold text-lg">{activity.timeOut}</div>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <div className="opacity-80 dark:opacity-70">Bottom Time</div>
                    <div className="font-semibold text-lg">{activity.bottomTime}</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dive Image */}
      <div className="relative w-full h-[426px]">
        <Image
          src={activity.image}
          alt={`Dive at ${activity.location}`}
          className="object-cover rounded-2xl"
          fill
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center flex-wrap gap-4 justify-between p-4 pt-0 mt-7">
        <div className="flex items-center gap-1">
          {/* Profile pictures of likers */}
          <div className="flex -space-x-2">
            {activity.likers.slice(0, 3).map((liker) => (
              <div
                key={liker.id}
                className="size-8 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 transition-colors duration-200"
                title={liker.name}
              >
                <Image
                  src={liker.avatar}
                  alt={liker.name}
                  width={32}
                  height={32}
                  className="size-full object-cover"
                />
              </div>
            ))}
            {activity.likers.length > 3 && (
              <div className="size-8 rounded-full bg-gray-100 dark:bg-gray-600 border-2 border-white dark:border-gray-700 flex items-center justify-center transition-colors duration-200">
                <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                  +{activity.likers.length - 3}
                </span>
              </div>
            )}
          </div>
          <span className="text-gray-500 dark:text-gray-400 text-sm ml-2 transition-colors duration-200">
            {activity.likers.length > 0 && "Like this dive"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Heart/Like */}
          <Button
            onClick={() => toggleReaction(activity.id, setLikedPosts)}
            className={`transition-all duration-200 bg-[#F9FAFB] dark:bg-gray-700 px-[18px] py-[.6563rem] w-[3.75rem] h-[2.8125rem] rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/30 ${
              likedPosts.has(activity.id)
                ? "text-red-500"
                : "text-gray-400 dark:text-gray-500 hover:text-red-500"
            }`}
            aria-label="Like this dive"
          >
            <LoveIcon width={20}/>
          </Button>

          {/* Thumbs up */}
          <Button
            onClick={() => toggleReaction(activity.id, setThumbsUpPosts)}
            className={`transition-all duration-200 bg-[#F9FAFB] dark:bg-gray-700 px-[18px] py-[.6563rem] w-[3.75rem] h-[2.8125rem] rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/30 ${
              thumbsUpPosts.has(activity.id)
                ? "text-blue-500"
                : "text-gray-400 dark:text-gray-500 hover:text-blue-500"
            }`}
            aria-label="Give thumbs up"
          >
           <LikeIcon width={20}/>
          </Button>

          {/* Hug/Award */}
          <Button
            onClick={() => toggleReaction(activity.id, setHuggedPosts)}
            className={`transition-all duration-200 bg-[#F9FAFB] dark:bg-gray-700 px-[18px] py-[.6563rem] w-[3.75rem] h-[2.8125rem] rounded-2xl hover:bg-yellow-50 dark:hover:bg-yellow-900/30 ${
              huggedPosts.has(activity.id)
                ? "text-yellow-500"
                : "text-gray-400 dark:text-gray-500 hover:text-yellow-500"
            }`}
            aria-label="Send hug"
          >
           <DislikeIcon width={20}/>
          </Button>
        </div>
      </div>
    </div>
  ))}
</div>
  );
};

export default DiveActivityCard;
