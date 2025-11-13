import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { singleDiveProp } from '../../api/div-logs/fetchSingleDivLog';
import moment from 'moment';
import TrapeziumShape from '@/app/icons/(dashboard)/TrapeziumShape';

interface prop{
  data: singleDiveProp | undefined
}

const DiveTimeChart:React.FC<prop> = ({data}) => {
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
    <div className="w-full md:p-4 bg-white dark:bg-gray-800 border border-[#EAECF0] dark:border-gray-700 rounded-lg mt-5">
      <div className="relative h-96">
        {/* Top surface time */}
        <div className="absolute top-4 left-10 text-center">
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">{data?.data?.surface_interval??0}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 underline">Surface Time</div>
        </div>

        {/* Time in - positioned on the left edge of surface line */}
        <div className="absolute top-20 left-10 text-center">
          <div className="text-base font-semibold text-gray-700 dark:text-gray-200">{moment(data?.data?.dive_plan?.created_on??null)?.format("LT")}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Time in</div>
        </div>

        {/* Time out - positioned on the right edge of surface line */}
        <div className="absolute top-24 right-10 text-center">
          <div className="text-base font-semibold text-gray-700 dark:text-gray-200">{moment(data?.data?.dive_plan?.created_on??null)?.format("LT")}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Time out</div>
        </div>

        {/* Max depth - positioned at the left bottom where the slope starts */}
        <div className="absolute bottom-24 left-4 text-center">
          <div className="text-base font-semibold text-gray-700 dark:text-gray-200">{data?.data?.dive_plan?.dive_site?.max_depth??""}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Max Depth</div>
        </div>

        {/* Average depth - positioned in the center top area */}
        <div className="absolute top-28 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-base font-semibold text-orange-500 dark:text-orange-400">{data?.data?.dive_depth??0} m</div>
          <div className="text-sm text-orange-500 dark:text-orange-400">Average Depth</div>
        </div>

        {/* Dive time - positioned in the center of the flat bottom section */}
        <div className="absolute top-48 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-xl font-bold text-gray-700 dark:text-gray-200">{data?.data?.bottom_time??0}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Dive Time</div>
        </div>

        {/* Orange surface line */}
        <div className="absolute top-40  left-4 md:left-20 right-4 md:right-20 h-[2px] bg-orange-400 dark:bg-orange-500"></div>

        {/* Main chart area */}
        <div className="absolute top-16  left-4 md:left-20 right-4 md:right-20 bottom-16">
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
        <div className="absolute top-16 left-4 md:left-20 right-4 md:right-20 bottom-16">
         {/* <TrapeziumShape/> */}
        </div>
      </div>
    </div>
  );
};

export default DiveTimeChart;