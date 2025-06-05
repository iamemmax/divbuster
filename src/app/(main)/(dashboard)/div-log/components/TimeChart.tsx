import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const DiveTimeChart = () => {
  // Create trapezoid-shaped dive profile data to match the original
  const diveData = [
    { time: 0, depth: 0, timeLabel: "10:00" },
    { time: 5, depth: 0, timeLabel: "10:05" },
    { time: 8, depth: 16, timeLabel: "10:08" },
    { time: 35, depth: 16, timeLabel: "10:35" },
    { time: 42, depth: 0, timeLabel: "10:42" },
    { time: 45, depth: 0, timeLabel: "10:45" }
  ];

  return (
    <div className="w-full  p-4 bg-white border border-[#EAECF0] rounded-lg mt-5">
      <div className="relative h-96 ">
        {/* Top surface time */}
        <div className="absolute top-4 left-10 text-center">
          <div className="text-lg font-semibold text-gray-700">21:36:11</div>
          <div className="text-sm text-gray-500 underline">Surface Time</div>
        </div>

        {/* Time in - positioned on the left edge of surface line */}
        <div className="absolute top-20 left-10 text-center">
          <div className="text-base font-semibold text-gray-700">10:00AM</div>
          <div className="text-sm text-gray-500">Time in</div>
        </div>

        {/* Time out - positioned on the right edge of surface line */}
        <div className="absolute top-24 right-10 text-center">
          <div className="text-base font-semibold text-gray-700">10:42 AM</div>
          <div className="text-sm text-gray-500">Time out</div>
        </div>

        {/* Max depth - positioned at the left bottom where the slope starts */}
        <div className="absolute bottom-24 left-4 text-center">
          <div className="text-base font-semibold text-gray-700">16 M</div>
          <div className="text-sm text-gray-500">Max Depth</div>
        </div>

        {/* Average depth - positioned in the center top area */}
        <div className="absolute top-28 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-base font-semibold text-orange-500">7 m</div>
          <div className="text-sm text-orange-500">Average Depth</div>
        </div>

        {/* Dive time - positioned in the center of the flat bottom section */}
        <div className="absolute top-48 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-xl font-bold text-gray-700">42:13</div>
          <div className="text-sm text-gray-500">Dive Time</div>
        </div>

        {/* Orange surface line */}
        <div className="absolute top-40 left-20 right-20 h-[2px] bg-orange-400"></div>

        {/* Main chart area */}
        <div className="absolute top-16 left-20 right-20 bottom-16">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={diveData} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
              <XAxis 
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <YAxis 
                reversed={true}
                domain={[0, 18]}
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <Line
                type="linear"
                dataKey="depth"
                stroke="#374151"
                strokeWidth={3}
                dot={false}
                fill="none"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Create the trapezoid shape manually using CSS */}
        <div className="absolute top-16 left-20 right-20 bottom-16">
          <svg width="100%" height="100%" viewBox="0 0 400 200" className="absolute inset-0">
            {/* Trapezoid path */}
            <path
              d="M 0 0 L 50 0 L 80 160 L 320 160 L 350 0 L 400 0"
              fill="none"
              stroke="#374151"
              strokeWidth="2"
            />
            {/* Fill the underwater area */}
            <path
              d="M 50 0 L 80 160 L 320 160 L 350 0 Z"
              fill="none"
              fillOpacity="0.3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DiveTimeChart;
