export interface ReferralData {
  id: number;
  name: string;
  email: string;
  date: string;
  rewardEarned: string;
  status: 'Registered' | 'Deposited' | 'Pending' | 'Rejected';
}

export const referralMockData: ReferralData[] = [
  {
    id: 1,
    name: "Boluwatife Olagunju",
    email: "boluwatifeolagunju@gmail.com",
    date: "12 June, 2024 4:14pm",
    rewardEarned: "₦10,000",
    status: "Deposited"
  },
  {
    id: 2,
    name: "Adebayo Johnson",
    email: "adebayojohnson@gmail.com",
    date: "12 June, 2024 3:45pm",
    rewardEarned: "₦10,000",
    status: "Registered"
  },
  {
    id: 3,
    name: "Chioma Okafor",
    email: "chiomaokafor@gmail.com",
    date: "11 June, 2024 2:30pm",
    rewardEarned: "₦10,000",
    status: "Deposited"
  },
  {
    id: 4,
    name: "Emeka Nwosu",
    email: "emekanwosu@gmail.com",
    date: "11 June, 2024 1:20pm",
    rewardEarned: "₦10,000",
    status: "Registered"
  },
  {
    id: 5,
    name: "Folake Adeyemi",
    email: "folakeadeyemi@gmail.com",
    date: "10 June, 2024 5:15pm",
    rewardEarned: "₦10,000",
    status: "Registered"
  },
  {
    id: 6,
    name: "Gbenga Oladipo",
    email: "gbengaoladipo@gmail.com",
    date: "10 June, 2024 3:40pm",
    rewardEarned: "₦10,000",
    status: "Registered"
  },
  {
    id: 7,
    name: "Halima Ibrahim",
    email: "halimaibrahim@gmail.com",
    date: "9 June, 2024 11:25am",
    rewardEarned: "₦10,000",
    status: "Registered"
  },
  {
    id: 8,
    name: "Ikenna Okoro",
    email: "ikennaokoro@gmail.com",
    date: "9 June, 2024 10:10am",
    rewardEarned: "₦10,000",
    status: "Registered"
  },
  {
    id: 9,
    name: "Jumoke Adeleke",
    email: "jumokeadeleke@gmail.com",
    date: "8 June, 2024 4:50pm",
    rewardEarned: "₦10,000",
    status: "Registered"
  },
  {
    id: 10,
    name: "Kolade Bello",
    email: "koladebello@gmail.com",
    date: "8 June, 2024 2:35pm",
    rewardEarned: "₦10,000",
    status: "Registered"
  }
];

// Additional mock data with more variety for testing filters
export const extendedReferralMockData: ReferralData[] = [
  ...referralMockData,
  {
    id: 11,
    name: "Lola Adesina",
    email: "lolaadesina@gmail.com",
    date: "7 June, 2024 2:30pm",
    rewardEarned: "₦15,000",
    status: "Deposited"
  },
  {
    id: 12,
    name: "Musa Abdullahi",
    email: "musaabdullahi@gmail.com",
    date: "7 June, 2024 11:45am",
    rewardEarned: "₦12,500",
    status: "Pending"
  },
  {
    id: 13,
    name: "Ngozi Eze",
    email: "ngozieze@gmail.com",
    date: "6 June, 2024 9:20am",
    rewardEarned: "₦0",
    status: "Rejected"
  },
  {
    id: 14,
    name: "Olumide Bakare",
    email: "olumidebakare@gmail.com",
    date: "6 June, 2024 3:15pm",
    rewardEarned: "₦10,000",
    status: "Deposited"
  },
  {
    id: 15,
    name: "Precious Okonkwo",
    email: "preciousokonkwo@gmail.com",
    date: "5 June, 2024 1:50pm",
    rewardEarned: "₦5,000",
    status: "Pending"
  }
];