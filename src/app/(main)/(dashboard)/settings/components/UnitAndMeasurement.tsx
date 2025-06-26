import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import AccountSubscription from './subscription/AccountSubscription';
import AccountUpgrade from './subscription/AccountUpgrade';
import { User } from '@/contexts/authentication';
import DistantantMeasurement from './measurement/DistantantMeasurement';
import WeightMeasurement from './measurement/WeightMeasurement';
import TemperatureMeasurement from './measurement/TemperatureMeasurement';
import HeightAndBodyMeasurement from './measurement/HeightANdBodyMeasurement';
interface prop{
    user: User | null
}
const UnitAndMeasurement = ({user}:prop) => {
  const [activeSection, setActiveSection] = useState('distance-measurement');

  const sidebarItems = [
    {
      id: 'distance-measurement',
      title: 'Distance Measurement',
      subtitle: 'Select measurement format',
    },
    {
      id: 'weight-measurement',
      title: 'Weight Measurement',
      subtitle: 'Full details on your current account',
    },
    {
      id: 'temperature-measurement',
      title: 'Temperature Measurement',
      subtitle: 'Select measurement format',
    },
    {
      id: 'height-measurement',
      title: 'Height Measurement & Body Type',
      subtitle: 'Full details on your current account',
    },
  ];

  const renderComponent = () => {
    switch (activeSection) {
      case 'distance-measurement':
        return <DistantantMeasurement />;
      case 'weight-measurement':
        return <WeightMeasurement />;
      case 'temperature-measurement':
        return <TemperatureMeasurement />;
      case 'height-measurement':
        return <HeightAndBodyMeasurement />;
      default:
        return <DistantantMeasurement />;
    }
  };

  return (
    <div className=" flex flex-col md:flex-row px-4 md:px-10 py-6 gap-6 md:gap-[50px]">
      {/* Sidebar */}
      <div className="w-full max-w-md mt-10 shadow-sm rounded-lg">
         <div className="pb-3 max-w-xs">
            <h2 className='font-archivo text-black font-medium text-xl'><span className='text-[#71717A]'>Hello, {user?.first_name}</span> , Let’s help you set up your units & measurement..</h2>
            {/* <p className='py-1 font-archivo text-sm text-[#71717A]'>You are currently on a One (1) Year Solid Plan.</p> */}
        </div>
        <div className="space-y-4">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveSection(item.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                activeSection === item.id
                  ? 'border-orange-300 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="flex-1">
                    <h3
                      className={`font-medium font-archivo text-[#333333] mb-1 text-sm ${
                        activeSection === item.id ? 'font-bold' : 'font-normal'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs font-archivo text-[#71717A]">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 w-full mt-6 overflow-y-auto max-h-[calc(70vh-0rem)] p-4">
       
        {renderComponent()}
      </div>
    </div>
  );
};

export default UnitAndMeasurement;


