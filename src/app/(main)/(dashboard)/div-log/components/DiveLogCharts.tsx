import { User } from '@/app/(auth)/api/getAuthenticatedUser';
import { Language } from '@/app/(auth)/sign-up/translations';
import { divLogChat } from '@/app/(main)/translation/diveLogTranslation';
import ThreeDot from '@/app/icons/(dashboard)/ThreeDot';
import { useLanguage } from '@/hooks/useLanguage';
import React from 'react';
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  ReferenceLine,
  Dot
} from 'recharts';
import { singleDiveProp } from '../../api/div-logs/fetchSingleDivLog';

interface prop{
   user: User | null
   data: singleDiveProp | undefined
}
const DiveLogCharts = ({data}:prop) => {
const {language}= useLanguage()
      const t = divLogChat[language] || divLogChat?.en;
  // Heart rate data - matching the original pattern more closely
  const heartRateData = [
    { time: '0:00', hr: 45 },
    { time: '2:00', hr: 52 },
    { time: '4:00', hr: 68 },
    { time: '6:00', hr: 85 },
    { time: '6:57', hr: 92 },
    { time: '9:00', hr: 88 },
    { time: '11:00', hr: 75 },
    { time: '13:54', hr: 65 },
    { time: '16:00', hr: 78 },
    { time: '18:00', hr: 95 },
    { time: '20:52', hr: 105 },
    { time: '23:00', hr: 102 },
    { time: '25:00', hr: 110 },
    { time: '27:48', hr: 118 },
    { time: '30:00', hr: 108 },
    { time: '32:00', hr: 95 },
    { time: '34:48', hr: 88 }
  ];

  // Water temperature data
  const waterTempData = [
    { time: '4:10', temp: 28.0 },
    { time: '6:00', temp: 28.0 },
    { time: '8:20', temp: 28.1 },
    { time: '10:00', temp: 28.2 },
    { time: '12:30', temp: 28.3 },
    { time: '14:00', temp: 28.5 },
    { time: '16:40', temp: 28.7 },
    { time: '18:00', temp: 28.8 },
    { time: '19:00', temp: 29.0 },
    { time: '20:00', temp: 28.9 },
    { time: '21:10', temp: 28.7 },
    { time: '22:00', temp: 28.5 },
    { time: '23:00', temp: 28.3 }
  ];

  // Depth profile data - more detailed to match the swimming pattern
  const depthData = [
    { time: '0m00s', depth: 0.0 },
    { time: '2m00s', depth: -0.5 },
    { time: '4m00s', depth: -3.2 },
    { time: '6m00s', depth: -3.8 },
    { time: '8m00s', depth: -4.2 },
    { time: '10m00s', depth: -4.8 },
    { time: '12m00s', depth: -5.5 },
    { time: '14m00s', depth: -5.8 },
    { time: '16m00s', depth: -6.2 },
    { time: '18m00s', depth: -6.8 },
    { time: '20m00s', depth: -7.2 },
    { time: '22m00s', depth: -7.8 },
    { time: '24m00s', depth: -8.5 },
    { time: '26m00s', depth: -9.0 },
    { time: '28m00s', depth: -8.8 },
    { time: '30m00s', depth: -8.2 },
    { time: '32m00s', depth: -7.5 },
    { time: '34m00s', depth: -6.8 },
    { time: '36m00s', depth: -6.2 },
    { time: '38m00s', depth: -5.5 },
    { time: '40m00s', depth: -4.8 },
    { time: '42m00s', depth: -4.5 },
    { time: '44m00s', depth: -4.2 },
    { time: '46m00s', depth: -4.0 },
    { time: '48m00s', depth: -3.8 },
    { time: '50m00s', depth: -3.5 },
    { time: '52m00s', depth: -3.2 },
    { time: '54m00s', depth: -3.0 },
    { time: '56m00s', depth: -2.8 },
    { time: '58m00s', depth: -2.5 },
    { time: '1h00m00s', depth: -2.2 },
    { time: '1h02m00s', depth: -1.8 },
    { time: '1h04m00s', depth: -1.5 },
    { time: '1h06m00s', depth: -1.2 },
    { time: '1h08m00s', depth: -0.8 },
    { time: '1h10m00s', depth: -0.5 }
  ];

  const CustomDot = (props:any) => {
    const { cx, cy } = props;
    return <Dot cx={cx} cy={cy} r={2} fill="#FFD700" />;
  };

  return (
    <div className="p-4 space-y-5">
      {/* Heart Rate Section */}
    <div className=" border border-[#EAECF0] rounded-lg mt-[1.875rem] w-full  p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-archivo font-semibold text-[#101828] dark:text-white">{t?.heartRate?.title}</h2>
          <div className="text-gray-400 dark:text-white text-sm"><ThreeDot/></div>
        </div>
        
        <div className="flex gap-8 mb-4">
          <div>
            <div className="text-sm text-gray-500 dark:text-white mb-1">{t?.heartRate?.avg}</div>
            <div className="text-xl font-archivo font-bold text-[#101828] dark:text-white">76 bpm</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-white mb-1">{t?.heartRate?.max}</div>
            <div className="text-xl font-archivo font-bold text-[#101828] dark:text-white">100 bpm</div>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={heartRateData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="heartRateGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF8C00" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#FF8C00" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                tickMargin={8}
              />
              <YAxis 
                domain={[0, 132]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                tickMargin={8}
                ticks={[0, 47, 68, 106, 132]}
              />
              <Area
                type="monotone"
                dataKey="hr"
                stroke="#FF8C00"
                fill="url(#heartRateGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Water Temperature Section */}
      <div className=" border border-[#EAECF0] rounded-lg mt-[1.875rem] w-full  p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-archivo font-semibold text-[#101828] dark:text-white">{t?.waterTemp?.title}</h2>
          <div className="text-gray-400 dark:text-white text-sm"><ThreeDot/></div>
        </div>
        
        <div className="flex gap-5 md:gap-28 mb-4">
          <div>
            <div className="text-sm text-gray-500 dark:text-white mb-1">{t?.waterTemp?.avg}</div>
            <div className="text-xl font-archivo font-bold text-[#101828] dark:text-white">{data?.data?.avg_water_temperature??0} <span className="text-lg">°C</span></div>
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-white mb-1">{t?.waterTemp?.min}</div>
            <div className="text-xl font-archivo font-bold text-[#101828] dark:text-white">{data?.data?.min_water_temperature??0} <span className="text-lg">°C</span></div>
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-white mb-1">{t?.waterTemp?.max}.</div>
            <div className="text-xl font-archivo font-bold text-[#101828] dark:text-white">{data?.data?.max_water_temperature??0} <span className="text-lg">°C</span></div>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={waterTempData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFD700" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#FFD700" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                tickMargin={8}
              />
              <YAxis 
                domain={[0, 80]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                tickMargin={8}
                ticks={[0, 10, 30, 60, 80]}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#FFD700"
                strokeWidth={2}
                dot={CustomDot}
              />
              <Area
                type="monotone"
                dataKey="temp"
                stroke="#FFD700"
                fill="url(#tempGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex items-center mt-5">
          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
          <span className="text-xs text-gray-500 dark:text-white">{t?.depthProfile?.title}</span>
        </div>
      </div>

      {/* Depth Profile Section */}
      <div className=" border border-[#EAECF0] rounded-lg mt-[1.875rem] w-full  p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-archivo font-semibold text-[#101828] dark:text-white">{t?.depthProfile?.yAxis}</h2>
          <div className="text-gray-400 dark:text-white text-sm"><ThreeDot/></div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={depthData} margin={{ top: 10, right: 10, left: 40, bottom: 60 }}>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#9CA3AF' }}
                angle={-45}
                textAnchor="end"
                height={60}
                interval="preserveStartEnd"
              />
              <YAxis 
                domain={[-9.5, 0.5]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                tickMargin={8}
                label={{ 
                  value: 'Depth', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fontSize: '12px', fill: '#9CA3AF' }
                }}
              />
              <CartesianGrid strokeDasharray="1 1" stroke="#F3F4F6" />
              <ReferenceLine y={0} stroke="#D1D5DB" strokeWidth={1} />
              <Line
                type="monotone"
                dataKey="depth"
                stroke="#EF4444"
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="text-center mt-2">
          <div className="text-sm text-gray-500 dark:text-white">{t?.depthProfile?.xAxis}</div>
        </div>
      </div>
    </div>
  );
};

export default DiveLogCharts;
