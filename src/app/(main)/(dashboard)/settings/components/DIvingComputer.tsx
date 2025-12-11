"use client"
import React, { useState } from 'react';
import { ChevronDown, Check, Plus } from 'lucide-react';
import DiveWatch from '@/app/icons/(dashboard)/DiveWatch';

// Mock data for dropdowns
const deviceTypes: readonly string[] = ['Watch', 'Dive Computer', 'Depth Gauge', 'Compass'] as const;
const deviceBrands: readonly string[] = ['Garmin Smart Watch', 'Suunto', 'Shearwater', 'Oceanic', 'Mares'] as const;
const deviceModels: readonly string[] = ['Mk2i', 'D5', 'Perdix AI', 'Pro Plus 4', 'Puck Pro'] as const;

// Equipment interface
interface Equipment {
  id: number;
  deviceType: string;
  deviceBrand: string;
  deviceModel: string;
  authorizationToken: string;
  connected: boolean;
}

// New Equipment interface
interface NewEquipment {
  deviceType: string;
  deviceBrand: string;
  deviceModel: string;
  authorizationToken: string;
}

// Simple Select Component Props
interface SimpleSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
}

// Simple Select Component
const SimpleSelect: React.FC<SimpleSelectProps> = ({ value, onValueChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-300 dark:border-gray-600 outline-none py-[.8125rem] w-full text-black dark:text-white text-xs flex-1 bg-white dark:bg-gray-800 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors flex items-center justify-between"
      >
        <span>{value || placeholder}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onValueChange(option);
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none flex items-center justify-between"
            >
              {option}
              {value === option && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};



export default function DivingEquipmentUI(): JSX.Element {
  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: 1,
      deviceType: 'Watch',
      deviceBrand: 'Garmin Smart Watch',
      deviceModel: 'Mk2i',
      authorizationToken: 'MK2i-didsab465y00453',
      connected: true
    }
  ]);

  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [newEquipment, setNewEquipment] = useState<NewEquipment>({
    deviceType: '',
    deviceBrand: '',
    deviceModel: '',
    authorizationToken: ''
  });

  const updateEquipment = (id: number, field: keyof Equipment, value: string): void => {
    setEquipment(prevEquipment => 
      prevEquipment.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeEquipment = (id: number): void => {
    setEquipment(prevEquipment => prevEquipment.filter(item => item.id !== id));
  };

  const handleAddNew = (): void => {
    setIsAddingNew(true);
  };

  const handleSaveNew = (): void => {
    if (newEquipment.deviceType && newEquipment.deviceBrand && newEquipment.deviceModel && newEquipment.authorizationToken) {
      const equipmentToAdd: Equipment = {
        id: Date.now(),
        ...newEquipment,
        connected: false
      };
      setEquipment(prevEquipment => [...prevEquipment, equipmentToAdd]);
      setNewEquipment({
        deviceType: '',
        deviceBrand: '',
        deviceModel: '',
        authorizationToken: ''
      });
      setIsAddingNew(false);
    }
  };

  const handleCancelNew = (): void => {
    setNewEquipment({
      deviceType: '',
      deviceBrand: '',
      deviceModel: '',
      authorizationToken: ''
    });
    setIsAddingNew(false);
  };

  const updateNewEquipment = (field: keyof NewEquipment, value: string): void => {
    setNewEquipment(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-5xl p-2 md:p-6 min-h-screen">
      
      {/* Equipment List */}
      <div className="space-y-6 bg-[#FDFDFC] dark:bg-gray-900 p-2 md:p-10">
        {equipment.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg">
            {/* Device Image and Status */}
            <div className="p-6 ">
              <div className="flex flex-col space-y-4">
                <div>
                  <DiveWatch/>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${item.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`font-medium ${item.connected ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {item.connected ? 'Device Connected' : 'Device Disconnected'}
                  </span>
                </div>
              </div>
            </div>

            {/* Equipment Details */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between gap-4 items-center py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-900 dark:text-white w-[300px]">Device Type</span>
                <SimpleSelect
                  value={item.deviceType}
                  onValueChange={(value) => updateEquipment(item.id, 'deviceType', value)}
                  options={deviceTypes}
                  placeholder="Select device type"
                />
              </div>

              <div className="flex justify-between gap-4 items-center py-3">
                <span className="text-sm font-medium text-gray-900 dark:text-white w-[300px]">Device Brand</span>
                <SimpleSelect
                  value={item.deviceBrand}
                  onValueChange={(value) => updateEquipment(item.id, 'deviceBrand', value)}
                  options={deviceBrands}
                  placeholder="Select device brand"
                />
              </div>

              <div className="flex justify-between gap-4 items-center py-3 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-900 dark:text-white w-[300px]">Device Model</span>
                <SimpleSelect
                  value={item.deviceModel}
                  onValueChange={(value) => updateEquipment(item.id, 'deviceModel', value)}
                  options={deviceModels}
                  placeholder="Select device model"
                />
              </div>

              <div className="flex justify-between gap-4 items-center py-3">
                <span className="text-sm font-medium text-gray-900 dark:text-white w-[300px]">Authorization Token</span>
                <div className="w-full">
                  <input
                    value={item.authorizationToken}
                    onChange={(e) => updateEquipment(item.id, 'authorizationToken', e.target.value)}
                    type="text"
                    className="border border-gray-300 dark:border-gray-600 outline-none py-[.8125rem] w-full text-black dark:text-white text-sm bg-white dark:bg-gray-800 font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors"
                    placeholder="Enter authorization token"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6  flex justify-end gap-10">
              <button 
                onClick={handleAddNew}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add New
              </button>
              <button 
                onClick={() => removeEquipment(item.id)}
                className="px-4 py-2 text-white bg-[#FF0000] rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Remove Diving Equipment
              </button>
            </div>
          </div>
        ))}

        {/* New Equipment Form (inline) */}
        {isAddingNew && (
          <div className="bg-white overflow-hidden border border-gray-200 rounded-lg border-dashed">
            {/* Device Image and Status */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col space-y-4">
                <div>
                  <DiveWatch/>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <span className="font-medium text-gray-500">
                    New Device - Not Connected
                  </span>
                </div>
              </div>
            </div>

            {/* Equipment Details */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between gap-4 items-center py-3 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-900 w-[300px]">Device Type</span>
                <SimpleSelect
                  value={newEquipment.deviceType}
                  onValueChange={(value) => updateNewEquipment('deviceType', value)}
                  options={deviceTypes}
                  placeholder="Select device type"
                />
              </div>

              <div className="flex justify-between gap-4 items-center py-3 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-900 w-[300px]">Device Brand</span>
                <SimpleSelect
                  value={newEquipment.deviceBrand}
                  onValueChange={(value) => updateNewEquipment('deviceBrand', value)}
                  options={deviceBrands}
                  placeholder="Select device brand"
                />
              </div>

              <div className="flex justify-between gap-4 items-center py-3 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-900 w-[300px]">Device Model</span>
                <SimpleSelect
                  value={newEquipment.deviceModel}
                  onValueChange={(value) => updateNewEquipment('deviceModel', value)}
                  options={deviceModels}
                  placeholder="Select device model"
                />
              </div>

              <div className="flex justify-between gap-4 items-center py-3">
                <span className="text-sm font-medium text-gray-900 w-[300px]">Authorization Token</span>
                <div className="w-full ">
                  <input
                    value={newEquipment.authorizationToken}
                    onChange={(e) => updateNewEquipment('authorizationToken', e.target.value)}
                    type="text"
                    className="border outline-none py-[.8125rem] w-full text-black text-sm bg-white font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors"
                    placeholder="Enter authorization token"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons for New Equipment */}
            <div className="p-6 bg-gray-50 flex justify-end gap-2 md:gap-10">
              <button 
                onClick={handleCancelNew}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveNew}
                className="px-4 py-2 text-white bg-[#F7931D] rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Save Equipment
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add New Button (if no equipment) */}
      {equipment.length === 0 && !isAddingNew && (
        <div className="text-center py-12">
          <button
            onClick={handleAddNew}
            className="inline-flex items-center px-4 py-2 text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Equipment
          </button>
        </div>
      )}
    </div>
  );
}