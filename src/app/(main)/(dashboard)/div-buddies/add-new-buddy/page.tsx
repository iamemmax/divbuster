"use client"
import Header from '@/app/(main)/components/shared/Header'
import AngleLeft from '@/app/icons/(dashboard)/AngleLeft'
import { Button } from '@/components/core'
import { Camera, Star } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';



const AddNewBuddyPage = () => {
    const router = useRouter() 
    const [activeTab, setActiveTab] = useState('Profile Details');

  const diveData = {
    location: "Maria la Gorda, Guanahacabibes",
    date: "Feb 08, 2023",
    time: "6:40 PM",
    maxDepth: "200 Bar",
    avgDepth: "50 Bar",
    duration: "350 Bar",
    weight: "76.7kg"
  };

  const timelineData = [
    { time: "3:30 PM", depth: "1.5 Lm", temp: "150mm" },
    { time: "6:45 PM", depth: "", temp: "" }
  ];

  const equipmentData = [
    { category: "Kit Standart", items: ["Equipment Type", "BG Jacket"], weight: "12 Kg" },
    { category: "BCD Other", items: ["10 Bar/hr Final", "Flow", "Easure"], weight: "2 MMT/L/H" },
    { category: "BCD-Gear", items: ["Depth", "Time Curve: m", "12 bar", "8 mins"], weight: "1.5 Kg" },
    { category: "Ist", items: ["Standart", "Equipment Type"], weight: "" },
    { category: "Bist Gear/Power", items: ["", ""], weight: "10 Kg" }
  ];

  const chartData = [
    { time: '0:00', depth: 0 },
    { time: '0:15', depth: 5 },
    { time: '0:30', depth: 12 },
    { time: '0:45', depth: 18 },
    { time: '1:00', depth: 25 },
    { time: '1:15', depth: 30 },
    { time: '1:30', depth: 28 },
    { time: '1:45', depth: 32 },
    { time: '2:00', depth: 35 },
    { time: '2:15', depth: 33 },
    { time: '2:30', depth: 25 },
    { time: '2:45', depth: 18 },
    { time: '3:00', depth: 12 },
    { time: '3:15', depth: 8 },
    { time: '3:30', depth: 3 },
    { time: '3:45', depth: 0 }
  ];

  const reviews = [
    { name: "Simon Johnson", rating: 5, comment: "Great diving experience!" },
    { name: "Maria Santos", rating: 4, comment: "Beautiful underwater scenery" },
    { name: "John Smith", rating: 5, comment: "Perfect conditions" },
    { name: "Lisa Chen", rating: 4, comment: "Excellent visibility" }
  ]
 
  return (
    <>
    <div>
        <div className="">
            <Header 
        title={`Add New Buddy`}
        subtitle='' 
      />
        </div>
        <div className="relative">
          <div className="relative w-full h-[15rem] ">
  <Image
    alt="div-images"
    src="/images/onboarding/auth-layout-bg.svg"
    fill
    className="object-cover object-center"
  />
</div>
<div className="">
    <div className="absolute px-[1.875rem] py-[1.3125rem] top-0 left-0 w-full h-full bg-black/50 z-10">
    <Button className="w-12 h-12 rounded-full p-0 bg-white flex justify-center items-center" 
    onClick={()=>router.back()}
    >
        <AngleLeft/>
    </Button>
    </div>
</div>

           
        </div>

        
    </div>

          <div className="relative h-64 bg-gradient-to-r from-teal-400 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">Timothy Blackwell</h1>
              <p className="opacity-90">Master Diver • Advanced Open Water</p>
              <div className="flex items-center space-x-4 mt-2 text-sm">
                <span>📍 Havana, Cuba</span>
                <span>🏆 156 Dives</span>
                <span>⭐ 4.9 Rating</span>
              </div>
            </div>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Contact Instructor
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content - 8 columns */}
          <div className="col-span-12 lg:col-span-8">
            {/* Navigation Tabs */}
            <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm">
              {['Profile Details', 'Equipment', 'Reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Dive Location Card */}
            <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
              <div className="relative h-48 bg-gradient-to-r from-gray-800 to-gray-600">
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-xl font-bold">{diveData.location}</h2>
                  <p className="text-sm opacity-90">{diveData.date} • {diveData.time}</p>
                </div>
              </div>
            </div>

            {/* Dive Statistics - 3 column grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-800 text-white p-4 rounded-xl">
                <div className="text-2xl font-bold text-orange-400">{diveData.maxDepth}</div>
                <div className="text-sm opacity-80">Maximum</div>
                <div className="text-xs opacity-60 mt-1">Aluminum</div>
              </div>
              <div className="bg-gray-800 text-white p-4 rounded-xl">
                <div className="text-2xl font-bold text-orange-400">{diveData.avgDepth}</div>
                <div className="text-sm opacity-80">Average</div>
                <div className="text-xs opacity-60 mt-1">EAN32</div>
              </div>
              <div className="bg-orange-500 text-white p-4 rounded-xl">
                <div className="text-2xl font-bold">{diveData.duration}</div>
                <div className="text-sm opacity-90">Duration</div>
              </div>
            </div>

            {/* Timeline - 3 column grid */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="grid grid-cols-3 gap-6">
                {timelineData.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                      {item.time}
                    </div>
                    {item.depth && (
                      <div className="text-lg font-semibold text-gray-800">{item.depth}</div>
                    )}
                    {item.temp && (
                      <div className="text-sm text-gray-600">{item.temp}</div>
                    )}
                  </div>
                ))}
                <div className="text-center">
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                    Weight
                  </div>
                  <div className="text-lg font-semibold text-gray-800">{diveData.weight}</div>
                </div>
              </div>
            </div>

            {/* Dive Profile Chart with Recharts */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Dive Profile</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="depthGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="time" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#64748b' }}
                    />
                    <YAxis 
                      domain={[0, 'dataMax + 5']}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#64748b' }}
                      label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft' }}
                      reversed={true}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: '#9ca3af' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="depth"
                      stroke="#f97316"
                      strokeWidth={3}
                      fill="url(#depthGradient)"
                      dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#f97316' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Equipment Details */}
            {activeTab === 'Equipment' && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Equipment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {equipmentData.map((equipment, index) => (
                    <div key={index} className="flex justify-between items-start p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 mb-1">{equipment.category}</div>
                        {equipment.items.map((item, itemIndex) => (
                          item && <div key={itemIndex} className="text-sm text-gray-600">{item}</div>
                        ))}
                      </div>
                      {equipment.weight && (
                        <div className="text-sm font-medium text-gray-700 ml-4">{equipment.weight}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {activeTab === 'Reviews' && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Dive Reviews</h3>
                <div className="space-y-4">
                  {reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{review.name}</div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Notes</h3>
              <div className="text-gray-600 text-sm">
                <textarea 
                  className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add your dive notes here..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Sidebar - 4 columns */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Suggested Divers</h3>
              <div className="space-y-4">
                {reviews.map((diver, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                      {diver.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 text-sm">{diver.name}</div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < diver.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Dives</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deepest Dive</span>
                  <span className="font-medium">45m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Time</span>
                  <span className="font-medium">234h 16m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Rating</span>
                  <span className="font-medium">4.9 ⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddNewBuddyPage