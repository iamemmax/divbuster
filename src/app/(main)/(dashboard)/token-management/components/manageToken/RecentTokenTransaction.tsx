import React from 'react';
import { Award, Lock } from 'lucide-react';
import AwardIcon from '@/app/icons/(dashboard)/AwardIcon';
import BookedIcon from '@/app/icons/(dashboard)/BookedIcon';

interface Transaction {
  id: string;
  type: 'award' | 'booking';
  title: string;
  description: string;
  tokens: number;
  time: string;
  date: string;
}


const RecentTokenTransaction = () => {
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'award',
      title: 'You have been awarded with...',
      description: 'Your account has been credited with...',
      tokens: 25,
      time: '12:30pm',
      date: 'Thurs. 22nd, Sept. 2024'
    },
    {
      id: '2',
      type: 'booking',
      title: 'Booked a Dive with James',
      description: 'You successfully booked a dive w...',
      tokens: 70,
      time: '12:30pm',
      date: 'Thurs. 22nd, Sept. 2024'
    },
    {
      id: '3',
      type: 'booking',
      title: 'Booked a Dive with Peters',
      description: 'You successfully booked a dive w...',
      tokens: 45,
      time: '12:30pm',
      date: 'Thurs. 22nd, Sept. 2024'
    },
    {
      id: '4',
      type: 'award',
      title: 'You have been awarded with...',
      description: 'Your account has been credited with...',
      tokens: 25,
      time: '12:30pm',
      date: 'Wed. 21st, Sept. 2024'
    },
    {
      id: '5',
      type: 'booking',
      title: 'Booked a Dive with James',
      description: 'You successfully booked a dive w...',
      tokens: 70,
      time: '12:30pm',
      date: 'Wed. 21st, Sept. 2024'
    },
    {
      id: '6',
      type: 'booking',
      title: 'Booked a Dive with Peters',
      description: 'You successfully booked a dive w...',
      tokens: 45,
      time: '12:30pm',
      date: 'Wed. 21st, Sept. 2024'
    },
    {
      id: '7',
      type: 'award',
      title: 'You have been awarded with...',
      description: 'Your account has been credited with...',
      tokens: 25,
      time: '12:30pm',
      date: 'Mon. 17th, Sept. 2024'
    },
    {
      id: '8',
      type: 'booking',
      title: 'Booked a Dive with James',
      description: 'You successfully booked a dive w...',
      tokens: 70,
      time: '12:30pm',
      date: 'Mon. 17th, Sept. 2024'
    },
    {
      id: '9',
      type: 'booking',
      title: 'Booked a Dive with Peters',
      description: 'You successfully booked a dive w...',
      tokens: 45,
      time: '12:30pm',
      date: 'Mon. 17th, Sept. 2024'
    },
    {
      id: '10',
      type: 'award',
      title: 'You have been awarded with...',
      description: 'Your account has been credited with...',
      tokens: 25,
      time: '12:30pm',
      date: 'Sat. 14th, Sept. 2024'
    },
    {
      id: '11',
      type: 'booking',
      title: 'Booked a Dive with James',
      description: 'You successfully booked a dive w...',
      tokens: 70,
      time: '12:30pm',
      date: 'Sat. 14th, Sept. 2024'
    },
    {
      id: '12',
      type: 'booking',
      title: 'Booked a Dive with Peters',
      description: 'You successfully booked a dive w...',
      tokens: 45,
      time: '12:30pm',
      date: 'Sat. 14th, Sept. 2024'
    }
  ];

  // Group transactions by date
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const date = transaction.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);

  const getIcon = (type: string) => {
    return type === 'award' ? (
      <AwardIcon className="w-6 h-6 text-white" />
    ) : (
      <BookedIcon className="w-6 h-6 text-white" />
    );
  };

  const getIconBg = (type: string) => {
    return type === 'award' ? 'bg-green-700' : 'bg-orange-400';
  };

  return (
    <div className="max-w-3xl  p-6 bg-white">
      <h1 className="text-xl font-bold text-[#09090B] mb-8">Recent Token Transactions</h1>
      
      <div className="space-y-8">
        {Object.entries(groupedTransactions).map(([date, dateTransactions]) => (
          <div key={date} className="space-y-2">
            {/* Date Header */}
            <div className="flex items-center justify-center py-2">
      <div className="flex items-center w-full ">
        <div className="flex-grow h-px bg-gray-300"></div>
        <div className="px-4">
          <span className="text-gray-500 text-base font-medium whitespace-nowrap">
            {date}
          </span>
        </div>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>
    </div>
            
            {/* Transactions for this date */}
            <div className="space-y-4">
              {dateTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconBg(transaction.type)}`}>
                      {getIcon(transaction.type)}
                    </div>
                    
                    {/* Transaction Details */}
                    <div className="flex-1">
                      <h3 className="font-medium font-archivo text-sm md:text-lg text-[#030319]">{transaction.title}</h3>
                      <p className="text-[#8F92A1] font-archivo md:text-sm text-xs">{transaction.description}</p>
                    </div>
                  </div>
                  
                  {/* Tokens and Time */}
                  <div className="text-right">
                    <p className="font-medium font-archivo text-sm md:text-lg text-[#030319]">{transaction.tokens} Tokens</p>
                    <div className="text-[#8F92A1] font-archivo md:text-sm text-xs">{transaction.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTokenTransaction;