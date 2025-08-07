import React, { useState } from "react";

interface Props {
  next: () => void;
  back: () => void;
}

const divePlans = [
  {
    id: "1",
    title: "Discover Scuba Dive experience",
    subtitle: "Wanna try diving? This is for you!",
    description:
      "Always wanted to try out diving? Come and join us on a Discover Scuba diving adventure.",
    fullDescription:
      "This program is designed especially for people who want to try diving for the first time. In about three hours we will take you through a step-by-step program.",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    title: "Advanced Open Water",
    subtitle: "Take your skills to the next level",
    description:
      "Perfect for certified divers looking to advance their skills.",
    fullDescription:
      "This course builds on your Open Water certification and introduces you to new diving activities and environments.",
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    title: "Night Diving Experience",
    subtitle: "Explore the underwater world after dark",
    description: "Discover the magic of underwater life at night.",
    fullDescription:
      "Experience the thrill of diving at night and discover how different the underwater world becomes after sunset.",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "4",
    title: "Wreck Diving Adventure",
    subtitle: "Explore sunken treasures",
    description: "Dive into history with our wreck diving experience.",
    fullDescription:
      "Explore historic shipwrecks and discover the fascinating marine life that has made these underwater structures their home.",
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
];

const SchoolBookingInfo = ({ back, next }: Props) => {
  const [selectedPlan, setSelectedPlan] = useState<string>("1");

  const selected = divePlans.find((plan) => plan?.id === selectedPlan);

  return (
    <div className="bg-transparent h-full   p-6 rounded-lg shadow">
      {/* Image selection row */}
      <div className="overflow-y-auto max-h-[calc(88vh-160px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[10px] mb-6">
          {divePlans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`cursor-pointer rounded-lg overflow-hidden border transition-all duration-200 relative ${
                selectedPlan === plan.id
                  ? "border-orange-500 shadow-lg shadow-orange-500/30"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <div className="relative w-full h-40">
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="w-full h-full object-cover"
                />
                {/* Selection overlay */}
                {selectedPlan === plan.id && (
                  <div className="absolute inset-0 bg-orange-500 bg-opacity-20 flex items-center justify-center">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      ✓
                    </div>
                  </div>
                )}
              </div>

              {/* Plan title below image */}
            </div>
          ))}
        </div>

        {/* Dive Plan Details */}
        {selected && (
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="grid w-full grid-cols-2">
              <h3 className="text-base font-medium ">{selected.title}</h3>
              <div className="text-base">
                {selected.subtitle}
                <p>{selected.description}</p>

                <p>
                  {selected.fullDescription}{" "}
                  <span className="text-orange-500 font-semibold cursor-pointer hover:text-orange-600">
                    Read More.
                  </span>
                </p>
              </div>
            </div>

            <hr className="border-gray-300 dark:border-gray-700" />

            <div className="flex gap-4 flex-col text-base">
              <div className="grid grid-cols-2">
                <strong className="text-gray-900 dark:text-white block mb-1">
                  What's included?
                </strong>
                <ul className="list-disc pl-5">
                  <li>All the dive gear + tank</li>
                </ul>
              </div>
              <hr className="border-gray-300 dark:border-gray-700" />

              <div className="grid grid-cols-2">
                <strong className="text-gray-900 dark:text-white block mb-1">
                  What do I need to bring?
                </strong>
                <ul className="list-disc pl-5">
                  <li>Towel</li>
                  <li>Swimwear</li>
                  <li>Good mood</li>
                </ul>
              </div>
            </div>

            <hr className="border-gray-300 dark:border-gray-700" />

            <div className="grid grid-cols-2 text-base font-archivo">
              <strong className="text-gray-900 dark:text-white block mb-1">
                Please Note:
              </strong>
              <p>
                For safety reasons, please make sure you take a look at this{" "}
                <a
                  href="#"
                  className="text-orange-500 font-semibold underline hover:text-orange-600 transition-colors"
                >
                  Medical Statement
                </a>{" "}
                to ensure that you are fit to dive. If you answer "yes" to any
                of the questions, you will have to bring a signed medical
                statement from a doctor prior to in-water training.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4   border-gray-200 dark:border-gray-700 px-6 pt-4 bg-white dark:bg-gray-900">
        <button
          onClick={back}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={()=>next()}
          className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default SchoolBookingInfo;
