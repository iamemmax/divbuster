import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FilterIcon } from '../icons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/core';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const VisitationChart = () => {

    const pppoptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 11,
              },
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              maxTicksLimit: 4,
            },
          },
        },
        barThickness: 9,

        plugins: {
          legend: {
            position: 'bottom' as const,
      
            labels: {
              boxWidth: 10,
              boxHeight: 10,
              font: {
                size: 10,
              },
            },
          },
          title: {
            display: false,
          },
        },
      };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 11,
                },
              },
            },
            y: {
              grid: {
                display: false,
              },
              ticks: {
                maxTicksLimit: 9,
                stepSize: 10
              },
            },
          },
          barThickness: 30,
  
          plugins: {
            legend: {
              position: 'bottom' as const,
              
              labels: {
                  display:'none',
                boxWidth: 10,
                boxHeight: 10,
                font: {
                  size: 10,
                },
              },
            },
            title: {
              display: false,
            },
          },
    };
    const labels = ['Jan', 'Febr', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = {
        labels,
        datasets: [
            {               
                data: [35, 18, 35, 45, 25, 40, 52, 34, 40, 30, 60, 48],
                backgroundColor: 'rgba(64, 123, 255, 1)',
                borderRadius: 5
            },
        ],
    }
    return (
        <div className='h-[300px] max-h-[500px]'>
            <div className='flex justify-between items-center font-sans'>
                <p className='text-[#080D27]'>Visitation comparatives</p>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <p className='rounded-full py-2 px-4 flex justify-center items-center gap-1 bg-[#1B1687] text-white'>This week <FilterIcon /> </p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <div className='border-[0.2px] border-[#1D1888] rounded-10 p-3 leading-10'>
                                <p className='rounded-full bg-[#F0F4FF]  pl-6 pr-16'>Today</p>
                                <p>This week</p>
                                <p>This month</p>
                                <p>This year</p>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Bar options={options} data={data} className='mt-12'/>
        </div>
    )
}

export default VisitationChart