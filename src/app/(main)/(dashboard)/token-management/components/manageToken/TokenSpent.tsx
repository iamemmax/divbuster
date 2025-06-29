import React from 'react';
import { Lock } from 'lucide-react';
import BookingIcon from '@/app/icons/(dashboard)/BookingIcon';

interface TokenSpentTransaction {
  id: string;
  diveNumber: number;
  tokens: number;
  time: string;
  date: string;
}

const TokenSpent = () => {
  const transactions: TokenSpentTransaction[] = [
    {
      id: '1',
      diveNumber: 29,
      tokens: 5,
      time: '12:30pm',
      date: 'Thurs. 22nd, Sept. 2024'
    },
    {
      id: '2',
      diveNumber: 22,
      tokens: 70,
      time: '12:30pm',
      date: 'Thurs. 22nd, Sept. 2024'
    },
    {
      id: '3',
      diveNumber: 17,
      tokens: 45,
      time: '12:30pm',
      date: 'Thurs. 22nd, Sept. 2024'
    },
    {
      id: '4',
      diveNumber: 29,
      tokens: 5,
      time: '12:30pm',
      date: 'Wed. 21st, Sept. 2024'
    },
    {
      id: '5',
      diveNumber: 22,
      tokens: 70,
      time: '12:30pm',
      date: 'Wed. 21st, Sept. 2024'
    },
    {
      id: '6',
      diveNumber: 17,
      tokens: 45,
      time: '12:30pm',
      date: 'Wed. 21st, Sept. 2024'
    },
    {
      id: '7',
      diveNumber: 29,
      tokens: 5,
      time: '12:30pm',
      date: 'Mon. 17th, Sept. 2024'
    },
    {
      id: '8',
      diveNumber: 22,
      tokens: 70,
      time: '12:30pm',
      date: 'Mon. 17th, Sept. 2024'
    },
    {
      id: '9',
      diveNumber: 17,
      tokens: 45,
      time: '12:30pm',
      date: 'Mon. 17th, Sept. 2024'
    },
    {
      id: '10',
      diveNumber: 29,
      tokens: 5,
      time: '12:30pm',
      date: 'Sat. 14th, Sept. 2024'
    },
    {
      id: '11',
      diveNumber: 22,
      tokens: 70,
      time: '12:30pm',
      date: 'Sat. 14th, Sept. 2024'
    },
    {
      id: '12',
      diveNumber: 17,
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
  }, {} as Record<string, TokenSpentTransaction[]>);

  return (
    <div className="max-w-3xl  p-6 bg-white">
      <h1 className="text-xl font-bold text-[#09090B] mb-8">Token Spent</h1>
      
      <div className="space-y-8">
        {Object.entries(groupedTransactions).map(([date, dateTransactions]) => (
          <div key={date} className="space-y-4">
            {/* Date Header */}
              <div className="flex items-center w-full ">
        <div className="flex-grow h-px bg-gray-300"></div>
        <div className="px-4">
          <span className="text-gray-500 text-base font-medium whitespace-nowrap">
            {date}
          </span>
        </div>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>
            
            {/* Transactions for this date */}
            <div className="space-y-4">
              {dateTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-orange-400 rounded-lg flex items-center justify-center">
                      <BookingIcon className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Transaction Details */}
                    <div className="flex-1">
                      <h3 className="font-medium font-archivo text-sm md:text-lg text-[#030319]">
                        Dive {transaction.diveNumber} synced
                      </h3>
                      <p className="text-[#8F92A1] font-archivo md:text-sm text-xs">Your dive 17 was synced via watch</p>
                    </div>
                  </div>
                  
                  {/* Tokens and Time */}
                  <div className="text-right">
                    <div className="font-medium font-archivo text-sm md:text-lg text-[#030319]">{transaction.tokens} Tokens</div>
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

export default TokenSpent;