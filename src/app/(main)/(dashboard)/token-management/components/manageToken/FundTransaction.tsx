import React from 'react';
import CardIcon from '@/app/icons/(dashboard)/CardIcon';

interface FundTransaction {
  id: string;
  cardNumber: string;
  amount: number;
  time: string;
  date: string;
}

const RecentFundTransactions = () => {
  const transactions: FundTransaction[] = [
    {
      id: '1',
      cardNumber: '**** 6098',
      amount: 300.00,
      time: '12:30pm',
      date: 'Thurs. 22nd, Sept. 2024'
    },
    {
      id: '2',
      cardNumber: '**** 5678',
      amount: 200.00,
      time: '12:30pm',
      date: 'Thurs. 22nd, Sept. 2024'
    },
    {
      id: '3',
      cardNumber: '**** 1234',
      amount: 150.00,
      time: '12:30pm',
      date: 'Thurs. 22nd, Sept. 2024'
    },
    {
      id: '4',
      cardNumber: '**** 6098',
      amount: 300.00,
      time: '12:30pm',
      date: 'Wed. 21st, Sept. 2024'
    },
    {
      id: '5',
      cardNumber: '**** 5678',
      amount: 200.00,
      time: '12:30pm',
      date: 'Wed. 21st, Sept. 2024'
    },
    {
      id: '6',
      cardNumber: '**** 1234',
      amount: 150.00,
      time: '12:30pm',
      date: 'Wed. 21st, Sept. 2024'
    },
    {
      id: '7',
      cardNumber: '**** 6098',
      amount: 300.00,
      time: '12:30pm',
      date: 'Mon. 17th, Sept. 2024'
    },
    {
      id: '8',
      cardNumber: '**** 5678',
      amount: 200.00,
      time: '12:30pm',
      date: 'Mon. 17th, Sept. 2024'
    },
    {
      id: '9',
      cardNumber: '**** 1234',
      amount: 150.00,
      time: '12:30pm',
      date: 'Mon. 17th, Sept. 2024'
    },
    {
      id: '10',
      cardNumber: '**** 6098',
      amount: 300.00,
      time: '12:30pm',
      date: 'Sat. 14th, Sept. 2024'
    },
    {
      id: '11',
      cardNumber: '**** 5678',
      amount: 200.00,
      time: '12:30pm',
      date: 'Sat. 14th, Sept. 2024'
    },
    {
      id: '12',
      cardNumber: '**** 1234',
      amount: 150.00,
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
  }, {} as Record<string, FundTransaction[]>);

  return (
    <div className="max-w-3xl  p-6 bg-white">
      <h1 className="text-xl font-bold text-[#09090B] mb-8">Recent Fund Transactions</h1>
      
      <div className="space-y-8">
        {Object.entries(groupedTransactions).map(([date, dateTransactions]) => (
          <div key={date} className="space-y-4">
            {/* Date Header */}
                <div className="flex items-center w-full ">
        <div className="grow h-px bg-gray-300"></div>
        <div className="px-4">
          <span className="text-gray-500 text-base font-medium whitespace-nowrap">
            {date}
          </span>
        </div>
        <div className="grow h-px bg-gray-300"></div>
      </div>
            {/* Transactions for this date */}
            <div className="space-y-4">
              {dateTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    {/* Icon */}
                    <div className="size-[2.1875rem] bg-[#132346] rounded-10 flex items-center justify-center">
                      <CardIcon />
                    </div>
                    
                    {/* Transaction Details */}
                    <div className="flex-1">
                      <h3 className="font-medium font-archivo text-sm md:text-lg text-[#030319]">
                        Funded your account from {transaction.cardNumber}
                      </h3>
                      <p className="text-[#8F92A1] font-archivo md:text-sm text-xs">You successfully fund your account</p>
                    </div>
                  </div>
                  
                  {/* Amount and Time */}
                  <div className="text-right">
                    <div className="texfont-medium font-archivo text-sm md:text-lg text-[#030319]">${transaction.amount.toFixed(2)}</div>
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

export default RecentFundTransactions;